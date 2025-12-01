"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SendSkillRequestPage() {
  const router = useRouter();

  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      const formData = new FormData();
      formData.append("skill_name", skillName);
      formData.append("description", description);
      if (imageFile) formData.append("image", imageFile);

      const res = await api.post("/skills/request", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Something went wrong");
        setLoading(false);
        return;
      }

      setSuccess("Skill request sent successfully!");
      setLoading(false);

      // redirect after 1 sec
      setTimeout(() => {
        router.push("/user/dashboard/skills");
      }, 1000);
    } catch (err) {
      setError("Failed to send request");
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Send Skill Request</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* SKILL NAME */}
        <div>
          <label className="block font-medium mb-1">Skill Name</label>
          <input
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter skill name"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter description"
          ></textarea>
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block font-medium mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e: any) => setImageFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 text-white rounded ${
            loading ? "bg-gray-500" : "bg-black hover:bg-neutral-900"
          }`}
        >
          {loading ? "Submitting..." : "Send Request"}
        </button>
      </form>
    </div>
  );
}
