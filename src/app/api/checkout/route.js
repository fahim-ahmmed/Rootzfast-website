import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { customer, items, subtotal, discount, deliveryCharge, total, paymentMethod } = body;

    const orderId = `RTZ-${Date.now().toString().slice(-6)}`;

    // Stock verification & deduction logic
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity) {
        return NextResponse.json({ error: `Out of stock: ${item.name}` }, { status: 400 });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    const newOrder = await Order.create({
      orderId,
      customer,
      items,
      subtotal,
      discount,
      deliveryCharge,
      total,
      paymentMethod,
    });

    return NextResponse.json({ success: true, orderId: newOrder.orderId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}