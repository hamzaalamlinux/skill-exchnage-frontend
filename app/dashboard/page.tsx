"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Check if user is logged in
    if (!token) {
      router.push("/auth/login"); // Redirect to login if not
    }
  }, [router]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-lg">Profile</div>
        <div className="p-6 bg-white shadow rounded-lg">Uploaded Skills</div>
        <div className="p-6 bg-white shadow rounded-lg">Requests</div>
      </div>
    </div>
  );
}
