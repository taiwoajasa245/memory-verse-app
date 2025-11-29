"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  LayoutDashboard,
  Clock,
  Heart,
  Settings,
  AlertCircle,
} from "lucide-react";
import clsx from "clsx";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {  User } from "@/lib/api/models";


interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user?: User;
  isLoading?: boolean;
  error?: unknown;
}

export default function Sidebar({ open, setOpen, user, isLoading, error }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Verse History", href: "/dashboard/verse/history", icon: Clock },
    { label: "My Favorites", href: "/dashboard/verse/favorites", icon: Heart },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    cookieStore.delete("token");
      queryClient.clear();
      router.push("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed md:fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          open ? "translate-x-0 z-50" : "-translate-x-full z-50"
        )}
      >
        {/* User Profile Section */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-800 pt-6 md:pt-8 pb-4 border-b border-gray-200 dark:border-gray-700 px-4">
          <div className="flex items-center gap-3">
            {isLoading ? (
              // Loading skeleton
              <>
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32" />
                </div>
              </>
            ) : error ? (
              // Error state
              <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">Failed to load profile</span>
              </div>
            ) : (
              // User data
              <>
                <img
                  src={
                  
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuB-a5rjaKxD4KOYnMRvC0J_851eAmnEVVnOs7IITq8ma-F7q7TeQ1mt0jyHKxyi4vaieh4ysS1G9L0iBtl94JXXt09ZUrmE8oNpH5LuXIIdWSFrM8RYLHWOk7sCGsZxYp5fuwcr_UDO8siqnoVfv8FT-buIJlmTAjcA1T8VPYV_dfk_VFxSkFzJ5W3JPoF0YMMaUd9QCCkOpO44ZcujxM-paBhk7qJe3qfcPMRXucIOAPhdOUiTZhMaAxxTdwSzGOs4xrT7aflkRES5"
                  }
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                />
                <div className="min-w-0 flex-1">
                  <h1 className="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">
                    {user?.user_name || "Guest User"}
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || "No email"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="flex flex-col gap-1">
            {navItems.map(({ label, href, icon: Icon }) => {
              const active = pathname === href;

              return (
                <Link
                  key={label}
                  href={href}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Section */}
        <div className="flex-shrink-0 p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogOut className="w-5 h-5 text-red-500" />
              Confirm Logout
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You'll need to sign in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              // variant="destructive"
              onClick={handleConfirmLogout}
              className="flex-1"
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
