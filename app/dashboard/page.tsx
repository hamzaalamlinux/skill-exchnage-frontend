"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) router.push("/auth/login");
  }, [router]);

  const cards = [
    { title: 'Profile', path: '/profile' },
    { title: 'Uploaded Skills', path: '/skills' },
    { title: 'Requests', path: '/requests' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div
            key={card.title}
            className="p-6 bg-white shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition-shadow text-center font-medium text-gray-700"
            onClick={() => router.push(card.path)}
          >
            {card.title}
          </div>
        ))}
      </div>
    </div>
  );
}