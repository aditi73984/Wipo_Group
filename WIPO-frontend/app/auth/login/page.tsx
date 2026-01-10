"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  ChevronLeft,
  AlertCircle
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // States
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      localStorage.setItem("isLoggedIn", "true");
      window.dispatchEvent(new Event("storage"));
      router.push("/");
    } catch (err) {
      setError("Google sign-in failed.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setIsSuccess(true);
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("storage"));
    setTimeout(() => router.push("/"), 1000);
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden pt-28 pb-12 px-4">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm p-8 md:p-10">
          
          {isForgotPassword && (
            <button 
              onClick={() => setIsForgotPassword(false)}
              className="mb-6 flex items-center gap-2 text-[13px] font-bold text-black hover:text-emerald-600 transition-colors"
            >
              <ChevronLeft size={16} /> BACK
            </button>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/">
              <Image src="/wipo-logo.png" alt="WIPO" width={100} height={35} className="mx-auto mb-4" />
            </Link>
            <h1 className="text-2xl font-bold text-black tracking-tight">
              {isForgotPassword ? "Reset Password" : "Welcome Back"}
            </h1>
            <p className="text-black text-[13px] mt-1 font-medium opacity-70">Please enter your details to continue</p>
          </div>

          {!isForgotPassword && (
            <div className="space-y-6">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || loading}
                className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-bold text-[14px] text-black disabled:opacity-70"
              >
                {isGoogleLoading ? (
                  <div className="h-5 w-5 border-2 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
                ) : (
                  <>
                    <Image src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" width={18} height={18} />
                    <span className="text-black">Login with Google</span>
                  </>
                )}
              </motion.button>

              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center px-2">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <span className="relative px-4 bg-white text-[11px] font-bold text-black uppercase tracking-wider">
                  or use email
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-[12px] font-bold flex items-center gap-2">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black">
                {loginMethod === "email" ? <Mail size={18} /> : <Phone size={18} />}
              </div>
              <input
                type={loginMethod === "email" ? "email" : "tel"}
                name={loginMethod}
                required
                placeholder={loginMethod === "email" ? "Email address" : "Phone number"}
                value={formData[loginMethod]}
                onChange={handleInputChange}
                className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-[14px] text-black placeholder:text-black"
              />
            </div>

            {!isForgotPassword && (
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-[14px] text-black placeholder:text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:opacity-70"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}

            <div className="flex items-center justify-between px-1">
               <button 
                  type="button"
                  onClick={() => setLoginMethod(loginMethod === "email" ? "phone" : "email")}
                  className="text-[12px] font-bold text-emerald-600 hover:text-emerald-700"
                >
                  {loginMethod === "email" ? "Use Phone?" : "Use Email?"}
                </button>
                {!isForgotPassword && (
                <button 
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-[12px] font-bold text-black hover:opacity-70"
                >
                  Forgot Password?
                </button>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={loading || isGoogleLoading}
              className={`w-full py-3.5 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all ${
                isSuccess ? "bg-green-500 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
              } disabled:opacity-70`}
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isSuccess ? (
                <>Verified <CheckCircle2 size={18} /></>
              ) : (
                <>{isForgotPassword ? "Send Link" : "Sign In"}</>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center mt-8 text-[14px] font-medium text-black">
          New here?{" "}
          <Link href="/auth/signup" className="text-emerald-600 font-bold hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </section>
  );
}