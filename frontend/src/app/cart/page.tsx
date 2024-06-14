import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { db } from "~/server/db";
import CheckoutButton from "./_components/checkoutButton";
import ItemDeleteButton from "./_components/itemDeleteButton";
import { shoppingSessions } from "~/server/db/schema";
import { allCartItems } from "./_actions/cartItem";

export default async function CartPage() {
  const user = auth();

  const cartItems = await allCartItems();
  
  const totalPrice = cartItems?.reduce(
    (acc, cartItem) => acc + cartItem.products.price * cartItem.quantity,
    0,
  );

  await db
    .insert(shoppingSessions)
    .values({
      id: user.userId,
      userId: user.userId,
      total: totalPrice?.toString() || "0",
    })
    .onConflictDoUpdate({ target: shoppingSessions.id, set: { total: totalPrice.toString() } });

  return (
    <main className="p-10">
      <h1 className="text-2xl font-semibold">Sepetim ({cartItems?.length})</h1>
      <section className="flex flex-col gap-4 py-4">
        {cartItems?.map((cartItem) => (
          <div
            key={cartItem.id}
            className="flex flex-row gap-2 border border-black p-2"
          >
            <Image
              src={cartItem.products.image}
              alt={cartItem.products.name}
              width={200}
              height={200}
            />
            <div className="flex w-[800px] flex-col gap-2">
              <h2 className="text-xl font-semibold">
                {cartItem.products.name}
              </h2>
              <span>Adet: {cartItem.quantity}</span>
              <span>Fiyat ₺ {cartItem.products.price}</span>
              <p className="mt-auto text-sm">
                Ürün Kodu: {cartItem.products.id}
              </p>
            </div>
            <div className="mx-auto flex flex-row items-center justify-center gap-10">
              <span className="text-2xl font-semibold">
                ₺ {cartItem.products.price * cartItem.quantity}
              </span>
            </div>
            <ItemDeleteButton id={cartItem.id} />
          </div>
        ))}
      </section>
      <CheckoutButton totalPrice={totalPrice} />
    </main>
  );
}
