// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SkillSwap",
  description: "Barter your skills. Learn anything. Teach anything.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-gray-100">
      <body className={`${inter.className} min-h-screen flex flex-col`}>        
        <Navbar />

        <main className="flex-1 w-full max-w-6xl mx-auto p-6">{children}</main>

        <Footer />
      </body>
    </html>
  );
}