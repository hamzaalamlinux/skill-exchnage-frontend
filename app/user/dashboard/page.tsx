"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Pencil, PlusCircle, List, Send } from "lucide-react";

export default function UserDashboardPage() {
  const router = useRouter();

  const actions = [
    {
      title: "Update Profile",
      description: "Edit your name, bio, and upload a profile picture.",
      icon: <User className="h-8 w-8 text-blue-500" />,
      link: "/user/dashboard/profile",
    },
    {
      title: "Add New Skill",
      description: "Showcase a new skill with image, category & description.",
      icon: <PlusCircle className="h-8 w-8 text-green-500" />,
      link: "/user/dashboard/skills/add",
    },
    {
      title: "View My Skills",
      description: "Manage, edit, and view all skills you’ve added.",
      icon: <List className="h-8 w-8 text-purple-500" />,
      link: "/user/dashboard/skills",
    },
     {
      title: "Chat",
      description: "View and reply to messages from other users in real-time.",
      icon: <Send className="h-8 w-8 text-orange-500" />,
      link: "/user/dashboard/chat",
    }
    // {
    //   title: "Send Skill Request",
    //   description: "Request a skill from another user instantly.",
    //   icon: <Send className="h-8 w-8 text-orange-500" />,
    //   link: "/user/dashboard/requests/send",
    // },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 text-center mb-10"
      >
        Welcome to Your Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {actions.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg rounded-2xl hover:bg-white/20 transition-all">
              <CardHeader className="flex items-center space-x-4">
                {item.icon}
                <CardTitle className="text-lg text-gray-900">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm mb-4">{item.description}</p>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => router.push(item.link)}
                >
                  Go to {item.title}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
