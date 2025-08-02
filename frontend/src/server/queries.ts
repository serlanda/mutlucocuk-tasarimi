"server only";

import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { products } from "./db/schema";
import { eq } from "drizzle-orm";

export async function getProduct(id: number) {
  const product = await db.query.products.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!product) throw new Error("Product not found");

  return product;
}

export async function deleteProduct(id: string) {
  await db.delete(products).where(eq(products.id, id))
  redirect("/");
}

export async function getUserOrders(userId: string) {
  const orders = await db.query.orders.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    with: {
      orderItems: {
        with: {
          product: true,
        },
      },
    },
    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
  });

  return orders;
}

export async function getOrderById(orderId: string) {
  const order = await db.query.orders.findFirst({
    where: (model, { eq }) => eq(model.id, orderId),
    with: {
      orderItems: {
        with: {
          product: true,
        },
      },
      user: true,
    },
  });

  if (!order) throw new Error("Order not found");
  return order;
}

// export async function getCartItems({id}: {id: string}) {
//   const cartItems = await db.query.cartItem.findMany({
//     where: (model, { eq }) => eq(model.userId, id),
//   });
//   return cartItems;
// }