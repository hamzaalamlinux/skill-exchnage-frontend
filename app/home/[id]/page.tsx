// "use client";

// import { useEffect, useState, useRef, FormEvent } from "react";
// import { useParams } from "next/navigation";
// import api from "@/lib/api";
// import { db } from "@/firebase/firebaseConfig";
// import { ref as firebaseRef, onChildAdded, push, set } from "firebase/database";

// interface Skill {
//   id: number;
//   skill_name: string;
//   description: string;
//   category: string;
//   image_url: string;
//   user_id: any; // skill owner's id
// }

// interface Message {
//   sender_id: string; // string to support visitor temp id
//   receiver_id: number;
//   message: string;
//   timestamp: number;
// }

// export default function SkillDetailPage() {
//   const params = useParams();
//   const skillId = params.id;
//   const [skill, setSkill] = useState<Skill | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const [visitorId, setVisitorId] = useState<string>("");

//   // Generate visitor ID and save in localStorage
//   useEffect(() => {
//     let vid = localStorage.getItem("visitor_id");
//     if (!vid) {
//       vid = `visitor_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
//       localStorage.setItem("visitor_id", vid);
//     }
//     setVisitorId(vid);
//   }, []);

//   // Fetch skill details
//   useEffect(() => {
//     if (!skillId) return;

//     async function fetchSkill() {
//       try {
//         const res = await api.get(`/skills/${skillId}`);
//         setSkill(res.data);
//       } catch (error) {
//         console.error("Error fetching skill:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchSkill();
//   }, [skillId]);

//   // Firebase real-time chat listener
// useEffect(() => {
//   if (!skill || !visitorId) return;

//   // Convert skill.user_id to string for comparison
//   const ownerIdStr = skill.user_id.toString();

//   const conversationId =
//     visitorId < ownerIdStr
//       ? `${visitorId}_${ownerIdStr}`
//       : `${ownerIdStr}_${visitorId}`;

//   const chatRef = firebaseRef(db, `chats/${conversationId}/messages`);

//   const unsubscribe = onChildAdded(chatRef, (snapshot) => {
//     const msg = snapshot.val() as Message;
//     setMessages((prev) => [...prev, msg]);
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   });

//   return () => unsubscribe();
// }, [skill, visitorId]);

//   // Send message
//   const handleSendMessage = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !skill || !visitorId) return;

//     const conversationId =
//       visitorId < skill.user_id
//         ? `${visitorId}_${skill.user_id}`
//         : `${skill.user_id}_${visitorId}`;

//     const chatRef = firebaseRef(db, `chats/${conversationId}/messages`);
//     const messagePayload: Message = {
//       sender_id: visitorId,
//       receiver_id: skill.user_id,
//       message: newMessage.trim(),
//       timestamp: Date.now(),
//     };

//     try {
//       const newMsgRef = push(chatRef);
//       await set(newMsgRef, messagePayload);
//       setNewMessage("");
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   if (loading) return <p className="text-center p-6">Loading skill...</p>;
//   if (!skill) return <p className="text-center p-6 text-red-500">Skill not found.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       {/* Skill Details */}
//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         {skill.image_url && (
//           <img
//             src={skill.image_url}
//             alt={skill.skill_name}
//             className="w-full h-96 object-cover"
//           />
//         )}
//         <div className="p-6">
//           <h1 className="text-3xl font-bold">{skill.skill_name}</h1>
//           <p className="text-gray-600 mt-2">{skill.description}</p>
//           <span className="text-gray-500 text-sm mt-2 block">
//             Category: {skill.category}
//           </span>
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div className="bg-white shadow rounded-lg flex flex-col h-[70vh]">
//         <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 rounded-t-lg">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex ${msg.sender_id === visitorId ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-lg max-w-xs break-words ${
//                   msg.sender_id === visitorId
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200 text-gray-900"
//                 }`}
//               >
//                 <p>{msg.message}</p>
//                 <div className="text-xs text-gray-400 mt-1 text-right">
//                   {new Date(msg.timestamp).toLocaleTimeString()}
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef}></div>
//         </div>

//         {/* Input Box */}
//         <form
//           onSubmit={handleSendMessage}
//           className="flex border-t p-2 gap-2 bg-white rounded-b-lg"
//         >
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { db } from "@/firebase/firebaseConfig";
import { ref as firebaseRef, onChildAdded, push, set } from "firebase/database";

interface Skill {
  id: number;
  skill_name: string;
  description: string;
  category: string;
  image_url: string;
  user_id: any;
}

interface Message {
  sender_id: string;
  receiver_id: number;
  message: string;
  timestamp: number;
}

interface Feedback {
  id: number;
  feedback: string;
  visitor_name: string | null;
  visitor_email: string | null;
  created_at: string;
}

export default function SkillDetailPage() {
  const params = useParams();
  const skillId = params.id;

  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [visitorId, setVisitorId] = useState<string>("");

  // FEEDBACK UI
  const [feedbackText, setFeedbackText] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  // RATING UI
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Generate visitor ID
  useEffect(() => {
    let vid = localStorage.getItem("visitor_id");
    if (!vid) {
      vid = `visitor_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      localStorage.setItem("visitor_id", vid);
    }
    setVisitorId(vid);
  }, []);

  // Fetch skill
  useEffect(() => {
    if (!skillId) return;

    async function fetchSkill() {
      try {
        const res = await api.get(`/skills/${skillId}`);
        setSkill(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    fetchSkill();
  }, [skillId]);

  // Fetch feedback list
  useEffect(() => {
    if (!skillId) return;

    async function fetchFeedback() {
      try {
        const res = await api.get(`/skills/${skillId}/feedback`);
        setFeedbackList(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchFeedback();
  }, [skillId]);

  // Submit Rating
  const submitRating = async () => {
    if (!rating) return alert("Please give a rating");

    try {
      await api.post("/skills/add-rating", {
        skill_id: skillId,
        rating: rating,
      });

      alert("Rating submitted!");
      setRating(0);
    } catch (err) {
      console.error(err);
      alert("Error submitting rating");
    }
  };

  // Submit Feedback
  const submitFeedback = async () => {
    if (!feedbackText.trim() || !visitorName.trim() || !visitorEmail.trim())
      return alert("Please fill in all feedback fields");

    try {
      const res = await api.post("/skills/add-feedback", {
        skill_id: skillId,
        feedback: feedbackText,
        visitor_name: visitorName,
        visitor_email: visitorEmail,
      });

      // Update UI instantly
      setFeedbackList((prev) => [
        {
          id: Date.now(),
          created_at: new Date().toISOString(),
          feedback: feedbackText,
          visitor_email: visitorEmail,
          visitor_name: visitorName,
        },
        ...prev,
      ]);

      setFeedbackText("");
      setVisitorName("");
      setVisitorEmail("");
    } catch (err) {
      console.error(err);
      alert("Error adding feedback");
    }
  };

  // Chat Listener
  useEffect(() => {
    if (!skill || !visitorId) return;

    const ownerId = skill.user_id.toString();
    const conversationId =
      visitorId < ownerId ? `${visitorId}_${ownerId}` : `${ownerId}_${visitorId}`;

    const chatRef = firebaseRef(db, `chats/${conversationId}/messages`);

    const unsubscribe = onChildAdded(chatRef, (snapshot) => {
      const msg = snapshot.val() as Message;
      setMessages((prev) => [...prev, msg]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, [skill, visitorId]);

  // Send message
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !skill) return;

    const ownerId = skill.user_id.toString();
    const conversationId =
      visitorId < ownerId ? `${visitorId}_${ownerId}` : `${ownerId}_${visitorId}`;

    const chatRef = firebaseRef(db, `chats/${conversationId}/messages`);

    const newMsgRef = push(chatRef);
    await set(newMsgRef, {
      sender_id: visitorId,
      receiver_id: skill.user_id,
      message: newMessage,
      timestamp: Date.now(),
    });

    setNewMessage("");
  };

  if (loading) return <p className="p-5 text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT SIDE */}
      <div className="col-span-1 space-y-6">

        {/* Skill Details */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <img src={skill?.image_url} className="w-full h-56 object-cover" />
          <div className="p-5">
            <h1 className="text-3xl font-bold">{skill?.skill_name}</h1>
            <p className="mt-2 text-gray-600">{skill?.description}</p>
            <span className="text-xs mt-3 inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {skill?.category}
            </span>
          </div>
        </div>

        {/* ⭐ RATING UI */}
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-3">Give Rating</h2>

          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                xmlns="http://www.w3.org/2000/svg"
                fill={(hoverRating || rating) >= star ? "#fbbf24" : "none"}
                viewBox="0 0 24 24"
                stroke="#fbbf24"
                className="w-8 h-8 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.156 
                     6.631a1 1 0 00.95.69h6.969c.969 0 
                     1.371 1.24.588 1.81l-5.634 4.09a1 1 0 
                     00-.364 1.118l2.157 6.631c.3.921-.755 
                     1.688-1.54 1.118l-5.634-4.09a1 1 0 
                     00-1.176 0l-5.634 4.09c-.784.57-1.838-.197-1.539-1.118l2.157-6.631a1 
                     1 0 00-.364-1.118L2.342 12.06c-.783-.57-.38-1.81.588-1.81h6.969a1 
                     1 0 00.95-.69l2.156-6.631z"
                />
              </svg>
            ))}
          </div>

          <button
            onClick={submitRating}
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
          >
            Submit Rating
          </button>
        </div>

        {/* 💬 FEEDBACK */}
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-2">Write Feedback</h2>

          <input
            type="text"
            placeholder="Your Name"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            className="w-full border rounded-lg p-2 mb-2"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={visitorEmail}
            onChange={(e) => setVisitorEmail(e.target.value)}
            className="w-full border rounded-lg p-2 mb-2"
          />

          <textarea
            rows={3}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder="Write your feedback..."
          />

          <button
            onClick={submitFeedback}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Feedback
          </button>

          <h3 className="text-lg font-semibold mt-6 mb-2">Recent Feedback</h3>

          <div className="max-h-60 overflow-y-auto space-y-3">
            {feedbackList.map((fb) => (
              <div key={fb.id} className="border bg-gray-50 p-3 rounded-lg">
                <p className="font-semibold">{fb.visitor_name} ({fb.visitor_email})</p>
                <p className="text-gray-800 mt-1">{fb.feedback}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(fb.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — CHAT */}
      <div className="col-span-2 bg-white shadow rounded-xl flex flex-col h-[80vh]">
        <div className="p-4 border-b text-lg font-semibold">Chat with Owner</div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender_id === visitorId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.sender_id === visitorId
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                <p>{msg.message}</p>
                <p className="text-[10px] mt-1 text-right text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border px-3 py-2 rounded-lg"
            placeholder="Type a message..."
          />
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
