"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button, Card, CardBody, Chip } from "@heroui/react";
import { Trash2, ShoppingBag, Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-cream min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-forest">My Wishlist</h1>
        <p className="text-charcoal/70 text-sm">Saved items you love and want to shop later.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-beige space-y-4">
          <Heart size={48} className="mx-auto text-gray-300" />
          <h2 className="text-xl font-semibold text-charcoal">Your wishlist is empty</h2>
          <p className="text-gray-500 text-sm">Browse our store and click the heart icon to save items.</p>
          <Link href="/shop">
            <Button className="bg-forest text-white font-semibold mt-2">
              Explore Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => {
            const price = product.discountPrice || product.regularPrice;
            return (
              <Card key={product._id} className="bg-white border border-beige shadow-sm">
                <CardBody className="p-4 space-y-3">
                  <div className="relative h-60 w-full rounded-xl overflow-hidden bg-cream">
                    <img
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      variant="solid"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => toggleWishlist(product)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-rose uppercase tracking-wider">{product.category}</span>
                    <h3 className="font-semibold text-charcoal text-base line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-forest font-bold">৳{price}</span>
                      {product.discountPrice && (
                        <span className="text-xs text-gray-400 line-through">৳{product.regularPrice}</span>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-forest text-white font-semibold"
                    size="sm"
                    startContent={<ShoppingBag size={16} />}
                    onClick={() => {
                      addToCart(product, 1);
                      toggleWishlist(product);
                    }}
                  >
                    Move To Cart
                  </Button>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}