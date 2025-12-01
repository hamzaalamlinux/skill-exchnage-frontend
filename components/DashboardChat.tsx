"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import { db } from '@/firebase/firebaseConfig';
import { ref as firebaseRef, onChildAdded, push, set } from "firebase/database";
import api from "@/lib/api";

interface Message {
  sender_id: number;
  receiver_id: number;
  message: string;
  timestamp: number;
}

interface ChatProps {
  otherUserId: number; // the user sending messages to this logged-in user
  loggedInUserId: number; // from session
}

export default function DashboardChat({ otherUserId, loggedInUserId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen for messages in real-time
  useEffect(() => {
    const conversationId =
      loggedInUserId < otherUserId
        ? `${loggedInUserId}_${otherUserId}`
        : `${otherUserId}_${loggedInUserId}`;

    const chatRef = firebaseRef(db, `chats/${conversationId}/messages`);

    const unsubscribe = onChildAdded(chatRef, (snapshot) => {
      const msg = snapshot.val() as Message;
      setMessages((prev) => [...prev, msg]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, [otherUserId, loggedInUserId]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const conversationId =
      loggedInUserId < otherUserId
        ? `${loggedInUserId}_${otherUserId}`
        : `${otherUserId}_${loggedInUserId}`;

    const chatRef = firebaseRef(db, `chats/${conversationId}/messages`);
    const messagePayload: Message = {
      sender_id: loggedInUserId,
      receiver_id: otherUserId,
      message: newMessage.trim(),
      timestamp: Date.now(),
    };

    try {
      const newMsgRef = push(chatRef);
      await set(newMsgRef, messagePayload);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex flex-col h-[60vh] border rounded p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender_id === loggedInUserId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                msg.sender_id === loggedInUserId
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

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
