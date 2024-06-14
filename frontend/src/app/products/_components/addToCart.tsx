import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { cartItems } from "~/server/db/schema";
import ProductCount from "./productCount";
import { redirect } from "next/navigation";

export default function AddToCart({ product }) {
  const user = auth();

  async function handleCart(data: FormData) {
    "use server";

    await db.insert(cartItems).values({
      userId: user.userId,
      productId: product.id,
      quantity: Object.fromEntries(data.entries())["quantity"],
    });

    redirect("/cart");
  }

  return (
    <form action={handleCart} className="w-[100%] h-[100%] flex">
      <ProductCount product={product} />
      <button
        className="w-[50%] bg-[#A2D2FF] text-[25px] text-white transition-colors hover:bg-[#CDB4DB] py-2"
        type="submit"
      >
        Sepete Ekle
      </button>
    </form>
  );
}
