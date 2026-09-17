"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardBody, 
  Button, 
  Input, 
  Textarea,
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure
} from "@heroui/react";
import { 
  ShoppingBag, 
  DollarSign, 
  LogOut, 
  ArrowLeft, 
  Phone, 
  MapPin, 
  CreditCard, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  Image as ImageIcon
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [orders, setOrders] = useState([
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
  ]);

  // Form State
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("everyday-hijab");
  const [imageFileName, setImageFileName] = useState("");
  const [regularPrice, setRegularPrice] = useState("800");
  const [discountPrice, setDiscountPrice] = useState("600");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("rootz_admin_session");
    if (!session) {
      router.push("/login");
    } else {
      setIsAdminLoggedIn(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("rootz_admin_session");
    document.cookie = "admin_logged_in=; max-age=0; path=/";
    router.push("/login");
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // New Product Submit Handler
  const handleAddProduct = (e) => {
    e.preventDefault();
    setIsAdding(true);

    // Format file name safely to public folder path
    let formattedImgPath = imageFileName.trim();
    if (!formattedImgPath.startsWith("/")) {
      formattedImgPath = "/" + formattedImgPath;
    }

    const newProduct = {
      _id: Date.now().toString(),
      name: productName,
      category,
      image: formattedImgPath,
      regularPrice: Number(regularPrice),
      discountPrice: Number(discountPrice),
      description: description || "নামাজ ও দৈনন্দিন ব্যবহারের জন্য তৈরি আমাদের Premium Hijab Collection।"
    };

    // Save to LocalStorage for live dynamic UI updating
    const existingProducts = JSON.parse(localStorage.getItem("rootz_custom_products") || "[]");
    localStorage.setItem("rootz_custom_products", JSON.stringify([newProduct, ...existingProducts]));

    setTimeout(() => {
      setIsAdding(false);
      onClose();
      alert(`"${productName}" সফলভাবে পাবলিক ফোল্ডারের ইমেজ (${formattedImgPath}) সহ ওয়েবসাইটে যোগ হয়েছে!`);
      // Reset Form
      setProductName("");
      setImageFileName("");
      setDescription("");
    }, 400);
  };

  if (!isAdminLoggedIn) return null;

  const totalRevenue = orders
    .filter((o) => o.status === "Completed")
    .reduce((sum, ord) => sum + (Number(ord.totalAmount) || 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === "Pending").length;
  const completedOrdersCount = orders.filter((o) => o.status === "Completed").length;

  return (
    <div className="bg-[#FAF8F5] min-h-screen p-4 sm:p-8 text-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#0E281D]">ROOTZ Admin Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5">অর্ডার স্ট্যাটাস ও হিজাব কালেকশন যুক্ত করুন</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button 
              size="sm" 
              onClick={onOpen}
              className="bg-[#0E281D] text-white font-bold text-xs px-4 py-5 rounded-xl shadow-md flex items-center gap-1.5 hover:bg-[#0E281D]/90"
            >
              <PlusCircle size={16} /> নতুন হিজাব যোগ করুন
            </Button>

            <Link href="/">
              <Button size="sm" variant="flat" className="text-xs font-semibold text-gray-600 py-5 rounded-xl">
                <ArrowLeft size={14} /> ভিউ ওয়েবসাইট
              </Button>
            </Link>

            <Button size="sm" color="danger" variant="flat" onClick={handleLogout} className="text-xs font-bold py-5 rounded-xl">
              <LogOut size={14} /> লগআউট
            </Button>
          </div>
        </div>

        {/* Counter Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Card className="bg-white border border-gray-200/80 shadow-sm rounded-2xl">
            <CardBody className="flex flex-row items-center gap-4 p-5">
              <div className="w-12 h-12 rounded-2xl bg-[#0E281D] text-white flex items-center justify-center">
                <ShoppingBag size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">মোট অর্ডার</p>
                <h3 className="text-xl font-bold text-[#0E281D]">{orders.length} টি</h3>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200/80 shadow-sm rounded-2xl">
            <CardBody className="flex flex-row items-center gap-4 p-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">পেন্ডিং অর্ডার</p>
                <h3 className="text-xl font-bold text-amber-600">{pendingOrdersCount} টি</h3>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200/80 shadow-sm rounded-2xl">
            <CardBody className="flex flex-row items-center gap-4 p-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">কমপ্লিট অর্ডার</p>
                <h3 className="text-xl font-bold text-emerald-600">{completedOrdersCount} টি</h3>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200/80 shadow-sm rounded-2xl">
            <CardBody className="flex flex-row items-center gap-4 p-5">
              <div className="w-12 h-12 rounded-2xl bg-[#C28E79] text-white flex items-center justify-center">
                <DollarSign size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">মোট বিক্রি (Paid)</p>
                <h3 className="text-xl font-bold text-emerald-700">৳{totalRevenue}</h3>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Orders Table */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="font-bold text-base text-[#0E281D]">কাস্টমার অর্ডার লিস্ট</h3>
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
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-bold text-[#0E281D]">{ord.id}</td>
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
                    <td className="p-3 font-medium">{ord.items}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-gray-600 font-semibold bg-gray-100 px-2 py-1 rounded-md text-[10px]">
                        <CreditCard size={12} /> {ord.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3 font-extrabold text-[#0E281D] text-sm">৳{ord.totalAmount}</td>
                    <td className="p-3">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border outline-none cursor-pointer ${
                          ord.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : ord.status === "Cancelled"
                            ? "bg-rose-50 text-rose-700 border-rose-300"
                            : "bg-amber-50 text-amber-700 border-amber-300"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* FIXED CLEAN MODAL FORM */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        placement="center" 
        backdrop="blur"
        classNames={{
          wrapper: "z-[999]",
          backdrop: "bg-black/40 backdrop-blur-sm",
          base: "border border-gray-200 shadow-2xl bg-white rounded-3xl max-w-lg w-full p-2 mx-4"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#0E281D] font-serif font-bold text-xl border-b pb-3">
                নতুন হিজাব যোগ করুন
                <span className="text-xs font-sans text-gray-500 font-normal">
                  আপনার প্রজেক্টের public/ ফোল্ডারে থাকা ছবির ফাইল নাম ব্যবহার করুন।
                </span>
              </ModalHeader>
              
              <ModalBody className="space-y-4 text-xs py-4">
                <form id="add-product-form" onSubmit={handleAddProduct} className="space-y-4">
                  
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">হিজাবের নাম *</label>
                    <Input 
                      placeholder="যেমন: Soronolata Hijab" 
                      required 
                      value={productName} 
                      onValueChange={setProductName} 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">ক্যাটাগরি *</label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs outline-none font-semibold text-gray-800 focus:ring-1 focus:ring-[#0E281D]"
                      >
                        <option value="everyday-hijab">Everyday Hijab</option>
                        <option value="salat-hijab">Salat Collection</option>
                        <option value="premium-silk">Premium Silk</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Public ছবির নাম *</label>
                      <Input 
                        placeholder="যেমন: 1.jpg বা new.png" 
                        required 
                        value={imageFileName} 
                        onValueChange={setImageFileName} 
                        startContent={<ImageIcon size={16} className="text-gray-400" />}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">রেগুলার প্রাইজ (TK) *</label>
                      <Input 
                        type="number" 
                        placeholder="800" 
                        required 
                        value={regularPrice} 
                        onValueChange={setRegularPrice} 
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-700 block mb-1">ডিসকাউন্ট প্রাইজ (TK) *</label>
                      <Input 
                        type="number" 
                        placeholder="600" 
                        required 
                        value={discountPrice} 
                        onValueChange={setDiscountPrice} 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">ডেসক্রিপশন</label>
                    <Textarea 
                      placeholder="হিজাবের ফেব্রিক, সাইজ ও বিস্তারিত তথ্য লিখুন..." 
                      value={description} 
                      onValueChange={setDescription} 
                    />
                  </div>

                </form>
              </ModalBody>

              <ModalFooter className="border-t pt-3">
                <Button color="danger" variant="light" onClick={onClose} className="font-bold text-xs">
                  বাতিল করুন
                </Button>
                <Button 
                  form="add-product-form" 
                  type="submit" 
                  isLoading={isAdding} 
                  className="bg-[#0E281D] text-white font-bold text-xs rounded-xl px-6 py-2 shadow-md hover:bg-[#0E281D]/90"
                >
                  প্রোডাক্ট আপলোড করুন
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  );
}