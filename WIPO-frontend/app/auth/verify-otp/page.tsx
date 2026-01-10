"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Loader from "@/components/ui/Loader";

// ❌ Metadata export yahan se hata diya gaya hai kyunki ye Client Component hai.

export default function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // 🔗 Backend API logic
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("OTP verified:", { email, otp });
      setSuccess("OTP verified successfully. You can now login.");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("OTP has been resent to your email.");
    } catch {
      setError("Failed to resend OTP. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Verify OTP</h1>
          <p className="text-sm text-gray-600">
            Enter the OTP sent to your registered email
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        {loading && <Loader />}

        <div className="flex justify-between text-sm">
          <button
            onClick={handleResendOtp}
            type="button" // Type button dena achha rehta hai taaki form submit na ho jaye
            className="text-blue-600 hover:underline"
            disabled={loading}
          >
            Resend OTP
          </button>

          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
}