"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

export default function MessagesList() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            <Link
              href={`/messages/${user.id}`}
              className="text-blue-600 underline"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
