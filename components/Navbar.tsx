'use client';
import Link from 'next/link';
export default function Navbar() {
return (
<nav className="bg-white shadow p-4 flex justify-between">
<Link href="/" className="text-xl font-bold text-blue-600">SkillSwap</Link>
<div className="space-x-4">
<Link href="/skills" className="text-gray-700 hover:text-blue-600">Skills</Link>
<Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
<Link href="/auth/login" className="text-gray-700 hover:text-blue-600">Login</Link>
</div>
</nav>
);
}