"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Button, Spinner } from "@heroui/react";
import { Search } from "lucide-react";

// Initial Static Products
const initialProducts = [
  { _id: "1", name: "Everyday Hijab", image: "/1.jpg", category: "everyday-hijab", regularPrice: 800, discountPrice: 600 },
  { _id: "2", name: "Salat Hijab", image: "/2.jpg", category: "everyday-hijab", regularPrice: 800, discountPrice: 600 },
  { _id: "3", name: "Long Hijab", image: "/3.jpg", category: "salat-hijab", regularPrice: 800, discountPrice: 600 },
  { _id: "4", name: " Regular Hijab", image: "/4.jpg", category: "premium-silk", regularPrice: 800, discountPrice: 600 },
  { _id: "5", name: "Premium Salat Hijab", image: "/5.jpg", category: "salat-hijab", regularPrice: 800, discountPrice: 600 },
];

function ShopFilterWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const activeCategory = searchParams.get("category") || "all";
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState(initialProducts);

  // Load Admin Custom Uploaded Products from LocalStorage
  useEffect(() => {
    try {
      const customProducts = JSON.parse(localStorage.getItem("rootz_custom_products") || "[]");
      if (customProducts.length > 0) {
        setAllProducts([...customProducts, ...initialProducts]);
      }
    } catch (err) {
      console.error("Error loading products:", err);
    }
  }, []);

  const categories = [
    { label: "ALL", value: "all" },
    { label: "SALAT HIJAB", value: "salat-hijab" },
    { label: "EVERYDAY HIJAB", value: "everyday-hijab" },
    { label: "PREMIUM SILK", value: "premium-silk" },
  ];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchCategory = activeCategory === "all" || product.category === activeCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [allProducts, activeCategory, searchQuery]);

  const handleCategoryChange = (val) => {
    if (val === "all") {
      router.push("/shop");
    } else {
      router.push(`/shop?category=${val}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Sidebar Filters */}
      <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6 h-fit">
        <div className="font-bold text-sm text-[#0E281D] border-b pb-2 uppercase tracking-wider">
          FILTERS
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-700">Category</p>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat.value
                    ? "bg-[#0E281D] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <Button
            size="sm"
            variant="flat"
            className="w-full text-xs font-semibold text-gray-600"
            onClick={() => handleCategoryChange("all")}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Main Product Grid */}
      <div className="lg:col-span-9 space-y-6">
        
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search products..."
              size="sm"
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Search size={16} className="text-gray-400" />}
            />
          </div>
          <p className="text-xs text-gray-500">Showing {filteredProducts.length} items</p>
        </div>

        {/* Product Listing */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-3">
            <p className="text-sm font-semibold text-gray-600">No products found matching your filters.</p>
            <Button size="sm" className="bg-[#0E281D] text-white" onClick={() => handleCategoryChange("all")}>
              View All Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link 
                key={product._id} 
                href={`/product/${product._id}`} 
                className="group block space-y-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-full aspect-[3/4] bg-gray-50 overflow-hidden rounded-xl">
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
        )}

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 px-4 sm:px-8 max-w-7xl mx-auto text-[#1E1E1E]">
      
      {/* Header */}
      <div className="space-y-1 mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#0E281D]">ROOTZ Collection</h1>
        <p className="text-xs text-gray-500">Discover timeless modesty designed for everyday elegance.</p>
      </div>

      <Suspense fallback={<div className="flex justify-center py-20"><Spinner color="success" size="lg" /></div>}>
        <ShopFilterWrapper />
      </Suspense>
    </div>
  );
}