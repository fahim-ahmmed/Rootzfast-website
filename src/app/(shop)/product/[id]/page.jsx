"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { ArrowLeft, ShoppingBag, Truck, PhoneCall, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const initialProducts = [
    { _id: "1", name: "Everyday Hijab", image: "/1.jpg", regularPrice: 800, discountPrice: 600 },
    { _id: "2", name: "Salat Hijab", image: "/2.jpg", regularPrice: 800, discountPrice: 600 },
    { _id: "3", name: "Long Hijab", image: "/3.jpg", regularPrice: 800, discountPrice: 600 },
    { _id: "4", name: "Regular Hijab", image: "/4.jpg", regularPrice: 800, discountPrice: 600 },
    { _id: "5", name: "Premium Salat Hijab", image: "/5.jpg", regularPrice: 800, discountPrice: 600 },
  ];

  const [productList, setProductList] = useState(initialProducts);

  useEffect(() => {
    try {
      const customProducts = JSON.parse(localStorage.getItem("rootz_custom_products") || "[]");
      if (customProducts.length > 0) {
        setProductList([...customProducts, ...initialProducts]);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const product = productList.find((p) => String(p._id) === String(resolvedParams.id)) || productList[0];

  const handleBuyNow = () => {
    addToCart(product, Number(quantity));
    router.push(`/checkout`);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 px-4 sm:px-8 max-w-6xl mx-auto text-gray-800">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6 hover:text-black transition-colors">
        <ArrowLeft size={16} /> পেছনে যান
      </button>

      {/* Main Product Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-sm">
        
        {/* Left Side Image */}
        <div className="aspect-[3/4] bg-[#f5f5f5] rounded-2xl overflow-hidden border border-gray-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Right Side Content */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-serif font-bold text-[#0E281D]">{product.name}</h1>
            
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#0E281D]">TK {product.discountPrice}.00</span>
              <span className="text-base text-gray-400 line-through">TK {product.regularPrice}.00</span>
            </div>

            {/* Description & Specification */}
            <div className="text-xs text-gray-700 leading-relaxed pt-3 border-t border-gray-100 space-y-4">
              <p className="text-sm font-medium text-gray-800">
                {product.description || "নামাজ ও দৈনন্দিন ব্যবহারের জন্য তৈরি আমাদের Premium Long Salat Hijab—যেখানে আরাম, পরিপূর্ণ কভারেজ ও সুন্দর ফিটিংকে দেওয়া হয়েছে বিশেষ গুরুত্ব।"}
              </p>

              {/* Specs Box */}
              <div className="bg-[#F7F4EE] p-4 rounded-xl border border-[#0E281D]/10 space-y-2">
                <h4 className="font-bold text-[#0E281D] text-xs uppercase tracking-wider">Product Details:</h4>
                <ul className="grid grid-cols-2 gap-2 text-xs text-gray-700 pt-1">
                  <li>• <strong>সামনে:</strong> ৫০ ইঞ্চি</li>
                  <li>• <strong>পিছনে:</strong> ৫৮ ইঞ্চি</li>
                  <li>• <strong>নেকাব:</strong> ২৮ ইঞ্চি</li>
                  <li>• <strong>ঘের:</strong> ১৫০ ইঞ্চি</li>
                </ul>
                <ul className="space-y-1 text-xs text-gray-700 pt-2 border-t border-gray-200/60">
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#C28E79]" /> Premium & comfortable fabric</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#C28E79]" /> পরতে সহজ, পিনের ঝামেলা কম</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#C28E79]" /> নামাজের সময় পূর্ণ কভারেজের জন্য উপযোগী</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#C28E79]" /> সুন্দর ফ্লো ও এলিগেন্ট লুক</li>
                </ul>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-semibold text-gray-700">পরিমাণ:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setQuantity((prev) => Math.max(1, Number(prev) - 1))} 
                  className="px-3 py-1 bg-gray-100 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm font-semibold">{quantity}</span>
                <button 
                  onClick={() => setQuantity((prev) => Number(prev) + 1)} 
                  className="px-3 py-1 bg-gray-100 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <Button
              size="lg"
              className="w-full bg-[#0E281D] text-white font-bold py-6 rounded-xl shadow-md text-sm"
              onClick={handleBuyNow}
            >
              Buy Now (এখনই অর্ডার করুন)
            </Button>
            
            <Button
              size="lg"
              variant="bordered"
              className="w-full border-[#0E281D] text-[#0E281D] font-semibold py-6 rounded-xl text-sm"
              onClick={() => addToCart(product, Number(quantity))}
            >
              <ShoppingBag size={18} /> Add to Cart
            </Button>

            <div className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200/60 pt-3">
              <span className="flex items-center gap-2"><Truck size={16} className="text-[#0E281D]" /> ৩টি কিনলে ফ্রি ডেলিভারি</span>
              <a href="tel:01612006490" className="flex items-center gap-1 font-bold text-[#0E281D] hover:underline">
                <PhoneCall size={14} /> 01612006490
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}