"use client";

import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin, Send, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0E281D] text-[#FAF8F5] pt-16 pb-8 border-t border-[#C28E79]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.jpg" 
                alt="ROOTZ Logo" 
                className="w-12 h-12 object-cover rounded-full border border-[#C28E79]/40 shadow-md"
              />
              <div>
                <span className="font-serif text-3xl font-bold tracking-widest text-[#FAF8F5]">ROOTZ</span>
                <p className="text-[10px] font-semibold text-[#C28E79] uppercase tracking-[0.2em]">MODEST FASHION</p>
              </div>
            </div>

            <p className="text-xs text-[#FAF8F5]/75 leading-relaxed font-light pr-4">
              আধুনিক মুসলিম আপুদের  জন্য তৈরি প্রিমিয়াম, অত্যন্ত সফট এবং ১০০% আরামদায়ক অর্গানিক হিজাবের বিশ্বস্ত ব্র্যান্ড। সারাদিন পরিধানে সর্বোচ্চ পারফেকশন।
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.facebook.com/rootz2026" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C28E79] hover:text-[#0E281D] transition-all duration-300 shadow-sm"
                title="Follow us on Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C28E79] hover:text-[#0E281D] transition-all duration-300 shadow-sm"
                title="Follow us on Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C28E79]">ক্যাটাগরি সমূহ</h4>
            <ul className="space-y-2 text-xs text-[#FAF8F5]/80 font-medium">
              <li>
                <Link href="/" className="hover:text-[#C28E79] transition-colors">• হোমপেজ (Home)</Link>
              </li>
              <li>
                <Link href="/shop?category=everyday-hijab" className="hover:text-[#C28E79] transition-colors">• Everyday Hijab</Link>
              </li>
              <li>
                <Link href="/shop?category=salat-hijab" className="hover:text-[#C28E79] transition-colors">• Salat Collection</Link>
              </li>
              <li>
                <Link href="/shop?category=premium-silk" className="hover:text-[#C28E79] transition-colors">• Premium Silk Series</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C28E79]">গ্রাহক সেবা</h4>
            <ul className="space-y-2 text-xs text-[#FAF8F5]/80 font-medium">
              <li>
                <Link href="/checkout" className="hover:text-[#C28E79] transition-colors">• আপনার কার্ট</Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-[#C28E79] transition-colors">• অর্ডার চেকআউট</Link>
              </li>
              <li>
                <span className="text-white/60">• ক্যাশ অন ডেলিভারি</span>
              </li>
              <li>
                <span className="text-white/60">• ৭ দিনের সহজ এক্সচেঞ্জ</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C28E79]">যোগাযোগ করুন</h4>
            <div className="space-y-3 text-xs text-[#FAF8F5]/80">
              <a href="tel:01612006490" className="flex items-center gap-2.5 hover:text-[#C28E79] transition-colors">
                <Phone size={16} className="text-[#C28E79] shrink-0" />
                <span className="font-semibold">01612006490</span>
              </a>

              <a href="mailto:rootzoficialbd@gmail.com" className="flex items-center gap-2.5 hover:text-[#C28E79] transition-colors">
                <Mail size={16} className="text-[#C28E79] shrink-0" />
                <span>rootzoficialbd@gmail.com</span>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#C28E79] shrink-0 mt-0.5" />
                <span>ঢাকা, বাংলাদেশ</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#FAF8F5]/60 gap-4">
          <p>© 2026 ROOTZ. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">প্রাইভেসি পলিসি</span>
            <span className="hover:text-white cursor-pointer">টার্মস অ্যান্ড কন্ডিশন</span>
          </div>
        </div>

      </div>
    </footer>
  );
}