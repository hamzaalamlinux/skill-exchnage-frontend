'use client';

import { useEffect, useState, useRef } from 'react';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';
import { db } from '@/firebase/firebaseConfig';
import api from '@/lib/api';

interface ChatBoxProps {
  chatId: string;
  user: { id: number; name?: string };
}

interface Message {
  sender_id: number;
  message: string;
  created_at: number;
}

export default function ChatBox({ chatId, user }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatRef = ref(db, `chats/${chatId}`);
    onValue(chatRef, snapshot => setMessages(snapshot.val() ? Object.values(snapshot.val()) : []));
  }, [chatId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    await api.post('/chat/send', { message: text, receiver_id: user.id });
    push(ref(db, `chats/${chatId}`), { message: text, sender_id: user.id, created_at: Date.now() });
    setText('');
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 flex flex-col">
      <div ref={scrollRef} className="h-80 overflow-y-auto mb-4 flex flex-col gap-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] break-words ${msg.sender_id === user.id ? 'bg-blue-100 self-end text-right' : 'bg-gray-200 self-start text-left'}`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}