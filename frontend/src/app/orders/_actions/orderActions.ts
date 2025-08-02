"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { orders, orderItems, cartItems } from "~/server/db/schema";
import { generateOrderNumber } from "../utils";
import type { CreateOrderData, CartItem } from "../types";

export async function createOrder(orderData: CreateOrderData) {
  const user = auth();
  if (!user.userId) {
    throw new Error("User not authenticated");
  }

  try {
    // Generate unique order number
    const orderNumber = generateOrderNumber();

    // Create the order
    const [newOrder] = await db.insert(orders).values({
      userId: user.userId,
      orderNumber,
      status: "pending",
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      trackingNumber: null,
    }).returning();

    if (!newOrder) {
      throw new Error("Failed to create order");
    }

    // Create order items
    const orderItemsData = orderData.cartItems.map((cartItem) => ({
      orderId: newOrder.id,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      price: cartItem.products.price * cartItem.quantity,
    }));

    await db.insert(orderItems).values(orderItemsData);

    // Clear cart items
    await db.delete(cartItems).where(eq(cartItems.userId, user.userId));

    revalidatePath("/orders");
    revalidatePath("/cart");

    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}

export async function clearUserCart(userId: string) {
  try {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
    revalidatePath("/cart");
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw new Error("Failed to clear cart");
  }
}