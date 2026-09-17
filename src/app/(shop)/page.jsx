"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { 
  Truck, 
  ShieldCheck, 
  Feather, 
  RefreshCw, 
  ArrowRight, 
  ArrowUpRight, 
  Star 
} from "lucide-react";

export default function HomePage() {
  const initialProducts = [
    { _id: "1", name: "Everyday Hijab", image: "/1.jpg", regularPrice: 800, discountPrice: 600 },
    { _id: "2", name: "Salat Hijab", image: "/2.jpg", regularPrice: 800, discountPrice: 600 },
    { _id: "3", name: "Long Hijab", image: "/3.jpg", regularPrice: 800, discountPrice: 600 },
    { _id: "4", name: "Regular Hijab", image: "/4.jpg", regularPrice: 800, discountPrice: 600 },
    { _id: "5", name: "Premium Salat Hijab", image: "/5.jpg", regularPrice: 800, discountPrice: 600 },
  ];

  const [allProducts, setAllProducts] = useState(initialProducts);

  // LocalStorage থেকে এডমিনের আপলোড করা নতুন হিজাবগুলো লোড করা
  useEffect(() => {
    try {
      const customProducts = JSON.parse(localStorage.getItem("rootz_custom_products") || "[]");
      if (customProducts.length > 0) {
        setAllProducts([...customProducts, ...initialProducts]);
      }
    } catch (err) {
      console.error("Error loading uploaded products:", err);
    }
  }, []);

  const categories = [
    { 
      title: "Everyday Hijabs", 
      slug: "everyday-hijab", 
      img: "/everyday.jpg",
      description: "দৈনন্দিন ব্যবহারের জন্য হালকা ও সফট সুতি ফেব্রিক।"
    },
    { 
      title: "Salat Collection", 
      slug: "salat-hijab", 
      img: "/salathijab.jpg",
      description: "নামাজের সময় পূর্ণ কভারেজের জন্য বিশেষ লং সালাত হিজাব।"
    },
    { 
      title: "Luxury Hijabs", 
      slug: "premium-silk", 
      img: "/3.jpg",
      description: "বিশেষ অনুষ্ঠান ও স্টাইলিশ লুকের জন্য প্রিমিয়াম সাটিন ও সিল্ক।"
    },
  ];

  return (
    <div className="bg-[#FBF9F5] min-h-screen text-[#1E1E1E]">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-[#0E281D]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0E281D]/15 bg-[#0E281D]/5 text-[#0E281D] text-xs font-semibold tracking-widest uppercase">
              • ESSENTIAL MODESTY 2026
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium text-[#0E281D] leading-[1.1] tracking-tight">
              আভিজাত্য ও পর্দা <br />
              <span className="italic font-normal text-[#C28E79]">একসাথে আপনার জন্য।</span>
            </h1>

            <p className="text-base sm:text-lg text-[#1E1E1E]/75 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              ROOTZ-এর ১০০% অরিজিনাল, নন-স্লিপিং অর্গানিক কাপড়ের হিজাব কালেকশন। নামাজের কভারেজ থেকে দৈনন্দিন পর্দার জন্য সর্বোচ্চ আরামদায়ক ফেব্রিক।
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="#products-section" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-[#0E281D] text-[#FAF8F5] font-medium px-8 py-6 rounded-full shadow-lg hover:bg-[#0E281D]/90 transition-all text-sm tracking-wide">
                  হিজাব কালেকশন দেখুন
                </Button>
              </Link>
              <Link href="/shop?category=salat-hijab" className="w-full sm:w-auto">
                <Button size="lg" variant="bordered" className="w-full sm:w-auto border border-[#0E281D] text-[#0E281D] font-medium px-8 py-6 rounded-full hover:bg-[#0E281D] hover:text-[#FAF8F5] transition-all text-sm tracking-wide">
                  সালাত হিজাব
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/80">
              <img
                src="/hero-hijab.jpg"
                alt="ROOTZ Premium Salat Hijab"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E281D]/40 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-[#C28E79] uppercase tracking-wider">স্পেশাল সালাত হিজাব</p>
                  <p className="text-xs font-semibold text-[#0E281D]">ফ্লোরাল পারপল সালাত সেট</p>
                </div>
                <span className="text-xs font-bold text-[#0E281D] bg-[#F7F4EE] px-3 py-1 rounded-full border border-[#0E281D]/10">
                  ১০০% সুতি
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CURATED CATEGORIES */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold text-[#C28E79] uppercase tracking-[0.2em]">COLLECTIONS</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0E281D] mt-1">ক্যাটাগরি সমূহ</h2>
          </div>
          <Link href="/shop" className="text-xs font-semibold tracking-wider uppercase text-[#0E281D] hover:text-[#C28E79] transition-colors flex items-center gap-1.5 border-b border-[#0E281D]/20 pb-0.5">
            সব হিজাব দেখুন <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`}>
              <div className="group relative h-[420px] rounded-[2rem] overflow-hidden bg-white border border-[#0E281D]/10 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer">
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E281D]/90 via-[#0E281D]/30 to-transparent flex flex-col justify-end p-8">
                  <span className="text-[10px] font-bold text-[#C28E79] uppercase tracking-widest mb-1">
                    ROOTZ ESSENTIALS
                  </span>
                  <h3 className="text-[#FAF8F5] text-2xl font-serif font-medium tracking-wide">{cat.title}</h3>
                  <p className="text-xs text-[#FAF8F5]/75 font-light mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#FAF8F5] group-hover:text-[#C28E79] transition-colors">
                    <span>প্রোডাক্ট দেখুন</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS DISPLAY (সব নতুন ও পুরানো প্রোডাক্ট অটো দেখাবে) */}
      <section id="products-section" className="py-16 bg-white border-t border-[#0E281D]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-lg mx-auto space-y-2">
            <span className="text-xs font-semibold text-[#C28E79] uppercase tracking-widest">BEST SELLERS</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0E281D]">আমাদের জনপ্রিয় হিজাব সমূহ</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
            {allProducts.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`} className="group block space-y-3 bg-[#FBF9F5] p-3 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-full aspect-[3/4] bg-white overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="space-y-1 text-left px-1">
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#0E281D] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#0E281D] font-bold">TK {product.discountPrice}.00</span>
                    <span className="text-gray-400 line-through">TK {product.regularPrice}.00</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="py-20 bg-[#F3EEE6] border-t border-[#0E281D]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12 text-center">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#C28E79] uppercase tracking-widest">গ্রাহক মতামত</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0E281D]">আমাদের সম্মানিত গ্রাহকদের অভিজ্ঞতা</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { name: "সাদিয়া খাতুন", city: "ঢাকা", text: "সালাত হিজাবের কাপড় অত্যন্ত সফট ও বড়। নামাজের সময় চুল পড়ে যাওয়ার কোনো ভয় থাকে না। মাশাল্লাহ কোয়ালিটি খুব ভালো!" },
              { name: "জান্নাতুল আক্তার ইমা", city: "চট্টগ্রাম", text: "ডেলিভারি খুব দ্রুত পেয়েছি। কাপড়ের কালার একদম ছবির মতোই সুন্দর আর সারাদিন পরলেও গরম লাগে না।" },
              { name: "মুক্তি খাতুন", city: "সিলেট", text: "প্যাকিং খুব প্রিমিয়াম ছিল। হিজাবগুলো একদম পিছলে যায় না, পিন ছাড়াই সুন্দর সেটিং হয়ে থাকে। highly recommended!" },
            ].map((rev, i) => (
              <div key={i} className="bg-white p-8 rounded-[1.5rem] border border-[#0E281D]/10 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex text-[#C28E79] gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[#1E1E1E]/80 text-xs sm:text-sm font-light leading-relaxed italic">"{rev.text}"</p>
                <div className="border-t border-[#0E281D]/10 pt-3 flex justify-between items-center text-xs">
                  <span className="font-bold text-[#0E281D]">— {rev.name}</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-semibold">Verified Buyer</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRO VALUE PROPOSITION BAR */}
      <section className="py-16 bg-[#F3EEE6] border-y border-[#0E281D]/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-lg mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold text-[#C28E79] uppercase tracking-widest">কেন ROOTZ বেছে নেবেন?</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0E281D]">আমাদের সেরা সেবাসমূহ</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white p-8 rounded-3xl border border-[#0E281D]/10 hover:border-[#C28E79] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0E281D] text-[#FAF8F5] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#C28E79] transition-all duration-300">
                <Truck size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-[#0E281D] text-lg">ক্যাশ অন ডেলিভারি</h4>
                <p className="text-xs text-[#1E1E1E]/70 leading-relaxed">
                  সারা বাংলাদেশে মাত্র ২-৪ কার্যদিবসের মধ্যে আপনার হাতে পণ্য পৌঁছে যাবে।
                </p>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-3xl border border-[#0E281D]/10 hover:border-[#C28E79] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0E281D] text-[#FAF8F5] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#C28E79] transition-all duration-300">
                <ShieldCheck size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-[#0E281D] text-lg">১০০% প্রিমিয়াম ফেব্রিক</h4>
                <p className="text-xs text-[#1E1E1E]/70 leading-relaxed">
                  সফট সুতি ও নন-স্লিপিং কাপড়ের নিশ্চয়তা যা পরিধানে অত্যন্ত আরামদায়ক।
                </p>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-3xl border border-[#0E281D]/10 hover:border-[#C28E79] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0E281D] text-[#FAF8F5] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#C28E79] transition-all duration-300">
                <Feather size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-[#0E281D] text-lg">অত্যন্ত হালকা অনুভূতি</h4>
                <p className="text-xs text-[#1E1E1E]/70 leading-relaxed">
                  দীর্ঘসময় ব্যবহারে কোনো মাথাব্যথা বা পিনের ঝামেলা ছাড়াই সহজে ফিট থাকবে।
                </p>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-3xl border border-[#0E281D]/10 hover:border-[#C28E79] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0E281D] text-[#FAF8F5] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#C28E79] transition-all duration-300">
                <RefreshCw size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-[#0E281D] text-lg">৭ দিনের এক্সচেঞ্জ</h4>
                <p className="text-xs text-[#1E1E1E]/70 leading-relaxed">
                  পছন্দ অনুযায়ী সাইজ বা কালার পরিবর্তনের জন্য ৭ দিনের সহজ এক্সচেঞ্জ সুবিধা।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIJAB CARE & STYLING TIPS */}
      {/* HIJAB CARE & STYLING TIPS (CLEAN MINIMAL CARD DESIGN - NO IMAGES) */}
      <section className="py-20 bg-[#FAF8F5] border-t border-[#0E281D]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#C28E79] uppercase tracking-[0.2em] bg-[#0E281D]/5 px-4 py-1.5 rounded-full border border-[#0E281D]/10">
              ফ্যাব্রিক কেয়ার গাইড
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#0E281D] leading-tight">
              দীর্ঘদিন হিজাব নতুন রাখার নিয়ম
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              আপনার প্রিয় ROOTZ হিজাবের সফটনেস, আসল উজ্জ্বলতা এবং স্থায়িত্ব বছরের পর বছর বজায় রাখার সহজ উপায়।
            </p>
          </div>

          {/* Clean Text Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 space-y-4 shadow-sm hover:shadow-xl hover:border-[#C28E79]/40 hover:-translate-y-1 transition-all duration-300 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#0E281D]/5 text-[#0E281D] font-serif font-bold text-lg flex items-center justify-center border border-[#0E281D]/10">
                01
              </div>
              <h4 className="font-serif font-bold text-[#0E281D] text-xl">হালকা সাবানে ধোয়া</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                অর্গানিক বা সুতি হিজাব দীর্ঘদিন কালার উজ্জ্বল রাখতে শ্যাম্পু বা ওয়াশিং লিকুইড দিয়ে ওয়াশ করুন।
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 space-y-4 shadow-sm hover:shadow-xl hover:border-[#C28E79]/40 hover:-translate-y-1 transition-all duration-300 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#0E281D]/5 text-[#0E281D] font-serif font-bold text-lg flex items-center justify-center border border-[#0E281D]/10">
                02
              </div>
              <h4 className="font-serif font-bold text-[#0E281D] text-xl">ছায়ায় শুকানো</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                সরাসরি কড়া রোদে না দিয়ে হালকা ছায়াযুক্ত স্থানে শুকাতে দিন। এতে কাপড়ের কালার নতুনের মতো উজ্জ্বল থাকবে।
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 space-y-4 shadow-sm hover:shadow-xl hover:border-[#C28E79]/40 hover:-translate-y-1 transition-all duration-300 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#0E281D]/5 text-[#0E281D] font-serif font-bold text-lg flex items-center justify-center border border-[#0E281D]/10">
                03
              </div>
              <h4 className="font-serif font-bold text-[#0E281D] text-xl">হালকা আয়রন</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                ব্যবহারের পূর্বে হালকা হিটে ইস্ত্রি করে নিলে হিজাবের ফ্লো এবং ফিটিং অনেক বেশি আকর্ষনীয় দেখায়।
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}