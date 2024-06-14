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

// export async function getCartItems({id}: {id: string}) {


//   const cartItems = await db.query.cartItem.findMany({
//     where: (model, { eq }) => eq(model.userId, id),
//   });

//   return cartItems;
// }
