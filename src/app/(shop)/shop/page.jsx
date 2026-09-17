"use client";

import { useState, useEffect } from "react";
import { 
  Input, 
  Select, 
  SelectItem, 
  CheckboxGroup, 
  Checkbox, 
  Slider, 
  Button, 
  Spinner 
} from "@heroui/react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filter Logic
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const effectivePrice = product.discountPrice || product.regularPrice;
      const matchesPrice = effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return (a.discountPrice || a.regularPrice) - (b.discountPrice || b.regularPrice);
      if (sortBy === "price-high") return (b.discountPrice || b.regularPrice) - (a.discountPrice || a.regularPrice);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-cream min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-forest">ROOTZ Collection</h1>
          <p className="text-charcoal/70 text-sm">Discover timeless modesty designed for everyday elegance.</p>
        </div>

        {/* Search & Sorting Controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Search size={18} className="text-gray-400" />}
            className="w-full sm:w-64"
          />
          <Select
            selectedKeys={[sortBy]}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-48"
            aria-label="Sort products"
          >
            <SelectItem key="newest" value="newest">Newest First</SelectItem>
            <SelectItem key="price-low" value="price-low">Price: Low to High</SelectItem>
            <SelectItem key="price-high" value="price-high">Price: High to Low</SelectItem>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="bg-white p-6 rounded-2xl border border-beige shadow-sm h-fit space-y-6">
          <div className="flex items-center gap-2 border-b border-beige pb-3">
            <SlidersHorizontal size={18} className="text-forest" />
            <h2 className="font-semibold text-charcoal text-lg">Filters</h2>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-3">Category</h3>
            <div className="flex flex-col gap-2">
              {["all", "salat-hijab", "everyday-hijab", "premium-silk", "accessories"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-3 py-1.5 rounded-lg text-sm transition-all ${
                    selectedCategory === cat 
                      ? "bg-forest text-white font-medium" 
                      : "text-charcoal hover:bg-beige/50"
                  }`}
                >
                  {cat.replace("-", " ").toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-3">Price Range (BDT)</h3>
            <Slider
              step={100}
              maxValue={5000}
              minValue={0}
              value={priceRange}
              onChange={setPriceRange}
              formatOptions={{ style: "currency", currency: "BDT" }}
              className="max-w-md"
              color="success"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>৳{priceRange[0]}</span>
              <span>৳{priceRange[1]}</span>
            </div>
          </div>

          <Button 
            variant="flat" 
            color="danger" 
            size="sm" 
            className="w-full"
            onClick={() => {
              setSelectedCategory("all");
              setPriceRange([0, 5000]);
              setSearchQuery("");
            }}
          >
            Reset Filters
          </Button>
        </div>

        {/* Products Grid Section */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" color="success" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-beige">
              <p className="text-gray-500 font-medium">No products found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}