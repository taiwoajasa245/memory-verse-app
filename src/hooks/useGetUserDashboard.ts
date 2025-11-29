import { useMutation, useQuery } from '@tanstack/react-query';
import { getDashboardData } from '@/lib/api/dashboard';
import { AuthResponse, DashboardData } from '@/lib/api/models';




export function useGetUserDasboard() {
  const { data: dashboardData, isPending, error, refetch } = useQuery<DashboardData>({
    queryKey: ["dashboardData"],
    queryFn:  getDashboardData,
  });

  return { dashboardData, isPending, error, refetch };
}

