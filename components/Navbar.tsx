'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `text-gray-700 hover:text-blue-600 font-medium ${pathname === path ? 'text-blue-600 underline' : ''}`;

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        SkillSwap
      </Link>

      <div className="space-x-6 flex items-center">
        <Link href="/skills" className={linkClass('/skills')}>Skills</Link>
        <Link href="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>
        <Link href="/auth/login" className={linkClass('/auth/login')}>Login</Link>
        <Link href="/auth/register" className={linkClass('/auth/register')}>Register</Link>
      </div>
    </nav>
  );
}