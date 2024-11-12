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
          <div className="relative 2xl:w-[350px] 2xl:h-[350px] xl:w-[275px] xl:h-[275px] lg-w-[300px] lg:h-[250px] overflow-hidden rounded-2xl">
            <Image
              src={product.image}
              width={400}
              height={400}
              className="object-contain group-hover:scale-110 transition-transform duration-300 w-full"
              alt={product.title}
            />
            <p className="absolute bottom-3 -right-2 px-5 py-1 rounded-l-2xl bg-[#FFC8DD] text-xl font-semibold border border-black">₺ {product.price}</p>
          </div>
          <div className="text-black max-w-[350px]">
            <h2 className="text-xl font-semibold">{product.name}</h2>
          </div>
        </Link>
      </div>
    </>
  );
}