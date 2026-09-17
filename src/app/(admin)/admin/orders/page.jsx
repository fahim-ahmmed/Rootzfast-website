"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Chip,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button
} from "@heroui/react";
import { Eye } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
    } fontally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (res.ok) fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusChipColor = (status) => {
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
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Order Management</h1>
        <p className="text-gray-500 text-sm">View and manage customer orders.</p>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Spinner color="success" size="lg" /></div>
      ) : (
        <Table aria-label="Orders Table">
          <TableHeader>
            <TableColumn>ORDER ID</TableColumn>
            <TableColumn>CUSTOMER</TableColumn>
            <TableColumn>PAYMENT</TableColumn>
            <TableColumn>TOTAL</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o._id}>
                <TableCell className="font-mono font-bold text-forest">{o.orderId}</TableCell>
                <TableCell>
                  <p className="font-semibold">{o.customer.name}</p>
                  <p className="text-xs text-gray-400">{o.customer.phone}</p>
                </TableCell>
                <TableCell>{o.paymentMethod}</TableCell>
                <TableCell className="font-bold">৳{o.total}</TableCell>
                <TableCell>
                  <Select
                    size="sm"
                    selectedKeys={[o.status]}
                    onChange={(e) => handleStatusChange(o.orderId, e.target.value)}
                    className="w-36"
                  >
                    <SelectItem key="Pending" value="Pending">Pending</SelectItem>
                    <SelectItem key="Processing" value="Processing">Processing</SelectItem>
                    <SelectItem key="Shipped" value="Shipped">Shipped</SelectItem>
                    <SelectItem key="Delivered" value="Delivered">Delivered</SelectItem>
                    <SelectItem key="Cancelled" value="Cancelled">Cancelled</SelectItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onClick={() => {
                      setActiveOrder(o);
                      onOpen();
                    }}
                  >
                    <Eye size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Order Details Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {() => (
            activeOrder && (
              <>
                <ModalHeader>Order Details — {activeOrder.orderId}</ModalHeader>
                <ModalBody className="space-y-4 pb-6">
                  <div className="p-3 bg-beige/40 rounded-lg text-sm space-y-1">
                    <p><strong>Customer:</strong> {activeOrder.customer.name}</p>
                    <p><strong>Phone:</strong> {activeOrder.customer.phone}</p>
                    <p><strong>Address:</strong> {activeOrder.customer.address}, {activeOrder.customer.city}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-sm">Items:</p>
                    {activeOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between border-b pb-2 text-sm">
                        <span>{item.name} ({item.color}) x {item.quantity}</span>
                        <span className="font-bold">৳{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-bold text-base border-t pt-2">
                    <span>Grand Total:</span>
                    <span className="text-forest">৳{activeOrder.total}</span>
                  </div>
                </ModalBody>
              </>
            )
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}