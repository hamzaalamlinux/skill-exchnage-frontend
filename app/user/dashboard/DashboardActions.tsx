"use client";

import { User, PlusCircle, List, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function DashboardActions() {
  const router = useRouter();

  // Logout function
  const handleLogout = async () => {
    try {
      await api.get("/user/logout");
      localStorage.removeItem("token"); // remove token
      router.push("/auth/login"); // redirect to login
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed!");
    }
  };

  // Actions array
  const actions = [
    {
      title: "Update Profile",
      description: "Edit your name, bio, and upload a profile picture.",
      icon: <User className="h-8 w-8 text-blue-500" />,
      link: "/user/dashboard/profile",
    },
    {
      title: "Add New Skill",
      description: "Showcase a new skill with image, category & description.",
      icon: <PlusCircle className="h-8 w-8 text-green-500" />,
      link: "/user/dashboard/skills/add",
    },
    {
      title: "View My Skills",
      description: "Manage, edit, and view all skills you’ve added.",
      icon: <List className="h-8 w-8 text-purple-500" />,
      link: "/user/dashboard/skills",
    },
    {
      title: "Logout",
      description: "Sign out of your account.",
      icon: <LogOut className="h-8 w-8 text-red-500" />,
      action: handleLogout,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {actions.map((action, idx) =>
        action.link ? (
          <a
            key={idx}
            href={action.link}
            className="flex items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition"
          >
            {action.icon}
            <div className="ml-4">
              <h3 className="font-semibold">{action.title}</h3>
              <p className="text-gray-500 text-sm">{action.description}</p>
            </div>
          </a>
        ) : (
          <button
            key={idx}
            onClick={action.action}
            className="flex items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition w-full text-left"
          >
            {action.icon}
            <div className="ml-4">
              <h3 className="font-semibold">{action.title}</h3>
              <p className="text-gray-500 text-sm">{action.description}</p>
            </div>
          </button>
        )
      )}
    </div>
  );
}
