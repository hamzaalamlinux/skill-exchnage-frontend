'use client';
import { useEffect, useState } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { db } from '@/firebase/firebaseConfig';
import api from '@/lib/api';

interface ChatBoxProps {
  chatId: string; // type your chatId, could also be number if your ID is numeric
  user: { id: number; name?: string }; // define user type
}

interface Message {
  sender_id: number;
  message: string;
  created_at: number;
}

export default function ChatBox({ chatId, user } :ChatBoxProps ) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
    useEffect(() => {
        const chatRef = ref(db, `chats/${chatId}`);
        onValue(chatRef, snapshot => setMessages(snapshot.val() ? Object.values(snapshot.val()) : []));
    }, [chatId]);
    const sendMessage = async () => {
        if (!text) return;
        await api.post('/chat/send', { message: text, receiver_id: user.id });
        push(ref(db, `chats/${chatId}`), { message: text, sender_id: user.id, created_at: Date.now() });
        setText('');
    };
    return (
        <div className="bg-white shadow rounded-xl p-5">
            <div className="h-80 overflow-y-auto mb-4">
                {messages.map((msg, i) => (
                    <div key={i} className={`p-2 my-1 rounded ${msg.sender_id === user.id ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`}>{msg.message}</div>
                ))}
            </div>
            <div className="flex gap-2">
                <input type="text" className="flex-1 border p-2 rounded" value={text} onChange={e => setText(e.target.value)} />
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}