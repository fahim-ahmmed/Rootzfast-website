"use client";

import { useState, useEffect } from "react";
import { 
  Tabs, 
  Tab, 
  Card, 
  CardBody, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  Chip, 
  Input, 
  Button, 
  Spinner 
} from "@heroui/react";
import { User, Package, MapPin, Heart, LogOut } from "lucide-react";

export default function CustomerAccountPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock Profile State
  const [profile, setProfile] = useState({
    name: "Amina Rahman",
    email: "amina@example.com",
    phone: "01700000000",
    address: "House 12, Road 5, Block B, Mirpur",
    city: "Dhaka"
  });

  useEffect(() => {
    async function fetchUserOrders() {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Failed to fetch user orders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "warning";
      case "Processing": return "info";
      case "Shipped": return "primary";
      case "Delivered": return "success";
      case "Cancelled": return "danger";
      default: return "default";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-cream min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-forest">My Account</h1>
        <p className="text-charcoal/70 text-sm">Manage your profile, orders, and addresses.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-beige shadow-sm">
        <Tabs aria-label="Account Options" color="success" variant="solid" className="mb-6">
          {/* Orders Tab */}
          <Tab
            key="orders"
            title={
              <div className="flex items-center gap-2">
                <Package size={16} />
                <span>My Orders</span>
              </div>
            }
          >
            <div className="py-4">
              {loading ? (
                <div className="flex justify-center p-8"><Spinner color="success" /></div>
              ) : orders.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No order history available.</p>
              ) : (
                <Table aria-label="Customer Orders Table">
                  <TableHeader>
                    <TableColumn>ORDER ID</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>TOTAL</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell className="font-mono font-bold text-forest">{order.orderId}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="font-bold">৳{order.total}</TableCell>
                        <TableCell>
                          <Chip color={getStatusColor(order.status)} size="sm" variant="flat">
                            {order.status}
                          </Chip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </Tab>

          {/* Profile Details Tab */}
          <Tab
            key="profile"
            title={
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>Profile</span>
              </div>
            }
          >
            <div className="py-4 space-y-4 max-w-lg">
              <Input
                label="Full Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
              <Input label="Email" value={profile.email} disabled />
              <Input
                label="Phone Number"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
              <Button className="bg-forest text-white">Update Profile</Button>
            </div>
          </Tab>

          {/* Saved Addresses Tab */}
          <Tab
            key="addresses"
            title={
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Saved Address</span>
              </div>
            }
          >
            <div className="py-4 max-w-lg space-y-4">
              <Input
                label="Street Address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
              <Input
                label="City / District"
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
              />
              <Button className="bg-forest text-white">Save Address</Button>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}