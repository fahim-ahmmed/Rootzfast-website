"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button, Card, CardBody, Divider } from "@heroui/react";
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, clearCart } = useCart();

  const deliveryCharge = cart.length > 0 ? 60 : 0;
  const total = cartSubtotal + deliveryCharge;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-cream min-h-screen">
      <h1 className="text-3xl font-serif font-bold text-forest mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-beige space-y-4">
          <ShoppingBag size={48} className="mx-auto text-gray-300" />
          <h2 className="text-xl font-semibold text-charcoal">Your cart is empty</h2>
          <p className="text-gray-500 text-sm">Explore our products and add your favorite hijabs.</p>
          <Link href="/shop">
            <Button className="bg-forest text-white font-semibold mt-2">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center pb-2">
              <span className="text-sm font-semibold text-charcoal">{cart.length} Item(s) in Cart</span>
              <Button size="sm" variant="light" color="danger" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>

            {cart.map((item, index) => {
              const price = item.product.discountPrice || item.product.regularPrice;
              return (
                <Card key={index} className="bg-white border border-beige shadow-sm">
                  <CardBody className="flex flex-row items-center gap-4 p-4">
                    <img
                      src={item.product.images?.[0] || "/placeholder.jpg"}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl border border-beige"
                    />

                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-charcoal text-base line-clamp-1">{item.product.name}</h3>
                      <div className="text-xs text-gray-500 space-x-2">
                        {item.color && <span>Color: <strong>{item.color}</strong></span>}
                        {item.size && <span>Size: <strong>{item.size}</strong></span>}
                      </div>
                      <p className="text-forest font-bold text-sm">৳{price}</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-beige rounded-lg bg-cream">
                      <button
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className="px-2 py-1 text-charcoal font-bold hover:bg-beige/50"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="px-2 py-1 text-charcoal font-bold hover:bg-beige/50"
                      >
                        +
                      </button>
                    </div>

                    {/* Total & Remove */}
                    <div className="text-right space-y-2">
                      <p className="font-bold text-charcoal text-base">৳{price * item.quantity}</p>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onClick={() => removeFromCart(index)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })}

            <div className="pt-4">
              <Link href="/shop" className="text-forest text-sm font-semibold flex items-center gap-2 hover:underline">
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div>
            <Card className="p-4 bg-white border border-beige shadow-sm sticky top-6">
              <CardBody className="gap-4">
                <h2 className="text-lg font-semibold text-charcoal">Order Summary</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>৳{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Shipping</span>
                    <span>৳{deliveryCharge}</span>
                  </div>
                  <Divider className="my-2" />
                  <div className="flex justify-between text-base font-bold text-charcoal">
                    <span>Total</span>
                    <span className="text-forest">৳{total}</span>
                  </div>
                </div>

                <Link href="/checkout" className="w-full">
                  <Button
                    size="lg"
                    className="w-full bg-forest text-white font-semibold mt-4"
                    endContent={<ArrowRight size={18} />}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </div>

        </div>
      )}
    </div>
  );
}