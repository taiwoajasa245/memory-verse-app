"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { resetPassword, sendResetOtp } from "@/lib/api/auth";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<0 | 1>(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const base = process.env.NEXT_PUBLIC_DEV_API_URL;

  async function sendOtp() {
    setError(null);
    setMessage(null);
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!base) {
      setError("Missing API base URL");
      return;
    }
    setLoading(true);
    try {
      const data = await sendResetOtp(email.trim());
      setMessage("OTP sent to your email. Please check your inbox.");
      setStep(1);
    } catch (e: any) {
      setError(e?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function resetUserPassword() {
    setError(null);
    setMessage(null);
    if (!otp.trim()) {
      setError("Please enter the OTP sent to your email.");
      return;
    }
    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!base) {
      setError("Missing API base URL");
      return;
    }

    setLoading(true);
    try {
    
      const data = await resetPassword(email.trim(), newPassword, otp.trim());
      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => router.push("/login"), 1200);
    } catch (e: any) {
      setError(e?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col md:flex-row bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {/* Left Image Section (hidden on small screens) */}
      <div
        className="hidden md:flex md:w-2/5 h-56 md:h-screen bg-cover bg-center items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/20" />
        <div className="relative text-center text-white px-6">
          <h2 className="text-2xl md:text-4xl font-black leading-tight">Reset Your Password</h2>
          <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-200 max-w-xs mx-auto">Enter your email to receive an OTP and reset your account password.</p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-3/5 flex items-center justify-center px-4 sm:px-8 lg:px-16 py-8">
        <div className="w-full max-w-md sm:max-w-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Forgot Password</h2>
          <p className="text-center text-sm sm:text-base mb-6 text-gray-500 dark:text-gray-400">Enter your email to receive an OTP and reset your password.</p>

          {message && <div className="text-sm text-green-600 dark:text-green-400 mb-3">{message}</div>}
          {error && <div className="text-sm text-red-600 dark:text-red-400 mb-3">{error}</div>}

          {step === 0 ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 mt-2 w-full" />
              </div>

              <div className="flex">
                <Button onClick={sendOtp} disabled={loading} className="w-full h-12 bg-primary text-text-light font-bold hover:bg-primary/80 transition-colors">
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="otp">OTP</Label>
                <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="h-12 mt-2 w-full" />
              </div>

              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-12 mt-2 w-full" />
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-12 mt-2 w-full" />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <Button variant="outline" onClick={() => setStep(0)} className="w-full sm:w-auto">Back</Button>
                <Button onClick={resetUserPassword} disabled={loading} className="w-full sm:w-auto bg-primary text-text-light">
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            <span className="px-3 text-sm text-gray-500 dark:text-gray-400">or</span>
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          <p className="text-center text-sm mt-2 text-gray-500 dark:text-gray-400">
            Remembered your password? <a href="/login" className="text-primary hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </main>
  );
}
