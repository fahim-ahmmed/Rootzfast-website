"use client";

import { useState } from "react";
import { Input, Button, RadioGroup, Radio, Card, CardBody, Divider } from "@heroui/react";
import { ShoppingBag, Truck, ShieldCheck, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Dhaka",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Temporary Mock Cart Data
  const cartItems = [
    {
      product: "65f1a2b3c4d5e6f7a8b9c0d1",
      name: "Silk Chiffon Premium Hijab",
      price: 850,
      quantity: 2,
      color: "Rose Dust",
      size: "Free Size"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = formData.city.toLowerCase() === "dhaka" ? 60 : 120;
  const total = subtotal + deliveryCharge;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderPayload = {
      customer: formData,
      items: cartItems,
      subtotal,
      deliveryCharge,
      total,
      paymentMethod
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Order Placed Successfully! Order ID: ${data.orderId}`);
        router.push("/");
      } else {
        alert(`Order Failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-cream min-h-screen">
      <h1 className="text-3xl font-serif font-bold text-forest mb-8">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer & Shipping Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-4 bg-white border border-beige shadow-sm">
            <CardBody className="gap-4">
              <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
                <Truck size={20} className="text-forest" /> Shipping Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <Input
                label="Email Address"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                label="Full Delivery Address"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
              <Input
                label="City / District"
                name="city"
                required
                value={formData.city}
                onChange={handleInputChange}
              />
            </CardBody>
          </Card>

          {/* Payment Method */}
          <Card className="p-4 bg-white border border-beige shadow-sm">
            <CardBody className="gap-4">
              <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
                <CreditCard size={20} className="text-forest" /> Payment Method
              </h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <Radio value="COD">Cash on Delivery (COD)</Radio>
                <Radio value="bKash">bKash Mobile Banking</Radio>
                <Radio value="Nagad">Nagad Mobile Banking</Radio>
              </RadioGroup>

              {(paymentMethod === "bKash" || paymentMethod === "Nagad") && (
                <div className="p-4 bg-beige/40 rounded-xl border border-beige text-xs text-charcoal mt-2">
                  <p className="font-semibold mb-1">Payment Instructions:</p>
                  <p>Please send ৳{total} to Merchant Account: <strong>01700000000</strong> ({paymentMethod}). Use your Order ID as reference.</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="p-4 bg-white border border-beige shadow-sm sticky top-6">
            <CardBody className="gap-4">
              <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
                <ShoppingBag size={20} className="text-forest" /> Order Summary
              </h2>

              <div className="space-y-3">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium text-charcoal">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} | {item.color}</p>
                    </div>
                    <span className="font-semibold text-forest">৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <Divider className="my-2" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge</span>
                  <span>৳{deliveryCharge}</span>
                </div>
                <Divider />
                <div className="flex justify-between text-base font-bold text-charcoal">
                  <span>Total</span>
                  <span className="text-forest">৳{total}</span>
                </div>
              </div>

              <Button
                type="submit"
                isLoading={loading}
                className="w-full bg-forest text-white font-semibold mt-4 py-6"
                size="lg"
              >
                Place Order
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-2">
                <ShieldCheck size={16} /> 100% Secure Checkout Guaranteed
              </div>
            </CardBody>
          </Card>
        </div>
      </form>
    </div>
  );
}