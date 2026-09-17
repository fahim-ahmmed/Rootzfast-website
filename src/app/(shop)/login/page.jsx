"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Card, CardBody } from "@heroui/react";
import { Lock, Mail, ShieldCheck, ArrowLeft, Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    const allowedEmails = [
      "rootzofficialbd@gmail.com",
      "rootzofficialbd.com",
      "admin@rootz.com",
    ];

    if (allowedEmails.includes(cleanEmail) && (cleanPassword === "Rootz2026" || cleanPassword === "rootz2026")) {
      document.cookie = "admin_logged_in=true; path=/; max-age=86400; SameSite=Lax";
      localStorage.setItem("rootz_admin_session", "true");
      router.push("/admin/dashboard");
    } else {
      setErrorMessage("ভুল ইমেইল অথবা পাসওয়ার্ড দিয়েছেন! শুধুমাত্র এডমিন প্রবেশ করতে পারবেন।");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold text-[#0E281D] hover:text-[#C28E79] transition-colors bg-white/80 px-4 py-2 rounded-full border border-gray-200 shadow-sm backdrop-blur-md"
      >
        <ArrowLeft size={16} /> হোমপেজে ফিরুন
      </Link>

      <Card className="max-w-md w-full bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-2xl rounded-[2.5rem] p-4 sm:p-6 my-10">
        <CardBody className="space-y-6">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#0E281D] text-white flex items-center justify-center mx-auto shadow-lg border-2 border-[#C28E79]/40">
              <ShieldCheck size={32} className="text-[#C28E79]" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#0E281D]">ROOTZ Admin Portal</h1>
              <p className="text-xs text-gray-500 mt-1">শুধুমাত্র এডমিন এক্সেসের জন্য সংরক্ষিত</p>
            </div>
          </div>

          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in duration-300">
              <AlertCircle size={18} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">এডমিন ইমেইল (Email)</label>
              <Input
                type="text"
                placeholder=" gmail.com"
                value={email}
                onValueChange={setEmail}
                required
                startContent={<Mail size={18} className="text-gray-400" />}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">পাসওয়ার্ড (Password)</label>
              <Input
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onValueChange={setPassword}
                required
                startContent={<Lock size={18} className="text-gray-400" />}
                endContent={
                  <button type="button" onClick={toggleVisibility} className="focus:outline-none text-gray-400 hover:text-gray-600">
                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-[#0E281D] text-white font-bold py-6 rounded-2xl shadow-xl hover:bg-[#0E281D]/90 transition-all text-sm tracking-wide mt-2"
            >
              এডমিন লগইন করুন
            </Button>
          </form>

        </CardBody>
      </Card>
    </div>
  );
}