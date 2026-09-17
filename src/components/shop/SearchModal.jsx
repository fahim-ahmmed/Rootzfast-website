"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Spinner,
  Image,
} from "@heroui/react";
import { Search, X, ArrowRight } from "lucide-react";

export default function SearchModal({ isOpen, onOpenChange, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const filtered = (data.products || []).filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric?.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.slice(0, 5));
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      backdrop="blur"
      placement="top"
      classNames={{
        base: "bg-cream border border-beige rounded-2xl shadow-2xl mt-12",
      }}
    >
      <ModalContent>
        {() => (
          <ModalBody className="p-6 space-y-4">
            {/* Search Input Bar */}
            <Input
              autoFocus
              placeholder="Search by product name, category, or fabric..."
              value={query}
              onValueChange={setQuery}
              startContent={<Search size={20} className="text-forest" />}
              endContent={
                query && (
                  <button onClick={() => setQuery("")} className="text-gray-400 hover:text-charcoal">
                    <X size={18} />
                  </button>
                )
              }
              variant="bordered"
              size="lg"
              className="w-full bg-white rounded-xl"
            />

            {/* Results Output Section */}
            <div className="space-y-3 min-h-[200px] max-h-[350px] overflow-y-auto pr-1">
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <Spinner color="success" size="md" />
                </div>
              ) : query && results.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-sm">
                  No hijabs found matching "<strong>{query}</strong>"
                </div>
              ) : (
                results.map((product) => (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 bg-white hover:bg-beige/40 rounded-xl border border-beige transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.images[0] || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-charcoal text-sm group-hover:text-forest transition-colors">
                          {product.name}
                        </h4>
                        <span className="text-xs text-rose font-medium capitalize">
                          {product.category.replace("-", " ")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-forest text-sm">
                        ৳{product.discountPrice || product.regularPrice}
                      </span>
                      <ArrowRight size={16} className="text-gray-400 group-hover:text-forest transition-colors" />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}