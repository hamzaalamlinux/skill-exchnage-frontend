"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { db } from "@/firebase/firebaseConfig";
import { ref, onValue, push } from "firebase/database";

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const otherUserId = Number(params.otherUserId);

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  // Load current user ID from token (or call API)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) router.push("/auth/login");
    else {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setUserId(user.id);
    }
  }, [router]);

  // Real-time Firebase messages
  useEffect(() => {
    if (!userId) return;

    const [smallerId, largerId] = [userId, otherUserId].sort((a, b) => a - b);
    const conversationRef = ref(db, `chats/${smallerId}_${largerId}/messages`);

    const unsubscribe = onValue(conversationRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(data ? Object.values(data) : []);
    });

    return () => unsubscribe();
  }, [userId, otherUserId]);

  // Send message
  const sendMessage = async () => {
    if (!text.trim() || !userId) return;

    await api.post("/chat/send", {
      receiver_id: otherUserId,
      message: text,
    });

    setText(""); // clear input
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="bg-white shadow p-4 h-[500px] rounded overflow-y-auto">
        {messages.map((msg: any, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.sender_id === userId ? "bg-blue-100 text-right" : "bg-gray-100"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Type a message"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
