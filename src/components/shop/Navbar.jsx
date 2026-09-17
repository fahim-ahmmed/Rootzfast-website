"use client";

import Link from "next/link";
import { 
  Navbar as NextNavbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button, 
  Badge, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Avatar, 
  useDisclosure 
} from "@heroui/react";
import { ShoppingBag, Heart, User, Search, LogOut, ShieldAlert } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "@/lib/auth-client";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const { cartCount } = useCart();
  const { data: session, isPending } = useSession();
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

          {/* User Auth Profile Menu */}
          {session ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  name={session.user.name}
                  size="sm"
                  className="cursor-pointer bg-forest text-white"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold text-xs text-gray-500">Signed in as</p>
                  <p className="font-bold text-charcoal">{session.user.email}</p>
                </DropdownItem>
                <DropdownItem key="account" href="/account" startContent={<User size={16} />}>
                  My Profile
                </DropdownItem>

                {/* Show Admin Panel link if role is admin */}
                {session.user.role === "admin" && (
                  <DropdownItem key="admin" href="/admin/dashboard" className="text-forest font-semibold" startContent={<ShieldAlert size={16} />}>
                    Admin Panel
                  </DropdownItem>
                )}

                <DropdownItem 
                  key="logout" 
                  color="danger" 
                  startContent={<LogOut size={16} />} 
                  onClick={() => signOut()}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Link href="/login">
              <Button isIconOnly variant="light" className="text-charcoal">
                <User size={20} />
              </Button>
            </Link>
          )}

          <Badge content={cartCount} color="danger" shape="circle" size="sm" isInvisible={cartCount === 0}>
            <Link href="/cart">
              <Button isIconOnly variant="light" className="text-charcoal">
                <ShoppingBag size={20} />
              </Button>
            </Link>
          </Badge>
        </NavbarContent>
      </NextNavbar>

      <SearchModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
    </>
  );
}