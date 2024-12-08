"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const toggleAuthMode = useCallback(() => {
    setIsLogin((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleSwitchToLogin = () => setIsLogin(true);
    window.addEventListener("switchToLogin", handleSwitchToLogin);
    return () =>
      window.removeEventListener("switchToLogin", handleSwitchToLogin);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[var(--color-green-light)] to-[var(--color-green-dark)]">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
          duration: 2000,
        }}
      />
      <div className="w-full max-w-lg space-y-6 bg-white p-6 rounded-xl shadow-lg">
        <header className="flex flex-col items-center">
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={200}
            height={80}
            priority
            className="mb-6"
          />
          <h1 className="text-center text-3xl font-bold tracking-tight text-[var(--color-green-dark)]">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleAuthMode}
              className="font-medium text-[var(--color-green-dark)] hover:text-[var(--color-green-light)] focus:outline-none focus:underline transition duration-150 ease-in-out"
              aria-label={
                isLogin ? "Switch to registration" : "Switch to login"
              }
            >
              {isLogin ? "Register" : "Sign in"}
            </button>
          </p>
        </header>
        <section className="relative">
          <div
            className={`w-full transition-opacity duration-300 ease-in-out ${
              isLogin ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            {isLogin && <LoginForm />}
          </div>
          <div
            className={`w-full transition-opacity duration-300 ease-in-out ${
              !isLogin ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            {!isLogin && <RegisterForm />}
          </div>
        </section>
      </div>
    </main>
  );
}
