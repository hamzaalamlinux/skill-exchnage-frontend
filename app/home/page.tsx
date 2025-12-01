"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

interface Skill {
  id: number;
  user_id: number;
  skill_name: string;
  description: string;
  category: string;
  image_url: string;
}

export default function HomePage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await api.get("/skills"); // public API
        setSkills(res.data || []);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Skill Showcase</h1>

      {loading ? (
        <p className="text-center">Loading skills...</p>
      ) : skills.length === 0 ? (
        <p className="text-center text-gray-500">No skills available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {skills.map((skill) => (
  <div
    key={skill.id}
    className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
  >
    {skill.image_url && (
      <img
        src={skill.image_url}
        alt={skill.skill_name}
        className="w-full h-48 object-cover"
      />
    )}
    <div className="p-4 flex flex-col flex-grow">
      <h2 className="text-xl font-semibold">{skill.skill_name}</h2>
      <p className="text-gray-600 mt-2 flex-grow">
        {skill.description || "No description provided"}
      </p>
      <span className="text-gray-500 text-sm mt-2">{skill.category}</span>

      {/* View Details Button */}
      <Link
        href={`/home/${skill.id}`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
      >
        View Details
      </Link>
    </div>
  </div>
))}
        </div>
      )}
    </div>
  );
}
