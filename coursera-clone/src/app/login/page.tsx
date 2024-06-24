"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    Swal.fire({
      title: "Logging in...",
      text: "Please wait while we log you in",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      if (response.headers.get("content-type")?.includes("application/json")) {
        data = await response.json();
      }

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data?.message || "Login successful",
        }).then(() => {
          router.push("/");
          
          router.refresh();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data?.error || "An error occurred",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "An unexpected error occurred",
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 mb-10 bg-white p-8 border border-gray-300 rounded">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </>
  );
}
