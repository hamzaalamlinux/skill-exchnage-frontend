"use client";

import { useState } from "react";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res =  await register({ name, email, password });
       //SET TOKEN
      localStorage.setItem("token", res.token);
      router.push("/user/dashboard");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white">
              Create Your Account
            </CardTitle>
            <p className="text-gray-300 text-sm mt-2">
              Join our community & start growing
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
              <Input
                placeholder="Full Name"
                className="pl-10 bg-white/20 border-white/30 text-white placeholder-gray-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
              <Input
                type="email"
                placeholder="Email Address"
                className="pl-10 bg-white/20 border-white/30 text-white placeholder-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10 bg-white/20 border-white/30 text-white placeholder-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 transition-all rounded-xl shadow-lg"
                onClick={handleRegister}
              >
                Create Account
              </Button>
            </motion.div>

            <div className="text-center mt-4">
              <a
                href="/auth/login"
                className="text-blue-300 hover:underline text-sm"
              >
                Already have an account? Login
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
