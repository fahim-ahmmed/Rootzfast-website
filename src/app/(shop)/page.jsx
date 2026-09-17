"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardBody, Spinner, Chip } from "@heroui/react";
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, RefreshCw, Star, Heart } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomeProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setFeaturedProducts((data.products || []).slice(0, 8));
      } catch (err) {
        console.error("Failed to load home products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHomeProducts();
  }, []);

  const categories = [
    { title: "Everyday Hijab", slug: "everyday-hijab", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80" },
    { title: "Salat Hijab", slug: "salat-hijab", img: "https://images.unsplash.com/photo-1609178017105-50153d282390?auto=format&fit=crop&w=600&q=80" },
    { title: "Premium Silk", slug: "premium-silk", img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <div className="bg-cream min-h-screen space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative bg-beige/50 border-b border-beige overflow-hidden py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <Chip color="success" variant="flat" size="sm" className="font-semibold uppercase tracking-wider">
              New Season Arrival
            </Chip>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-forest leading-tight">
              More Than Just <br className="hidden sm:inline" /> A Hijab.
            </h1>
            <p className="text-charcoal/80 text-base sm:text-lg max-w-lg mx-auto lg:mx-0">
              Discover ROOTZ — where modesty meets modern elegance. Crafted with premium breathable fabrics for your daily grace.
            </p>
            <div className="flex justify-center lg:justify-start gap-4 pt-2">
              <Link href="/shop">
                <Button size="lg" className="bg-forest text-white font-semibold" endContent={<ArrowRight size={18} />}>
                  Shop Collection
                </Button>
              </Link>
              <Link href="/shop?category=salat-hijab">
                <Button size="lg" variant="bordered" className="border-forest text-forest font-semibold">
                  Salat Hijab
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-full max-w-md h-[450px] rounded-3xl overflow-hidden border-4 border-white shadow-xl relative">
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
                alt="ROOTZ Hijab Collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-beige shadow-sm">
          <div className="flex items-center gap-4 p-2">
            <div className="p-3 bg-cream rounded-xl text-forest"><Truck size={24} /></div>
            <div>
              <h4 className="font-semibold text-charcoal">Fast Express Delivery</h4>
              <p className="text-xs text-gray-500">All over Bangladesh within 2-4 days</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 border-t md:border-t-0 md:border-l border-beige">
            <div className="p-3 bg-cream rounded-xl text-forest"><ShieldCheck size={24} /></div>
            <div>
              <h4 className="font-semibold text-charcoal">100% Premium Fabric</h4>
              <p className="text-xs text-gray-500">Guaranteed quality & durable comfort</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 border-t md:border-t-0 md:border-l border-beige">
            <div className="p-3 bg-cream rounded-xl text-forest"><RefreshCw size={24} /></div>
            <div>
              <h4 className="font-semibold text-charcoal">Easy Exchange Policy</h4>
              <p className="text-xs text-gray-500">7-day hassle-free replacement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-serif font-bold text-forest">Explore Categories</h2>
          <p className="text-charcoal/70 text-sm">Find the perfect hijab for every occasion.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`}>
              <div className="relative h-64 rounded-2xl overflow-hidden group border border-beige cursor-pointer">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent flex items-end p-6">
                  <h3 className="text-white text-xl font-bold font-serif">{cat.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif font-bold text-forest">Featured Products</h2>
            <p className="text-charcoal/70 text-sm">Handpicked favorites loved by our community.</p>
          </div>
          <Link href="/shop" className="text-forest font-semibold text-sm hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Spinner color="success" size="lg" /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Customer Testimonials */}
      <section className="bg-beige/40 py-16 border-y border-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-forest">What Our Sisters Say</h2>
            <p className="text-charcoal/70 text-sm">Real reviews from ROOTZ customers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sumiya Akter", text: "The fabric quality of the Salat Hijab is unmatched. Extremely soft and doesn't slip during prayer!" },
              { name: "Nusrat Jahan", text: "Order arrived in Dhaka in just 2 days. The Rose Dust color is exactly as shown in photos." },
              { name: "Farhana Islam", text: "Loved the minimalist packaging and premium finish. Definitely ordering more for everyday wear." },
            ].map((rev, i) => (
              <Card key={i} className="bg-white border border-beige p-2 shadow-sm">
                <CardBody className="space-y-3 text-left">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-charcoal/80 text-sm italic">"{rev.text}"</p>
                  <p className="text-xs font-bold text-forest">{rev.name}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}