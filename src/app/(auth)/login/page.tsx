"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Particles from "@/components/Particles";

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
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (
      email === "budi.irawan@hanielshen.employee.id" &&
      password === "pekerja123"
    ) {
      router.push("/home");
    } else {
      setError("Email atau password salah. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, #CDF463 0%, #e6f8b5 40%, #f9fafb 100%)`,
      }}
    >
      {/* Particles Layer */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#f7fce6"]}
          particleCount={150}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-[#CDF463]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <p className="mt-4 text-gray-700 font-medium text-base">
              Memproses login...
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[95%] sm:max-w-md md:max-w-lg p-4 sm:p-6">
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <Image
            src="/logo_PT.svg"
            alt="Logo Perusahaan"
            width={120}
            height={120}
            className="object-contain w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
          />
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md sm:shadow-lg p-6 sm:p-8 md:p-10 transition-all duration-300 hover:shadow-xl">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Masuk ke Akun Anda
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Silakan masukkan kredensial Anda
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="contoh@perusahaan.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="w-full py-2 sm:py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CDF463] focus:border-transparent outline-none transition text-sm sm:text-base"
                style={{ color: "#111827" }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Kata Sandi
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="w-full py-2 sm:py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CDF463] focus:border-transparent outline-none transition text-sm sm:text-base"
                style={{ color: "#111827" }}
              />
            </div>

            {/* Remember me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-[#CDF463] bg-gray-100 border-gray-300 rounded focus:ring-[#CDF463] focus:ring-2"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-700"
              >
                Ingat saya
              </label>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}

            {/* Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#CDF463] text-black font-semibold py-3 px-4 rounded-lg text-base border border-black/20 transition hover:bg-[#b5da55] shadow-sm"
            >
              Masuk
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-[10px] sm:text-xs text-gray-600">
          &copy; {new Date().getFullYear()} PT Hanielshen. Semua hak dilindungi.
        </div>
      </div>
    </div>
  );
}
