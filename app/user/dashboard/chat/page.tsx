"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import { db } from "@/firebase/firebaseConfig";
import { ref as firebaseRef, onChildAdded, push, set } from "firebase/database";

interface Message {
  sender_id: string; // string to avoid type mismatch
  receiver_id: string; 
  message: string;
  timestamp: number;
}

export default function DashboardChat() {
  const skillOwnerId = "1"; // Replace with actual logged-in owner ID as string
  const [conversations, setConversations] = useState<string[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load all conversation IDs (assuming they exist under chats/)
  useEffect(() => {
    const convRef = firebaseRef(db, "chats");
    const unsubscribe = onChildAdded(convRef, (snapshot) => {
      const convId = snapshot.key;
      if (convId && !conversations.includes(convId)) {
        setConversations((prev) => [...prev, convId]);
      }
    });
    return () => unsubscribe();
  }, [conversations]);

  // Listen to messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) return;

    const chatRef = firebaseRef(db, `chats/${selectedConversation}/messages`);
    const unsubscribe = onChildAdded(chatRef, (snapshot) => {
      const msg = snapshot.val() as Message;
      setMessages((prev) => [...prev, msg]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, [selectedConversation]);

  // Send message
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const chatRef = firebaseRef(db, `chats/${selectedConversation}/messages`);
    const messagePayload: Message = {
      sender_id: skillOwnerId,
      receiver_id: selectedConversation
        .split("_")
        .find((id) => id !== skillOwnerId) as string,
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
    <div className="max-w-6xl mx-auto p-6 flex gap-6 h-[80vh]">
      {/* Conversation List */}
      <div className="w-1/4 bg-gray-50 border rounded-lg overflow-y-auto">
        <h2 className="p-4 font-bold text-lg border-b">Conversations</h2>
        {conversations.length === 0 && (
          <p className="p-4 text-gray-500">No conversations yet</p>
        )}
        {conversations.map((convId) => (
          <button
            key={convId}
            className={`w-full text-left px-4 py-2 hover:bg-gray-200 ${
              selectedConversation === convId ? "bg-gray-200 font-semibold" : ""
            }`}
            onClick={() => {
              setMessages([]);
              setSelectedConversation(convId);
            }}
          >
            {convId}
          </button>
        ))}
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-white shadow rounded-lg">
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 rounded-t-lg">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender_id === skillOwnerId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                  msg.sender_id === skillOwnerId
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <p>{msg.message}</p>
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Box */}
        <form
          onSubmit={handleSendMessage}
          className="flex border-t p-2 gap-2 bg-white rounded-b-lg"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
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
    </div>
  );
}
