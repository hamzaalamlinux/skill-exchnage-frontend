"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);

  const loadRequests = () => {
    api.get("/skill-requests").then((res) => setRequests(res.data));
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) router.push("/auth/login");
    loadRequests();
  }, []);

  const accept = async (id: number) => {
    await api.put(`/skill-requests/${id}/accept`);
    loadRequests();
  };

  const reject = async (id: number) => {
    await api.put(`/skill-requests/${id}/reject`);
    loadRequests();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Skill Requests</h1>

      {requests.map((req: any) => (
        <div key={req.id} className="p-4 bg-white shadow mb-3 rounded">
          <p>
            <strong>{req.sender?.name}</strong> requested{" "}
            <span className="text-blue-600">{req.skill?.title}</span>
          </p>

          {req.status === "pending" ? (
            <div className="mt-2 flex gap-3">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={() => accept(req.id)}
              >
                Accept
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => reject(req.id)}
              >
                Reject
              </button>
            </div>
          ) : (
            <p className="text-gray-500 mt-2">Status: {req.status}</p>
          )}
        </div>
      ))}
    </div>
  );
}
