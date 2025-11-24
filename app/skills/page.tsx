"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SkillsPage() {
  const router = useRouter();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) router.push("/auth/login");

    api.get("/skills").then((res) => {
      setSkills(res.data);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Skills</h1>

      <div className="grid grid-cols-3 gap-6">
        {skills.map((skill: any) => (
          <div
            key={skill.id}
            className="p-4 bg-white shadow rounded-lg cursor-pointer"
            onClick={() => router.push(`/skills/${skill.id}`)}
          >
            <h3 className="font-bold">{skill.title}</h3>
            <p className="text-gray-600">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
