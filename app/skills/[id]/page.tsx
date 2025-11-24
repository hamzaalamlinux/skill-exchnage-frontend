"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

export default function SkillDetail() {
  const router = useRouter();
  const params = useParams();
  const skillId = params.id;

  const [skill, setSkill] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) router.push("/auth/login");

    api.get(`/skills`).then((res) => {
      const data = res.data.find((x: any) => x.id == skillId);
      setSkill(data);
    });
  }, [skillId]);

  const sendRequest = async () => {
    await api.post("/skill-requests", { skill_id: skillId });
    alert("Request sent!");
  };

  if (!skill) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{skill.title}</h1>
      <p className="text-gray-700 mb-4">{skill.description}</p>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={sendRequest}
      >
        Request This Skill
      </button>
    </div>
  );
}
