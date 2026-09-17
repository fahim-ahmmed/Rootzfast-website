"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  Button, 
  Chip, 
  Spinner, 
  Tabs, 
  Tab, 
  Card, 
  CardBody 
} from "@heroui/react";
import { Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Star } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selection States
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        
        if (data.product) {
          setProduct(data.product);
          setSelectedImage(data.product.images[0] || "/placeholder.jpg");
          if (data.product.colors?.length) setSelectedColor(data.product.colors[0]);
          if (data.product.sizes?.length) setSelectedSize(data.product.sizes[0]);

          // Related Products Fetching
          const relRes = await fetch(`/api/products?category=${data.product.category}`);
          const relData = await relRes.json();
          setRelatedProducts(
            (relData.products || []).filter((p) => p._id !== data.product._id).slice(0, 4)
          );
        }
      } catch (err) {
        console.error("Failed to load product details:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-cream">
        <Spinner size="lg" color="success" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 bg-cream min-h-screen">
        <h2 className="text-xl font-semibold text-charcoal">Product Not Found</h2>
      </div>
    );
  }

  const discount = product.discountPrice 
    ? Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-cream min-h-screen space-y-16">
      {/* Product Details Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Gallery & Zoom Section */}
        <div className="space-y-4">
          <div className="w-full h-[450px] sm:h-[550px] overflow-hidden rounded-2xl border border-beige bg-white relative group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-zoom-in"
            />
            {discount > 0 && (
              <Chip color="danger" size="md" className="absolute top-4 left-4 z-10 font-bold">
                -{discount}% OFF
              </Chip>
            )}
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img ? "border-forest scale-95" : "border-beige opacity-70"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Meta & Actions */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase text-rose tracking-wider">{product.category}</span>
            <h1 className="text-3xl font-serif font-bold text-charcoal mt-1">{product.name}</h1>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium">(4.8 Customer Ratings)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-forest">৳{product.discountPrice || product.regularPrice}</span>
            {product.discountPrice && (
              <span className="text-lg text-gray-400 line-through">৳{product.regularPrice}</span>
            )}
          </div>

          <p className="text-charcoal/80 text-sm leading-relaxed">{product.description}</p>

          {/* Color Selector */}
          {product.colors?.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Color: {selectedColor}</label>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      selectedColor === color
                        ? "bg-forest text-white border-forest shadow-sm"
                        : "bg-white text-charcoal border-beige hover:bg-beige/40"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Size: {selectedSize}</label>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      selectedSize === size
                        ? "bg-forest text-white border-forest shadow-sm"
                        : "bg-white text-charcoal border-beige hover:bg-beige/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Quantity</label>
            <div className="flex items-center border border-beige rounded-xl w-fit bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-charcoal hover:bg-beige/40 text-lg font-bold"
              >
                -
              </button>
              <span className="px-4 py-1 text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-charcoal hover:bg-beige/40 text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <Button size="lg" className="flex-1 bg-forest text-white font-semibold" startContent={<ShoppingBag size={18} />}>
              Add To Cart
            </Button>
            <Button isIconOnly size="lg" variant="bordered" className="border-beige">
              <Heart size={20} className="text-charcoal" />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 border-t border-beige pt-6">
            <div className="flex flex-col items-center text-center gap-1">
              <Truck size={20} className="text-forest" />
              <span className="text-[11px] font-semibold text-charcoal">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <ShieldCheck size={20} className="text-forest" />
              <span className="text-[11px] font-semibold text-charcoal">Premium Quality</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <RefreshCw size={20} className="text-forest" />
              <span className="text-[11px] font-semibold text-charcoal">Easy Exchange</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specs & Care */}
      <div className="bg-white rounded-2xl p-6 border border-beige shadow-sm">
        <Tabs aria-label="Product Specifications" color="success" variant="underlined">
          <Tab key="details" title="Product Details">
            <div className="py-4 text-sm text-charcoal/80 space-y-2">
              <p><strong>Fabric:</strong> {product.fabric || "Premium Chiffon"}</p>
              <p><strong>Brand:</strong> {product.brand || "ROOTZ"}</p>
              <p><strong>Stock Status:</strong> {product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
            </div>
          </Tab>
          <Tab key="care" title="Care Instructions">
            <div className="py-4 text-sm text-charcoal/80 space-y-1">
              <p>• Hand wash gently with cold water and mild detergent.</p>
              <p>• Do not wring or twist fabric.</p>
              <p>• Iron on low heat setting.</p>
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-forest">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct._id} product={relProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}