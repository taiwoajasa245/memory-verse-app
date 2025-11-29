"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/(components)/dashbord_component/side_bar";
import "@/app/globals.css";
import { Loader2, Menu, X } from "lucide-react";
import { useAuth, useIsProfileCompleted } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { isProfileCompleted } = useIsProfileCompleted();
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) return; 

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isAuthenticated && !isProfileCompleted) {
      router.push("/onboarding");
      return;
    }

  }, [isLoading, isAuthenticated, isProfileCompleted, router]);


  if (
    isLoading ||
    (!isLoading && !isAuthenticated) ||
    (!isLoading && isAuthenticated && !isProfileCompleted)
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  } 

  
  
  return (
    <div className="min-h-screen flex bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => setOpen(!open)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>
        <h1 className="font-bold text-lg text-gray-800 dark:text-gray-100">MemoryVerse</h1>
        <div className="w-8" /> {/* Spacer for centering */}
      </div>

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} user={user} isLoading={isLoading} error={null} />

      {/* Main content */}
      <main className="flex-1 w-full md:ml-64 pt-16 md:pt-0">
        <div className="w-full h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}