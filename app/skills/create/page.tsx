"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreateSkillPage() {
  const router = useRouter();
  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect to login if user is not logged in
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleCreate = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to create a skill.");
      router.push("/auth/login");
      return;
    }

    if (!skillName.trim() || !description.trim() || !category.trim()) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/skills",
        {
          skill_name: skillName,
          description,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token manually
          },
        }
      );

      alert("Skill submitted! Waiting for admin approval.");
      router.push("/skills");
    } catch (err) {
      console.error(err);
      alert("Failed to create skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Skill</h2>

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Skill Name"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded mb-4"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 text-white p-2 rounded"
        onClick={handleCreate}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Skill"}
      </button>
    </div>
  );
}
