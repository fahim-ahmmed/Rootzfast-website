"use client";

import { Card, CardBody, CardFooter, Image, Button, Chip } from "@heroui/react";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const discount = Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100);

  return (
    <Card shadow="sm" className="bg-white border border-beige hover:shadow-md transition-shadow rounded-xl">
      <CardBody className="overflow-visible p-0 relative">
        {discount > 0 && (
          <Chip color="danger" size="sm" className="absolute top-2 left-2 z-10 font-semibold">
            -{discount}%
          </Chip>
        )}
        <Button isIconOnly radius="full" size="sm" className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-md">
          <Heart size={16} className="text-charcoal" />
        </Button>
        <Link href={`/product/${product._id}`}>
          <Image
            shadow="none"
            radius="none"
            width="100%"
            alt={product.name}
            className="w-full object-cover h-[280px]"
            src={product.images[0] || "/placeholder.jpg"}
          />
        </Link>
      </CardBody>
      <CardFooter className="text-small justify-between flex-col items-start p-4 gap-2">
        <span className="text-xs text-rose font-medium tracking-wide uppercase">{product.category}</span>
        <h3 className="font-semibold text-charcoal text-base line-clamp-1">{product.name}</h3>
        <div className="flex justify-between items-center w-full mt-1">
          <div className="flex items-center gap-2">
            <span className="text-forest font-bold text-lg">৳{product.discountPrice || product.regularPrice}</span>
            {product.discountPrice && (
              <span className="text-gray-400 line-through text-xs">৳{product.regularPrice}</span>
            )}
          </div>
          <Button size="sm" className="bg-forest text-white min-w-0 px-3 flex gap-1">
            <ShoppingBag size={14} /> Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}