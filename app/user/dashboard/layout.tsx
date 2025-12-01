"use client";

import { ReactNode } from "react";
import { User, PlusCircle, List, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface Action {
  title: string;
  icon: JSX.Element;
  link?: string;
  action?: () => void;
}

export default function UserDashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.get("/user/logout");
      localStorage.removeItem("token");
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed!");
    }
  };

  const actions: Action[] = [
    { title: "Profile", icon: <User className="h-5 w-5" />, link: "/user/dashboard/profile" },
    { title: "Add Skill", icon: <PlusCircle className="h-5 w-5" />, link: "/user/dashboard/skills/add" },
    { title: "My Skills", icon: <List className="h-5 w-5" />, link: "/user/dashboard/skills" },
    { title: "Logout", icon: <LogOut className="h-5 w-5" />, action: handleLogout },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="bg-white shadow flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800"><a href="/user/dashboard"> Dashboard</a></h1>

        <nav className="flex items-center space-x-4">
          {actions.map((action, idx) =>
            action.link ? (
              <a
                key={idx}
                href={action.link}
                className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium"
              >
                {action.icon}
                <span>{action.title}</span>
              </a>
            ) : (
              <button
                key={idx}
                onClick={action.action}
                className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium"
              >
                {action.icon}
                <span>{action.title}</span>
              </button>
            )
          )}
        </nav>
      </header>

      {/* Page content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
