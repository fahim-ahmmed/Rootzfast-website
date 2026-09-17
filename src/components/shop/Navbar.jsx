"use client";

import Link from "next/link";
import { Navbar as NextNavbar, NavbarBrand, NavbarContent, NavbarItem, Button, Badge, useDisclosure } from "@heroui/react";
import { ShoppingBag, Heart, User, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const { cartCount } = useCart();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <NextNavbar maxWidth="xl" className="bg-cream border-b border-beige sticky top-0 z-40">
        <NavbarBrand>
          <Link href="/" className="font-serif text-2xl font-bold tracking-wider text-forest">
            ROOTZ
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          <NavbarItem>
            <Link href="/" className="text-charcoal hover:text-forest text-sm font-medium">Home</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/shop" className="text-charcoal hover:text-forest text-sm font-medium">Shop</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/shop?category=salat-hijab" className="text-charcoal hover:text-forest text-sm font-medium">Salat Hijab</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/shop?category=new" className="text-charcoal hover:text-forest text-sm font-medium">New Arrivals</Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="gap-3">
          <Button isIconOnly variant="light" className="text-charcoal" onClick={onOpen}>
            <Search size={20} />
          </Button>
          <Link href="/account">
            <Button isIconOnly variant="light" className="text-charcoal">
              <User size={20} />
            </Button>
          </Link>
          <Badge content={cartCount} color="danger" shape="circle" size="sm" isInvisible={cartCount === 0}>
            <Link href="/cart">
              <Button isIconOnly variant="light" className="text-charcoal">
                <ShoppingBag size={20} />
              </Button>
            </Link>
          </Badge>
        </NavbarContent>
      </NextNavbar>

      {/* Instant Search Drawer */}
      <SearchModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
    </>
  );
}