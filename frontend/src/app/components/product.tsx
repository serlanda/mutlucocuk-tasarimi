/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// "use client";
import Image from "next/image";
import Link from "next/link";

export default function Product({ product }) {

  return (
    <>
      <div className="">
        <Link
          href={`/products/${product.id}`}
          className="group"
        >
          <div className="relative h-[350px] w-[350px] overflow-hidden rounded-2xl">
            <Image
              src={product.image}
              width={400}
              height={400}
              className="object-contain group-hover:scale-110 transition-transform duration-300 w-full"
              alt={product.title}
            />
            <p className="absolute bottom-0 right-0 px-5 py-1 rounded-tl-2xl bg-[#FFC8DD] text-xl font-semibold">₺ {product.price}</p>
          </div>
          <div className="text-black">
            <h2 className="text-xl font-semibold">{product.name}</h2>
          </div>
        </Link>
      </div>
    </>
  );
}