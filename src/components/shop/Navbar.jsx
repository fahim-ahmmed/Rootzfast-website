"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Navbar as NextNavbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button, 
  Badge, 
  useDisclosure 
} from "@heroui/react";
import { ShoppingBag, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCurrentCategory(params.get("category"));
  }, [pathname]);

  const { cartCount } = useCart();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Active Link Match Logic
  const isActive = (category) => {
    return pathname === "/shop" && currentCategory === category;
  };

  const navLinks = [
    { name: "Everyday Hijab", category: "everyday-hijab" },
    { name: "Salat Hijab", category: "salat-hijab" },
    { name: "Premium Silk", category: "premium-silk" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#0E281D] text-[#FAF8F5] text-xs py-2 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-[#C28E79]" />
        <span>🎉 যেকোনো ৩টি হিজাব অর্ডার করলেই সারা বাংলাদেশে ডেলিভারি একদম ফ্রি! 🎉</span>
      </div>

      {/* Main Professional Navbar */}
      <NextNavbar 
        maxWidth="xl" 
        className="bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#0E281D]/10 sticky top-0 z-40 py-1 transition-all"
      >
        {/* Brand Logo with logo.jpg */}
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="ROOTZ Logo" 
              className="w-10 h-10 object-cover rounded-full border border-[#0E281D]/20 shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-widest text-[#0E281D]">ROOTZ</span>
              <span className="text-[9px] font-sans font-bold text-[#C28E79] uppercase tracking-[0.2em] -mt-1">
                Modest Fashion
              </span>
            </div>
          </Link>
        </NavbarBrand>

        {/* Navigation Category Links */}
        <NavbarContent className="hidden lg:flex gap-8" justify="center">
          <NavbarItem className="relative py-2">
            <Link 
              href="/" 
              className={`text-base font-semibold tracking-wide transition-colors ${
                pathname === "/" ? "text-[#0E281D]" : "text-gray-600 hover:text-[#0E281D]"
              }`}
            >
              Home
            </Link>
            {pathname === "/" && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0E281D] rounded-full animate-in fade-in duration-300" />
            )}
          </NavbarItem>

          {navLinks.map((link, index) => {
            const active = isActive(link.category);
            return (
              <NavbarItem key={index} className="relative py-2">
                <Link 
                  href={`/shop?category=${link.category}`} 
                  className={`text-base font-semibold tracking-wide transition-colors ${
                    active ? "text-[#0E281D]" : "text-gray-600 hover:text-[#0E281D]"
                  }`}
                >
                  {link.name}
                </Link>

                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0E281D] rounded-full animate-in fade-in duration-300" />
                )}
              </NavbarItem>
            );
          })}
        </NavbarContent>

        {/* Actions & New Sleek Cart Icon */}
        <NavbarContent justify="end" className="gap-4">
          {/* Search Button */}
          <Button 
            isIconOnly 
            variant="light" 
            className="text-[#0E281D] hover:bg-[#0E281D]/5 rounded-full" 
            onClick={onOpen}
          >
            <Search size={22} />
          </Button>

          {/* New Modern Shopping Bag Icon */}
          <Link href="/checkout" className="relative flex items-center">
            <div className="p-2.5 rounded-full bg-[#0E281D] text-white hover:bg-[#0E281D]/90 transition-all shadow-md flex items-center justify-center">
              <ShoppingBag size={20} />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C28E79] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Admin Portal Button Only */}
          <Link href="/login">
            <Button size="sm" variant="flat" className="text-xs font-semibold text-gray-500 hover:text-[#0E281D] flex items-center gap-1">
              <ShieldCheck size={14} /> Admin
            </Button>
          </Link>
        </NavbarContent>
      </NextNavbar>

      <SearchModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
    </>
  );
}