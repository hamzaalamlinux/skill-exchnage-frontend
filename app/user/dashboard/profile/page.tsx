"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [existingImage, setExistingImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/user/profile");
                const user = res.data.user;
                setName(user.name || "");
                setBio(user.bio || "");
                setExistingImage(res.data.image_url);
            } catch (err) {
                console.error("Profile load failed:", err);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio);
        if (image) formData.append("image", image);

        try {
            const res = await api.post("/user/profile/update", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setExistingImage(res.data.image_url);
            alert("Profile updated!");
        } catch (err) {
            console.error(err);
            alert("Update failed!");
        }

        setLoading(false);
    };

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 p-5">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                
                {/* Back Button */}
                   <Link
          href="/user/dashboard/skills"
          className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 rounded-md text-sm"
        >
          ← Back
        </Link>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    My Profile
                </h2>

                <div className="flex justify-center mb-6">
                    {existingImage ? (
                        <img
                            src={existingImage}
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-sm"
                        />
                    ) : (
                        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-semibold border-4 border-blue-500">
                            No Image
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Bio
                        </label>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            New Profile Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImage(e.target.files?.[0] || null)
                            }
                            className="block w-full text-gray-700"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}
