"use client";

import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { Facebook, Instagram, Send, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-forest text-cream border-t border-forest/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="font-serif text-3xl font-bold tracking-wider text-cream">
            ROOTZ
          </Link>
          <p className="text-xs font-medium uppercase tracking-widest text-rose">
            Modest Fashion | Timeless You
          </p>
          <p className="text-sm text-cream/80 max-w-sm leading-relaxed">
            Elevating everyday modesty with timeless designs, premium breathable fabrics, and uncompromising quality for the modern Muslimah.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-cream/10 rounded-full hover:bg-cream/20 transition-all text-cream">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-cream/10 rounded-full hover:bg-cream/20 transition-all text-cream">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-semibold text-cream text-base border-b border-cream/20 pb-2">Shop Navigation</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link href="/shop" className="hover:text-rose transition-colors">All Hijabs</Link></li>
            <li><Link href="/shop?category=everyday-hijab" className="hover:text-rose transition-colors">Everyday Collection</Link></li>
            <li><Link href="/shop?category=salat-hijab" className="hover:text-rose transition-colors">Salat Hijab</Link></li>
            <li><Link href="/shop?category=premium-silk" className="hover:text-rose transition-colors">Premium Silk Series</Link></li>
            <li><Link href="/shop?category=new" className="hover:text-rose transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-3">
          <h4 className="font-semibold text-cream text-base border-b border-cream/20 pb-2">Customer Service</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link href="/account" className="hover:text-rose transition-colors">My Account</Link></li>
            <li><Link href="/cart" className="hover:text-rose transition-colors">Shopping Cart</Link></li>
            <li><Link href="/checkout" className="hover:text-rose transition-colors">Order Tracking</Link></li>
            <li><a href="#" className="hover:text-rose transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-rose transition-colors">Returns & Exchange</a></li>
          </ul>
        </div>

        {/* Newsletter & Contact */}
        <div className="space-y-3">
          <h4 className="font-semibold text-cream text-base border-b border-cream/20 pb-2">Stay Connected</h4>
          <p className="text-xs text-cream/80">Subscribe to receive updates, access to exclusive deals, and more.</p>
          
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              size="sm"
              variant="flat"
              className="bg-cream/10 text-cream placeholder:text-cream/50 rounded-lg"
            />
            <Button size="sm" className="w-full bg-rose text-charcoal font-bold" endContent={<Send size={14} />}>
              Subscribe
            </Button>
          </form>

          <div className="pt-2 space-y-1 text-xs text-cream/70">
            <p className="flex items-center gap-2"><Phone size={12} /> +880 1700-000000</p>
            <p className="flex items-center gap-2"><Mail size={12} /> support@rootzfashion.com</p>
            <p className="flex items-center gap-2"><MapPin size={12} /> Dhaka, Bangladesh</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-cream/10 text-center text-xs text-cream/60 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© 2026 ROOTZ. All rights reserved.</p>
        <p className="flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </p>
      </div>
    </footer>
  );
}