"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Button } from "@heroui/react";
import { ShoppingBag, DollarSign, PackageCheck, LogOut, ArrowLeft, RefreshCw, Phone, MapPin, CreditCard } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const sampleOrders = [
    {
      id: "ORD-101",
      customerName: "মোসাম্মাৎ সুলতানা",
      phone: "01712345678",
      address: "বাসা ১২, রোড ৫, মিরপুর ১০, ঢাকা",
      items: "Surjomuki Hijab (2)",
      totalAmount: 1320,
      paymentMethod: "COD",
      status: "Pending",
      date: "2026-02-20",
    },
    {
      id: "ORD-102",
      customerName: "জান্নাতুল ফেরদৌস",
      phone: "01887654321",
      address: "হালিশহর, চট্টগ্রাম",
      items: "Butterfly Hijab (3)",
      totalAmount: 1800,
      paymentMethod: "bKash (Trx: 9J87X7YY)",
      status: "Completed",
      date: "2026-02-19",
    },
  ];

  useEffect(() => {
    const session = localStorage.getItem("rootz_admin_session");
    if (!session) {
      router.push("/login");
    } else {
      setIsAdminLoggedIn(true);
      fetchOrders();
    }
  }, [router]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || sampleOrders);
      } else {
        setOrders(sampleOrders);
      }
    } catch (err) {
      setOrders(sampleOrders);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rootz_admin_session");
    router.push("/login");
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
        <p className="text-sm font-semibold text-gray-600">এডমিন সেশন ভেরিফাই করা হচ্ছে...</p>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, ord) => sum + (Number(ord.totalAmount) || 0), 0);
  const totalOrdersCount = orders.length;

  return (
    <div className="bg-[#FAF8F5] min-h-screen p-4 sm:p-8 text-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#0E281D]">ROOTZ Admin Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5">সবগুলো কাস্টমার অর্ডার কন্ট্রোল ও ম্যানেজ করুন</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button size="sm" variant="flat" className="text-xs font-semibold text-gray-600">
                <ArrowLeft size={14} /> ভিউ ওয়েবসাইট
              </Button>
            </Link>

            <Button size="sm" color="danger" variant="flat" onClick={handleLogout} className="text-xs font-bold">
              <LogOut size={14} /> লগআউট
            </Button>
          </div>
        </div>

        {/* Counter Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="bg-white border border-gray-200/80 shadow-sm rounded-2xl">
            <CardBody className="flex flex-row items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0E281D] text-white flex items-center justify-center">
                <ShoppingBag size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">মোট অর্ডার</p>
                <h3 className="text-2xl font-bold text-[#0E281D]">{totalOrdersCount} টি</h3>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200/80 shadow-sm rounded-2xl">
            <CardBody className="flex flex-row items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">মোট বিক্রি (Revenue)</p>
                <h3 className="text-2xl font-bold text-emerald-700">৳{totalRevenue}</h3>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200/80 shadow-sm rounded-2xl">
            <CardBody className="flex flex-row items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#C28E79] text-white flex items-center justify-center">
                <PackageCheck size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">ডেলিভারি স্ট্যাটাস</p>
                <h3 className="text-2xl font-bold text-[#0E281D]">একটিভ</h3>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Orders Table */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="font-bold text-base text-[#0E281D]">কাস্টমার অর্ডার লিস্ট</h3>
            <Button size="sm" variant="light" onClick={fetchOrders} className="text-xs font-semibold text-gray-600">
              <RefreshCw size={14} /> রিফ্রেশ
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#FAF8F5] text-[#0E281D] uppercase text-[11px] font-bold border-b border-gray-200">
                <tr>
                  <th className="p-3">অর্ডার আইডি</th>
                  <th className="p-3">কাস্টমারের নাম ও ফোন</th>
                  <th className="p-3">ঠিকানা</th>
                  <th className="p-3">প্রোডাক্ট ও বিবরণ</th>
                  <th className="p-3">পেমেন্ট মেথড</th>
                  <th className="p-3">মোট দাম</th>
                  <th className="p-3">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((ord, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-bold text-[#0E281D]">{ord.id || `#${idx + 1}`}</td>
                    <td className="p-3">
                      <p className="font-bold text-gray-900">{ord.customerName}</p>
                      <p className="text-gray-500 flex items-center gap-1 mt-0.5">
                        <Phone size={11} /> {ord.phone}
                      </p>
                    </td>
                    <td className="p-3 max-w-xs">
                      <span className="flex items-start gap-1 text-gray-600">
                        <MapPin size={12} className="shrink-0 mt-0.5" /> {ord.address}
                      </span>
                    </td>
                    <td className="p-3 font-medium">
                      {Array.isArray(ord.items)
                        ? ord.items.map((i) => `${i.name} (${i.quantity || 1})`).join(", ")
                        : ord.items}
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-gray-600 font-semibold bg-gray-100 px-2 py-1 rounded-md text-[10px]">
                        <CreditCard size={12} /> {ord.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3 font-extrabold text-[#0E281D] text-sm">৳{ord.totalAmount}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ord.status === "Completed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {ord.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}