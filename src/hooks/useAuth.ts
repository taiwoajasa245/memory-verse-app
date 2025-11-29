import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Cookies from "js-cookie";
import { verifyToken } from '@/lib/api/auth';

async function checkAuth() {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error('No token');
  }

  const res = await verifyToken(token);

  if (!res) {
    throw new Error('Invalid token');
  }
    return res;
}

export function useAuth(redirectTo = '/login') {
  const router = useRouter();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth, 
    
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && error) {
      router.push(redirectTo);
    }
  }, [isLoading, error, router, redirectTo]);

  return { user, isLoading, isAuthenticated: !error && !!user };
}


export function useIsProfileCompleted() {
  const { user, isLoading, isAuthenticated } = useAuth();
    const isProfileCompleted = user?.is_profile_completed ?? false;

    // Redirect to onboarding if profile is not completed and redirect to dashboard if completed
    const router = useRouter();
    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated && !isProfileCompleted) {
                router.push('/onboarding');
            } else if (isAuthenticated && isProfileCompleted) {
                router.push('/dashboard');
            }
        }
    }, [isLoading, isAuthenticated, isProfileCompleted, router]);

    return { isProfileCompleted, isLoading, isAuthenticated };
}


