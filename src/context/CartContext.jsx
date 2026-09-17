"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // LocalStorage থেকে আগের কার্ট ডাটা লোড করা
  useEffect(() => {
    const savedCart = localStorage.getItem("rootz_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Cart loading error:", err);
      }
    }

    const savedWishlist = localStorage.getItem("rootz_wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (err) {
        console.error("Wishlist loading error:", err);
      }
    }
  }, []);

  // কার্ট চেঞ্জ হলে LocalStorage-এ সেভ করা
  useEffect(() => {
    localStorage.setItem("rootz_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("rootz_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // আইটেম এড করার সময় Number() নিশ্চিত করা (String Concatenation Bug Fix)
  const addToCart = (product, quantity = 1) => {
    const qtyToAdd = Number(quantity) || 1;
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item._id === product._id);
      
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        const currentQty = Number(updatedCart[existingItemIndex].quantity) || 1;
        updatedCart[existingItemIndex].quantity = currentQty + qtyToAdd;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: qtyToAdd }];
      }
    });
  };

  // কার্ট থেকে হিজাব সরানো
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // পরিমাণ পরিবর্তন
  const updateQuantity = (productId, newQty) => {
    const qty = Number(newQty);
    if (qty < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  // কার্ট ক্লিয়ার
  const clearCart = () => {
    setCart([]);
  };

  // মোট হিজাবের সংখ্যা সঠিকভাবে হিসাব
  const cartCount = cart.reduce((total, item) => total + (Number(item.quantity) || 1), 0);

  // মোট সাবটোটাল টাকা
  const cartSubtotal = cart.reduce((total, item) => {
    const price = Number(item.discountPrice) || Number(item.regularPrice) || 600;
    return total + price * (Number(item.quantity) || 1);
  }, 0);

  const cartTotal = cartSubtotal;

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      if (exists) {
        return prev.filter((item) => item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        cartSubtotal,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);