"use client";

import { useState } from "react";
import { Button, Textarea, Input, Spinner } from "@heroui/react";
import { Star } from "lucide-react";

export default function ProductReviewSection({ productId, initialReviews = [] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(5);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/products/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, user: userName, rating, comment }),
      });

      const data = await res.json();
      if (res.ok) {
        setReviews(data.reviews);
        setComment("");
        setUserName("");
        alert("Review submitted successfully!");
      } else {
        alert(data.error || "Failed to submit review.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-beige shadow-sm space-y-6">
      <h3 className="text-xl font-serif font-bold text-charcoal">Customer Reviews & Ratings</h3>

      {/* Write a Review Form */}
      <form onSubmit={handleSubmitReview} className="p-4 bg-cream/50 rounded-xl space-y-4 border border-beige">
        <h4 className="text-sm font-semibold text-forest">Leave Your Review</h4>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-charcoal">Your Rating:</span>
          <div className="flex text-amber-500 cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                fill={star <= rating ? "currentColor" : "none"}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <Input
          placeholder="Your Name (Optional)"
          value={userName}
          onValueChange={setUserName}
          size="sm"
        />

        <Textarea
          placeholder="Write your honest feedback about this hijab..."
          value={comment}
          onValueChange={setComment}
          required
          minRows={3}
        />

        <Button
          type="submit"
          isLoading={submitting}
          className="bg-forest text-white font-semibold"
          size="sm"
        >
          Submit Review
        </Button>
      </form>

      {/* Reviews Display List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No reviews yet. Be the first to review this product!</p>
        ) : (
          reviews.map((rev, idx) => (
            <div key={idx} className="border-b border-beige pb-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-charcoal text-sm">{rev.user || "Anonymous"}</span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < rev.rating ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-charcoal/80">{rev.comment}</p>
              <span className="text-[10px] text-gray-400">
                {new Date(rev.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}