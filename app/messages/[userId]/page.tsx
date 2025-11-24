"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const params = useParams();
  const otherUserId = params.otherUserId;

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const loadMessages = async () => {
    const res = await api.get(`/chat/messages/${otherUserId}`);
    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;
    await api.post("/chat/send", {
      receiver_id: otherUserId,
      message: text,
    });
    setText("");
    loadMessages();
  };

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>

      <div className="bg-white shadow p-4 h-[500px] rounded overflow-y-auto">
        {messages.map((msg: any, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.is_sender ? "bg-blue-100 text-right" : "bg-gray-100"
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
