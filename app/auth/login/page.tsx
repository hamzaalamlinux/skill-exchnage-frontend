"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await login(email, password);

      if (!res || !res.role) {
        alert("Invalid response from server");
        return;
      }
      //SET TOKEN
      localStorage.setItem("token", res.token);
      // ROLE BASED REDIRECT
      if (res.role === 1) {
        router.push("/admin/dashboard");
      } else if (res.role === 2) {
        router.push("/user/dashboard");
      } else {
        router.push("/home");
      }

    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl rounded-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-white tracking-tight">
              Welcome Back
            </CardTitle>
            <p className="text-gray-300 text-sm mt-2">
              Sign in to continue to your dashboard
            </p>
          </CardHeader>

          <CardContent className="space-y-6 mt-2">
            
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
              <Input
                type="email"
                placeholder="Email"
                className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full py-3 text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 rounded-xl"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Please wait..." : "Login"}
            </Button>

            <div className="text-center mt-1">
              <a
                href="/auth/register"
                className="text-blue-400 hover:underline text-sm"
              >
                Don’t have an account? Register
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
