"use client";

import { Button } from "@heroui/react";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.some((item) => item._id === product._id);

  const discount = product.discountPrice
    ? Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)
    : 0;

  return (
    <div className="group bg-[#FAF8F5] border border-[#0E281D]/10 rounded-[1.25rem] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F7F4EE]">
        {discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-[#C28E79] text-[#FAF8F5] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            -{discount}%
          </span>
        )}
        
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#FAF8F5]/80 backdrop-blur-md hover:scale-110 transition-transform text-[#1E1E1E]"
        >
          <Heart size={16} className={isWishlisted ? "fill-[#C28E79] text-[#C28E79]" : "text-[#1E1E1E]"} />
        </button>

        <Link href={`/product/${product._id}`} className="block h-full w-full">
          <img
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>

      <div className="p-4 space-y-2">
        <span className="text-[10px] font-semibold text-[#C28E79] uppercase tracking-widest">
          {product.category?.replace("-", " ")}
        </span>

        <Link href={`/product/${product._id}`}>
          <h3 className="font-serif font-medium text-[#0E281D] text-base line-clamp-1 group-hover:text-[#C28E79] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between pt-2 border-t border-[#0E281D]/10">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-[#0E281D] text-base">৳{product.discountPrice || product.regularPrice}</span>
            {product.discountPrice && (
              <span className="text-xs text-[#1E1E1E]/40 line-through">৳{product.regularPrice}</span>
            )}
          </div>

          <Button
            size="sm"
            className="bg-[#0E281D] text-[#FAF8F5] text-xs font-medium rounded-full px-3.5 flex gap-1.5 hover:bg-[#0E281D]/90 transition-all"
            onClick={() => addToCart(product, 1)}
          >
            <ShoppingBag size={13} /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}