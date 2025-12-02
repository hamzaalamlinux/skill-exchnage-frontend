"use client";

import { ReactNode } from "react";
import { User, List, PlusCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface Action {
  title: string;
  icon: React.ReactNode;
  link?: string;
  action?: () => void;
}

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.get("/user/logout"); // or /admin/logout if you have
      localStorage.removeItem("token");
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed!");
    }
  };

  const actions: Action[] = [
    { title: "Dashboard", icon: <List className="h-5 w-5" />, link: "/admin/dashboard" },
    { title: "Users", icon: <User className="h-5 w-5" />, link: "/admin/dashboard/users" },
    { title: "Skills", icon: <PlusCircle className="h-5 w-5" />, link: "/admin/dashboard/skills" },
    { title: "Logout", icon: <LogOut className="h-5 w-5" />, action: handleLogout },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 font-bold text-xl border-b">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          {actions.map((action, idx) =>
            action.link ? (
              <a
                key={idx}
                href={action.link}
                className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100 transition text-gray-800 font-medium"
              >
                {action.icon}
                <span>{action.title}</span>
              </a>
            ) : (
              <button
                key={idx}
                onClick={action.action}
                className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100 transition text-gray-800 font-medium w-full text-left"
              >
                {action.icon}
                <span>{action.title}</span>
              </button>
            )
          )}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          {/* Optional right header items */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
