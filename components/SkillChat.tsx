"use client";

import { useEffect, useState, useRef } from "react";
import { db } from '@/firebase/firebaseConfig';
import { ref as firebaseRef, onChildAdded } from "firebase/database";
import api from "@/lib/api";
import { useParams } from "next/navigation";

export default function SkillChat() {
  const { id: skillOwnerId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!skillOwnerId) return;

    const conversationId =
      1 < Number(skillOwnerId) ? `1_${skillOwnerId}` : `${skillOwnerId}_1`; // Replace 1 with logged-in user id
    const chatRef = firebaseRef(db, `chats/${conversationId}/messages`);

    // Listen for new messages in real-time
    const unsubscribe = onChildAdded(chatRef, (snapshot) => {
      const msg = snapshot.val();
      setMessages((prev) => [...prev, msg]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe;
  }, [skillOwnerId]);

  return (
    <div className="flex flex-col h-[70vh] border rounded p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender_id === 1 ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                msg.sender_id === 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
}
