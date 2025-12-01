"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function AddSkillPage() {
  const router = useRouter();

  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("skill_name", skillName);
      formData.append("description", description);
      formData.append("category", category);

      if (image) {
        formData.append("image", image);
      }

      await api.post("/user/skills", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Skill added successfully!");
      router.push("/user/dashboard/skills");
    } catch (error) {
      console.error(error);
      alert("Failed to add skill");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/user/dashboard/skills"
          className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 rounded-md text-sm"
        >
          ← Back
        </Link>

        <h1 className="text-xl font-bold">Add Skill</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Skill Name */}
        <div>
          <label className="block mb-1 font-medium">Skill Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="border p-2 w-full rounded"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Skill Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="border p-2 w-full rounded"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-900"
        >
          {loading ? "Saving..." : "Save Skill"}
        </button>
      </form>
    </div>
  );
}
