"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Card, CardBody } from "@heroui/react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, ShoppingBag, CreditCard, Truck, ShieldCheck, Tag, Trash2, RotateCcw } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, removeFromCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // পুরো পেজ ও কার্ট এক ক্লিকে রিসেট করার ফাংশন
  const handleFullReset = () => {
    clearCart();
    setName("");
    setPhone("");
    setAddress("");
    setTransactionId("");
    setPaymentMethod("cod");
  };

  // মোট হিজাবের সংখ্যা হিসাব
  const totalQuantity = useMemo(() => {
    return cart.reduce((total, item) => total + (Number(item.quantity) || 1), 0);
  }, [cart]);

  // ডেলিভারি ফি লজিক (৩টি বা তার বেশি হলে ফ্রি / ০ টাকা, কম হলে ১২০ টাকা)
  const deliveryCharge = useMemo(() => {
    if (cart.length === 0) return 0;
    return totalQuantity >= 3 ? 0 : 120;
  }, [cart, totalQuantity]);

  // মোট সাবটোটাল হিসাব
  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = Number(item.discountPrice) || Number(item.regularPrice) || 600;
      const qty = Number(item.quantity) || 1;
      return total + price * qty;
    }, 0);
  }, [cart]);

  const finalTotal = cartSubtotal + deliveryCharge;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("আপনার কার্ট খালি! দয়া করে হিজাব সিলেক্ট করুন।");
      return;
    }

    if (!name || !phone || !address) {
      alert("দয়া করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা দিন!");
      return;
    }

    if (paymentMethod !== "cod" && !transactionId) {
      alert("দয়া করে পেমেন্টের ট্রানজেকশন আইডি (TrxID) দিন!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          phone,
          address,
          items: cart,
          subtotal: cartSubtotal,
          deliveryCharge,
          totalAmount: finalTotal,
          paymentMethod,
          transactionId: paymentMethod !== "cod" ? transactionId : "N/A",
        }),
      });

      if (res.ok) {
        handleFullReset();
        setOrderSuccess(true);
      } else {
        alert("অর্ডার সম্পন্ন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error(err);
      alert("নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 text-center space-y-4 shadow-xl border border-gray-100 rounded-3xl">
          <CardBody className="space-y-4">
            <CheckCircle2 size={64} className="text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-serif font-bold text-[#0E281D]">আপনার অর্ডারটি সফল হয়েছে!</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              ধন্যবাদ! আমাদের প্রতিনিধি খুব শীঘ্রই আপনাকে কল করে অর্ডারটি কনফার্ম করবেন।
            </p>
            <Button className="bg-[#0E281D] text-white w-full py-6 rounded-xl font-bold" onClick={() => router.push("/")}>
              হোমপেজে ফিরে যান
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-gray-800">
      
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-3xl font-serif font-bold text-[#0E281D]">চেকআউট ও অর্ডার কনফার্মেশন</h1>
        <p className="text-xs text-gray-500">আপনার সঠিক তথ্য প্রদান করে অর্ডারটি সম্পন্ন করুন</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Details */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-[#0E281D] border-b pb-2 uppercase tracking-wider flex items-center gap-2">
              <Truck size={18} className="text-[#C28E79]" /> ১. ডেলিভারি তথ্য
            </h3>
            
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">আপনার নাম *</label>
                <Input placeholder="আপনার নাম লিখুন" required value={name} onValueChange={setName} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">মোবাইল নম্বর *</label>
                <Input placeholder="017XXXXXXXX" required type="tel" value={phone} onValueChange={setPhone} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">সম্পূর্ণ ঠিকানা *</label>
                <Input placeholder="বাসা/রোড নম্বর, এলাকা, জেলা" required value={address} onValueChange={setAddress} />
              </div>
            </form>
          </div>

          {/* Payment Selection */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="font-bold text-sm text-[#0E281D] border-b pb-2 uppercase tracking-wider flex items-center gap-2">
              <CreditCard size={18} className="text-[#C28E79]" /> ২. পেমেন্ট মেথড
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "cod", label: "ক্যাশ অন ডেলিভারি", sub: "পণ্য হাতে পেয়ে টাকা দিন" },
                { id: "bkash", label: "বিকাশ (bKash)", sub: "Send Money" },
                { id: "nagad", label: "নগদ (Nagad)", sub: "Send Money" },
                { id: "rocket", label: "রকেট (Rocket)", sub: "Send Money" },
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    paymentMethod === method.id
                      ? "border-[#0E281D] bg-[#0E281D]/5 shadow-sm ring-1 ring-[#0E281D]"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <p className="text-xs font-bold text-[#0E281D]">{method.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{method.sub}</p>
                </button>
              ))}
            </div>

            {paymentMethod !== "cod" && (
              <div className="bg-[#F7F4EE] p-4 rounded-2xl border border-[#0E281D]/10 space-y-3 pt-3">
                <p className="text-xs text-gray-700">
                  আমাদের <strong className="text-[#0E281D] font-bold">01700-000000</strong> নম্বরে Send Money করে TrxID দিন:
                </p>
                <Input placeholder="Transaction ID (যেমন: 9J87X7YY)" required value={transactionId} onValueChange={setTransactionId} />
              </div>
            )}
          </div>

          <Button
            form="checkout-form"
            type="submit"
            isLoading={loading}
            isDisabled={cart.length === 0}
            className="w-full bg-[#0E281D] text-white font-bold py-6 rounded-2xl shadow-lg hover:bg-[#0E281D]/90 transition-all text-sm tracking-wide mt-4"
          >
            অর্ডার নিশ্চিত করুন (৳{finalTotal})
          </Button>
        </div>

        {/* Order Pricing Breakdown Sidebar */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
          
          {/* Header with Always Visible Reset Button */}
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-bold text-sm text-[#0E281D] uppercase tracking-wider flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#C28E79]" /> অর্ডারের বিবরণ
            </h3>
            
            <button
              type="button"
              onClick={handleFullReset}
              className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1.5 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 hover:bg-rose-100 transition-all"
              title="পেজ ও কার্ট রিসেট করুন"
            >
              <RotateCcw size={13} /> পেজ রিসেট
            </button>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <p className="text-xs text-gray-500">আপনার কার্ট বর্তমানে খালি আছে!</p>
                <Button size="sm" variant="flat" className="text-xs font-semibold text-[#0E281D]" onClick={() => router.push("/")}>
                  হিজাব সিলেক্ট করতে হোমপেজে যান
                </Button>
              </div>
            ) : (
              cart.map((item, index) => {
                const itemPrice = Number(item.discountPrice) || Number(item.regularPrice) || 600;
                const itemQty = Number(item.quantity) || 1;
                return (
                  <div key={index} className="flex justify-between items-center text-xs border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        <img src={item.image || "/1.jpg"} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-gray-500 text-[11px]">পরিমাণ: {itemQty} টি</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#0E281D] text-sm">৳{itemPrice * itemQty}</span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item._id)}
                        className="text-gray-400 hover:text-rose-600 transition-colors"
                        title="রিমুভ করুন"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Automatic Offer Notice */}
          {cart.length > 0 && totalQuantity < 3 && (
            <div className="bg-[#C28E79]/10 p-3 rounded-xl border border-[#C28E79]/20 flex items-center gap-2 text-[11px] text-[#0E281D]">
              <Tag size={16} className="text-[#C28E79] shrink-0" />
              <span>আরেকটি হিজাব যোগ করলেই পাচ্ছেন <strong>ফ্রি ডেলিভারি!</strong></span>
            </div>
          )}

          {/* Calculation */}
          <div className="space-y-2 pt-3 text-xs border-t border-gray-200">
            <div className="flex justify-between text-gray-600">
              <span>মোট হিজাবের দাম:</span>
              <span className="font-bold text-gray-800">৳{cartSubtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600 items-center">
              <span>ডেলিভারি চার্জ:</span>
              {deliveryCharge === 0 && cart.length > 0 ? (
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">ফ্রি (Free Delivery)</span>
              ) : (
                <span className="font-bold text-gray-800">৳{deliveryCharge}</span>
              )}
            </div>
            
            <div className="flex justify-between items-center text-sm font-bold text-[#0E281D] pt-3 border-t border-gray-200">
              <span>সর্বমোট প্রদান করতে হবে:</span>
              <span className="text-lg font-extrabold text-emerald-700">৳{finalTotal}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}