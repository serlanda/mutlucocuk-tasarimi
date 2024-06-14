import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "~/server/db";

export default async function CheckoutButton({ totalPrice }: { totalPrice: number }) {
  const user = auth();

  const shoppingSession = await db.query.shoppingSessions.findFirst({
    where: (model, { eq }) => eq(model.userId, user.userId),
  });

  return (
    <div className="flex">
      <section className="ml-auto flex flex-col gap-2">
        <h2 className="mb-6 mt-1 text-xl font-semibold">Sipariş Özeti</h2>
        <p className="ml-auto text-sm">Ara Toplam ₺ {totalPrice}</p>
        <p className="ml-auto font-semibold">
          Toplam
          <span className="ml-2 text-xl">{totalPrice}.00</span> TL
        </p>
        <Link
          href={`/cart/${shoppingSession?.id}`}
          className="flex items-center justify-center gap-2 bg-[#FFAFCC] px-4 py-2 text-lg font-semibold text-white transition-colors hover:bg-[#FFC8DD]"
        >
          ALIŞVERİŞİ TAMAMLA
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </section>
    </div>
  );
}
