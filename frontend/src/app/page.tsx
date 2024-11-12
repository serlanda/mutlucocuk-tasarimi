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
        <ul className="container mx-auto grid grid-cols-12 gap-2.5 2xl:gap-4"> 
          {products.map((product) => (
            <li key={product.id} className="col-span-6 md:col-span-4 xl:col-span-3 rounded-xl overflow-hidden">
              <Product product={product} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

// container mx-auto grid grid-cols-12 gap-2.5 md:gap-4

// col-span-6 md:col-span-4 lg:col-span-3 rounded-xl overflow-hidden

// container mx-auto grid grid-cols-12 gap-2.5 2xl:gap-4
// col-span-6 lg:col-span-4 2xl:col-span-3 rounded-xl overflow-hidden