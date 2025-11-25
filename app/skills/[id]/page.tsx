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
    if (!token) {
      router.push("/auth/login");
      return;
    }

    api
      .get("/skills", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data.find((x: any) => x.id == skillId);
        setSkill(data);
      })
      .catch((err) => console.error(err));
  }, [skillId, router]);

  const sendRequest = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to request a skill.");
      router.push("/auth/login");
      return;
    }

    try {
      await api.post(
        "/skill-requests",
        { requested_skill_id: skillId }, // corrected field
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Request sent!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to send request.");
    }
  };

  if (!skill) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{skill.skill_name}</h1>
      <p className="text-gray-600 mb-2">Category: {skill.category}</p>
      <p className="text-gray-700 mb-4">{skill.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Status: {skill.status || "Pending"}
      </p>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={sendRequest}
      >
        Request This Skill
      </button>
    </div>
  );
}
