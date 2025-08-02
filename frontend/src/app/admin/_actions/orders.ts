"use server";

import { db } from "~/server/db";
import { orders } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export interface UpdateCargoData {
  orderId: string;
  trackingNumber: string;
  status: string;
  shippingAddress: string;
}

export async function updateOrderCargo(data: UpdateCargoData) {
  try {
    const { orderId, trackingNumber, status, shippingAddress } = data;

    await db
      .update(orders)
      .set({
        trackingNumber,
        status,
        shippingAddress,
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    revalidatePath("/admin");
    return { success: true, message: "Kargo bilgileri başarıyla güncellendi" };
  } catch (error) {
    console.error("Error updating cargo information:", error);
    return { success: false, message: "Kargo bilgileri güncellenirken hata oluştu" };
  }
}

export async function getAllOrders() {
  try {
    const allOrders = await db.query.orders.findMany({
      with: {
        orderItems: {
          with: {
            product: true,
          },
        },
      },
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    });

    return allOrders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}