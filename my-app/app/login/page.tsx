"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";

const SkySafeLogo = () => (
  <svg viewBox="0 0 120 120" className="w-14 h-14">
    <circle cx="60" cy="60" r="54" fill="none" stroke="white" strokeWidth="2" />
    <line x1="22" y1="100" x2="60" y2="16" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="98" y1="100" x2="60" y2="16" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="22" y1="100" x2="98" y2="100" stroke="white" strokeWidth="2" opacity="0.4" />
    <circle cx="60" cy="16" r="12" fill="#E03A3A" />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabaseBrowserClient.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      if (data.session) {
        // Successful login, redirect to dashboard
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-center items-center relative overflow-hidden px-4">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E03A3A]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-[300px] h-[300px] bg-[#E03A3A]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-[420px] z-10">
        {/* Back Link to Landing */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-xs text-white/50 uppercase tracking-[2px] hover:text-[#E03A3A] transition-colors duration-200"
          >
            ← Back to main site
          </Link>
        </div>

        <div
          className="border bg-[#141414]/80 backdrop-blur-md px-8 py-10 rounded-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col items-center"
          style={{ borderColor: "rgba(224,58,58,0.2)" }}
        >
          {/* Brand header */}
          <div className="flex flex-col items-center mb-8">
            <SkySafeLogo />
            <h1
              className="font-medium text-white tracking-[6px] text-lg mt-4 uppercase"
            >
              SKYSAFE
            </h1>
            <span
              className="text-[9px] font-semibold uppercase tracking-[3px] mt-1"
              style={{ color: "#E03A3A" }}
            >
              Console Login
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-[10px] font-semibold uppercase tracking-[2.5px] text-white/70"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@organization.com"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1E1E1E]/50 border-white/10 rounded-none text-white focus-visible:ring-[#E03A3A] focus-visible:border-[#E03A3A] placeholder:text-white/20 h-11"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="password"
                  className="text-[10px] font-semibold uppercase tracking-[2.5px] text-white/70"
                >
                  Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#1E1E1E]/50 border-white/10 rounded-none text-white focus-visible:ring-[#E03A3A] focus-visible:border-[#E03A3A] placeholder:text-white/20 h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <Alert variant="destructive" className="bg-[#E03A3A]/10 border-[#E03A3A]/40 text-red-400 rounded-none py-2 px-3">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <AlertDescription className="text-xs font-light">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-none uppercase bg-[#E03A3A] hover:bg-[#C82828] text-white font-semibold text-xs tracking-[2.5px] h-11 transition-all duration-200 mt-2 cursor-pointer shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="mt-6 text-center">
          <p className="text-xs text-white/40 font-light">
            Don't have an administrator account?{" "}
            <Link
              href="/signup"
              className="text-[#E03A3A] hover:underline font-normal tracking-[0.5px]"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
