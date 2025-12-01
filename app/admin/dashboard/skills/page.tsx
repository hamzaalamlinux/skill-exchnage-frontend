"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Skill {
  id: number;
  skill_name: string;
  description: string;
  category?: string;
  image_url: string;
  requested?: 'pending' | 'accepted' | 'rejected' | 'requested' | null;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // For modal
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const fetchSkills = async () => {
    try {
      const res = await api.get("/admin/skills");
      setSkills(res.data.skills || res.data);
    } catch (err) {
      console.error("Failed to fetch skills:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await api.put(`/admin/skills/${id}/approve`);
      fetchSkills();
    } catch (err) {
      console.error("Approve failed:", err);
      alert("Failed to approve skill");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await api.put(`/admin/skills/${id}/reject`);
      fetchSkills();
    } catch (err) {
      console.error("Reject failed:", err);
      alert("Failed to reject skill");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      await api.delete(`/admin/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete skill");
    }
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillName(skill.skill_name);
    setDescription(skill.description);
    setCategory(skill.category || "");
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editingSkill) return;

    try {
      await api.put(`/admin/skills/${editingSkill.id}`, {
        skill_name: skillName,
        description,
        category,
      });
      fetchSkills();
      setShowModal(false);
      setEditingSkill(null);
      alert("Skill updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update skill");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">All Skills</h2>

      {loading ? (
        <p className="text-gray-500">Loading skills...</p>
      ) : skills.length === 0 ? (
        <p className="text-gray-500">No skills found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-4">ID</th>
                <th className="text-left py-2 px-4">Skill</th>
                <th className="text-left py-2 px-4">Description</th>
                <th className="text-left py-2 px-4">Category</th>
                <th className="text-left py-2 px-4">Image</th>
                <th className="text-left py-2 px-4">Requested</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{skill.id}</td>
                  <td className="py-2 px-4">{skill.skill_name}</td>
                  <td className="py-2 px-4">{skill.description}</td>
                  <td className="py-2 px-4">{skill.category || "-"}</td>
                  <td className="py-2 px-4">
                    {skill.image_url ? (
                      <img
                        src={skill.image_url}
                        alt={skill.skill_name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {skill.requested === "pending" && (
                        <span className="text-yellow-600 font-semibold">Pending</span>
                    )}
                    {skill.requested === "accepted" && (
                        <span className="text-green-600 font-semibold">Accepted</span>
                    )}
                    {skill.requested === "rejected" && (
                        <span className="text-red-600 font-semibold">Rejected</span>
                    )}
                    {skill.requested === "requested" && (
                        <span className="text-blue-600 font-semibold">Requested</span>
                    )}
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    {skill.requested && (
                      <>
                        <button
                          onClick={() => handleApprove(skill.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(skill.id)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => openEditModal(skill)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Skill Modal */}
      {showModal && editingSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h3 className="text-xl font-semibold mb-4">Edit Skill</h3>

            <div className="mb-3">
              <label className="block text-gray-700 mb-1">Skill Name</label>
              <input
                type="text"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
