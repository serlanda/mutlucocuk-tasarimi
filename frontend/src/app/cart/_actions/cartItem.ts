"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { cartItems } from "~/server/db/schema";

export async function removeItem(id: string) {
  await db.delete(cartItems).where(eq(cartItems.id, id));

  revalidatePath("/cart");
}

export async function allCartItems() {
  const cartItems = await db.query.cartItems.findMany({
    where: (model, { eq }) => eq(model.userId, auth().userId),
    with: {
      products: true,
    },
  });

  return cartItems;
}

export async function getUser() {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.clerkId, auth().userId),
  });

  return user;
}