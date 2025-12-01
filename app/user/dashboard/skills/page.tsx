"use client";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Skill {
  id: number;
  skill_name: string;
  description: string;
  image_url: string;
  requested?: 'pending' | 'accepted' | 'rejected' | 'requested' | null;
}

export default function DashboardPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await api.get("/user/skills", {
          withCredentials: false
        });
        setSkills(res.data.skills || []);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  const handleRequest = async (skillId: number) => {
    setRequesting(skillId);
    try {
      const res = await api.post("/user/skill-requests", {
        requested_skill_id: skillId,
      });

      if (res.data.status === false) {
        alert(res.data.message || "Failed to send request");
      } else {
        alert("Skill request sent successfully!");
      setSkills((prev) =>
        prev.map((s) =>
          s.id === skillId ? { ...s, requested: 'pending' } : s
        )
      );
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send request");
    } finally {
      setRequesting(null);
    }
  };

  const handleDelete = async (skillId: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    setDeleting(skillId);
    try {
      await api.delete(`/user/skills/${skillId}`);
      setSkills((prev) => prev.filter((s) => s.id !== skillId));
    } catch (error) {
      console.error(error);
      alert("Failed to delete skill");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Skills</h1>

        {/* <Link
          href="/user/dashboard/skills/add"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-900"
        >
          <PlusCircle className="h-5 w-5" />
          Add Skill
        </Link> */}
      </div>

      {loading ? (
        <p>Loading skills...</p>
      ) : skills.length === 0 ? (
        <p className="text-gray-500">No skills added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="relative border rounded-lg p-4 shadow hover:shadow-md transition flex flex-col"
            >
              {/* ATTRACTIVE DELETE BUTTON */}
              <button
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black text-white hover:bg-red-600 transition"
                onClick={() => handleDelete(skill.id)}
                disabled={deleting === skill.id}
              >
                {deleting === skill.id ? "..." : "×"}
              </button>

              {skill.image_url && (
                <img
                  src={skill.image_url}
                  alt={skill.skill_name}
                  className="w-full h-40 object-cover rounded"
                />
              )}

              <h2 className="text-lg font-semibold mt-3">{skill.skill_name}</h2>

              <p className="text-gray-600 mt-1 flex-grow">
                {skill.description || "No description provided"}
              </p>

             {skill.requested === 'pending' ? (
  <span className="mt-2 text-yellow-600 font-semibold">Pending</span>
) : skill.requested === 'accepted' ? (
  <span className="mt-2 text-green-600 font-semibold">Accepted</span>
) : skill.requested === 'rejected' ? (
  <span className="mt-2 text-red-600 font-semibold">Rejected</span>
) : (
  <button
    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    onClick={() => handleRequest(skill.id)}
    disabled={requesting === skill.id}
  >
    {requesting === skill.id ? "Requesting..." : "Add Request"}
  </button>
)}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
