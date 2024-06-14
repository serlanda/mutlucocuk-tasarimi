import { db } from "~/server/db";
import Product from "./components/product";
import ImageSlider from "./components/imageSlider";
import Carousel from "./components/carousel";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await db.query.products.findMany();

  return (
    <>
      <ImageSlider />
      <Carousel />
      <main className="mt-8">
        <ul className="container mx-auto grid grid-cols-12 gap-2.5 md:gap-4"> 
          {products.map((product) => (
            <li key={product.id} className="col-span-6 md:col-span-4 lg:col-span-3 rounded-xl overflow-hidden">
              <Product product={product} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
// flex flex-wrap items-center justify-center gap-4
// w-max h-[460px]