"use client";

import { useState, FormEvent } from "react";
import toast from "react-hot-toast";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  userType: "general" | "admin";
  companyCode: string;
}

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    userType: "general",
    companyCode: "",
  });

  const showCompanyCode = formData.userType === "admin";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "User already exists") {
          toast.success("User exists! Redirecting to login...");
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("switchToLogin"));
          }, 2000);
          return;
        }
        throw new Error(data.error || "Registration failed");
      }

      toast.success("Registration successful! Redirecting to login...");
      setFormData({
        name: "",
        email: "",
        password: "",
        userType: "general",
        companyCode: "",
      });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("switchToLogin"));
      }, 2000);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto px-4 mt-8 space-y-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 sm:p-3 
                   focus:border-green-500 focus:ring-green-500 transition-all
                   text-gray-900 ring-1 ring-inset ring-gray-300 text-sm sm:text-base"
            placeholder="Enter your full name"
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 sm:p-3 
                   focus:border-green-500 focus:ring-green-500 transition-all
                   text-gray-900 ring-1 ring-inset ring-gray-300 text-sm sm:text-base"
            placeholder="Enter your email"
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 sm:p-3 
                   focus:border-green-500 focus:ring-green-500 transition-all
                   text-gray-900 ring-1 ring-inset ring-gray-300 text-sm sm:text-base"
            placeholder="Enter your password"
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="userType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            User Type
          </label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 sm:p-3 
                   focus:border-green-500 focus:ring-green-500 transition-all
                   text-gray-900 ring-1 ring-inset ring-gray-300 text-sm sm:text-base"
          >
            <option value="general">General User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {showCompanyCode && (
          <div className="w-full md:col-span-2">
            <label
              htmlFor="companyCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Company Code
            </label>
            <input
              id="companyCode"
              name="companyCode"
              type="password"
              required={showCompanyCode}
              value={formData.companyCode}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 sm:p-3 
                     focus:border-green-500 focus:ring-green-500 transition-all
                     text-gray-900 ring-1 ring-inset ring-gray-300 text-sm sm:text-base"
              placeholder="Enter company code"
            />
          </div>
        )}
      </div>

      <div className="pt-4 md:col-span-2">
        <button
          type="submit"
          className="w-full rounded-md bg-green-600 px-3 py-2 sm:py-3 text-sm sm:text-base
                 font-semibold text-white transition-all duration-200
                 hover:bg-green-500 focus:outline-none focus:ring-2 
                 focus:ring-green-500 focus:ring-offset-2 shadow-sm"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
