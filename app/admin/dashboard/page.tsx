"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

export default function AdminDashboardPage() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSkills, setTotalSkills] = useState(0);
  const [pendingSkills, setPendingSkills] = useState(0);

  const fetchData = async () => {
    try {
      const usersRes = await api.get("/admin/users");
      const skillsRes = await api.get("/admin/skills");

      const users = usersRes.data.users || usersRes.data;
      const skills = skillsRes.data.skills || skillsRes.data;

      setTotalUsers(users.length);
      setTotalSkills(skills.length);
      setPendingSkills(skills.filter((s: any) => !s.approved).length);
    } catch (err) {
      console.error("Failed to fetch admin dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center hover:shadow-md transition cursor-pointer">
          <span className="text-gray-500">Total Users</span>
          <span className="text-3xl font-bold">{totalUsers}</span>
        </div>

        {/* Skills Card */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center hover:shadow-md transition cursor-pointer">
          <span className="text-gray-500">Total Skills</span>
          <span className="text-3xl font-bold">{totalSkills}</span>
        </div>

        {/* Pending Skills Card */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center hover:shadow-md transition cursor-pointer">
          <span className="text-gray-500">Pending Skills</span>
          <span className="text-3xl font-bold">{pendingSkills}</span>
        </div>
      </div>
    </div>
  );
}
