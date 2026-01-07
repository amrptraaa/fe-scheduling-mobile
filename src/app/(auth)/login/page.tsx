"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Particles from "@/components/Particles";
import api from "@/lib/axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 🔥 SAMA PERSIS DENGAN FE DASHBOARD
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ Simpan token
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ✅ Simpan user (opsional tapi disarankan)
      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // ✅ Redirect
      router.push("/home");
    } catch (err: any) {
      console.error("Login error:", err);

      setError(
        err?.response?.data?.message ||
          "Login gagal. Periksa email dan password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #f9fafb 0%, #039155 100%)",
      }}
    >
      {/* Particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#f7fce6"]}
          particleCount={150}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={100}
          moveParticlesOnHover
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-[#039155]"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <p className="mt-4 text-gray-700 font-medium">
              Memproses login...
            </p>
          </div>
        </div>
      )}

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="flex justify-center mb-6">
          <Image src="/logo_PT.svg" alt="Logo" width={120} height={120} />
        </div>

        <div className="bg-white/95 rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-2">
            Masuk ke Akun
          </h1>
          <p className="text-sm text-center text-gray-500 mb-6">
            Gunakan akun yang sama dengan dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#039155]"
            >
              Masuk
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
