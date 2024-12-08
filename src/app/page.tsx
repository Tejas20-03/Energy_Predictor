"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(() => {
    const handleSwitchToLogin = () => {
      setIsLogin(true);
    };

    window.addEventListener("switchToLogin", handleSwitchToLogin);

    return () => {
      window.removeEventListener("switchToLogin", handleSwitchToLogin);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[var(--color-green-light)] to-[var(--color-green-dark)]">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
          duration: 2000,
        }}
      />
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={200}
            height={80}
            priority
            className="mb-8"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[var(--color-green-dark)]">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-[var(--color-green-dark)] hover:text-[var(--color-green-light)] focus:outline-none focus:underline transition duration-150 ease-in-out"
            >
              {isLogin ? "Register" : "Sign in"}
            </button>
          </p>
        </div>
        <div className="mt-8">
          <div className="relative">
            <div
              className={`transform transition-all duration-300 ${
                isLogin
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 absolute"
              }`}
            >
              {isLogin && <LoginForm />}
            </div>
            <div
              className={`transform transition-all duration-300 ${
                !isLogin
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0 absolute"
              }`}
            >
              {!isLogin && <RegisterForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
