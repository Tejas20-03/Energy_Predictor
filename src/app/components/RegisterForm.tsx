"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "general",
    companyCode: "",
  });

  const showCompanyCode = formData.userType === "admin";

  const handleSubmit = async (e: React.FormEvent) => {
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4 rounded-md shadow-sm">
        <div>
          <label htmlFor="name" className="sr-only">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-green-600"
            placeholder="Full Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-green-600"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-green-600"
            placeholder="Password"
          />
        </div>
        <div>
          <label htmlFor="userType" className="sr-only">
            User Type
          </label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600"
          >
            <option value="general">General User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {showCompanyCode && (
          <div>
            <label htmlFor="companyCode" className="sr-only">
              Company Code
            </label>
            <input
              id="companyCode"
              name="companyCode"
              type="text"
              required={showCompanyCode}
              value={formData.companyCode}
              onChange={handleChange}
              className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-green-600"
              placeholder="Company Code"
            />
          </div>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
