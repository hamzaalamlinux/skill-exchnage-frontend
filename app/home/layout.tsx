"use client";

import { ReactNode } from "react";
import Link from "next/link";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MySkills Showcase
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/auth/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-white shadow-inner p-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MySkills Showcase. All rights reserved.
      </footer>
    </div>
  );
}
