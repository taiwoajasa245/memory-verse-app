"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerWithEmail } from "@/lib/api/auth";



export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const registerMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      registerWithEmail(email, password),
    onSuccess: (data) => {
  if (data?.token) {
    document.cookie = `token=${encodeURIComponent(data.token)}; path=/; SameSite=Lax; Secure`;
  }
      router.push("/onboarding");
    },
    onError: (error: Error) => {
      setError(error.message || "Failed to create an account");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    registerMutation.mutate({ email, password });
  };

  return (
    <main className="flex min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {/* Left Image Section (hidden on mobile) */}
      <div
        className="hidden md:flex w-2/5 h-screen bg-cover bg-center items-center justify-center"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbrzC2orECRmVG3uu7xpAoplrHVaOVYg9OEZ0oxUCyUyRKiwdUy8PR3Cx9EoYPBqjKRPTUDnMxsqAQ3otAZTkZcjOvfRXMmAyoE5sJoaSwvQgOgStzUYkV_bc9CbNYGebkELvX4VhnaivMeF_49FH9JhWDr3hobqNCtDmZoNf9Ot0rDSWZnKIP7VNGw_P-u3toSWIiTwViu_pi1Zgp16hy5iti4oZ0c_X7zHiGS_bivPzUi1c_LVkclPrEjreeNsPAlfTnyD5cCLPJ')",
        }}
      >
        <div className="text-center text-white px-8">
          <h2 className="text-4xl font-black leading-tight">
            Join MemoryVerse Today
          </h2>
          <p className="mt-3 text-base text-gray-200">
            Start your journey of faith and daily scripture practice.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-3/5 flex items-center justify-center px-6 sm:px-10 lg:px-16 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-2">
            Create Your Account
          </h2>
          <p className="text-center text-sm mb-8 text-gray-500 dark:text-gray-400">
            Let's get started with your journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-primary"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="h-12 pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-primary"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
          <Button
              type="submit"
              className="w-full h-12 bg-primary text-text-light font-bold hover:bg-primary/80 transition-colors flex items-center justify-center"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
              or
            </span>
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          {/* Google Sign-in */}
          {/* <Button
            variant="outline"
            className="w-full h-12 flex items-center justify-center gap-3"
            type="button"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56,12.25C22.56,11.45 22.49,10.68 22.36,9.92H12V14.4H18.1C17.84,15.93 17,17.22 15.6,18.15V20.89H19.45C21.46,19.05 22.56,15.95 22.56,12.25Z"
                fill="#4285F4"
              />
              <path
                d="M12,23C15.24,23 17.95,21.92 19.45,20.89L15.6,18.15C14.53,18.89 13.38,19.3 12,19.3C9.17,19.3 6.79,17.43 5.92,14.89H2.05V17.74C3.96,20.91 7.7,23 12,23Z"
                fill="#34A853"
              />
              <path
                d="M5.92,14.89C5.67,14.18 5.5,13.42 5.5,12.6C5.5,11.78 5.67,11.02 5.92,10.31V7.46H2.05C1.18,9.25 0.63,11.31 0.63,13.5C0.63,15.69 1.18,17.75 2.05,19.54L5.92,16.89V14.89Z"
                fill="#FBBC05"
              />
              <path
                d="M12,5.7C13.56,5.7 14.93,6.23 15.96,7.2L19.53,3.64C17.95,2.18 15.24,1 12,1C7.7,1 3.96,3.09 2.05,6.26L5.92,9.11C6.79,6.57 9.17,4.7 12,4.7V5.7Z"
                fill="#EA4335"
              />
            </svg>
            Sign up with Google
          </Button> */}

          <p className="text-center text-sm mt-6 text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}