import Image from "next/image";
import AddToCart from "~/app/products/_components/addToCart";
import { db } from "~/server/db";
import { getProduct } from "~/server/queries";
import Comment from "../_components/comment";
import AddComment from "../_components/addComment";
import { auth } from "@clerk/nextjs/server";

export default async function ProductPage({
  params: { id: productId },
}: {
  params: { id: string };
}) {
  const product = await getProduct(productId);

  const comments = await db.query.comments.findMany({
    where: (model, { eq }) => eq(model.productId, productId),
  });

  const user = auth();
  const userComment = comments.find(
    (comment) => comment.userId === user.userId,
  );

  return (
    <>
      <main className="flex items-center justify-evenly gap-10 bg-[#f8f8f4] p-6 lg:flex-col xl:flex-row">
        <section className="m-6 flex flex-col gap-2 rounded-xl">
          <Image
            src={product.image}
            alt={product.name}
            className="rounded-2xl object-contain"
            width={800}
            height={800}
          />
          <div className="flex gap-4">
          <Image
            src={product.image}
            alt={product.name}
            className="scale-x-[-1] transform rounded-lg object-contain hover:opacity-70 transition-colors"
            width={100}
            height={100}
          />
          <Image
            src={product.image}
            alt={product.name}
            className="transform rounded-lg object-contain hover:opacity-70 transition-colors"
            width={100}
            height={100}
          />
          <Image
            src={product.image}
            alt={product.name}
            className="scale-x-[-1] transform rounded-lg object-contain hover:opacity-70 transition-colors"
            width={100}
            height={100}
          />
          </div>
        </section>
        <section className="m-6 flex w-[900px] flex-col items-center">
          <div className="overflow-hidden text-left lg:h-[500px] xl:h-[700px]">
            <span className="w-fit rounded-md border border-[#FFAFCC] px-1.5 py-0.5 text-[14px] text-[#FFAFCC]">
              MUTLU ÇOCUK
            </span>
            <h1 className="mt-2 text-[30px] font-semibold">{product.name}</h1>
            <p className="mt-8 text-[24px]">{product.description}</p>
          </div>
          <AddToCart product={product} />
        </section>
      </main>
      <div className="px-6">
        <h2 className="my-6 text-xl font-semibold">Değerlendirmeler</h2>
        <div className="flex flex-wrap gap-4">
          {!userComment && (
            <div className="h-[300px] w-[540px] rounded-xl border bg-[#BDE0FE] px-4 py-2 shadow-lg">
              <h3 className="mb-2 text-center text-xl font-semibold">
                Bir Değerlendirme Yazın
              </h3>
              <AddComment product={productId} />
            </div>
          )}
          {comments.map((comment) => (
            <section key={comment.id} className="w-max">
              <Comment comment={comment} user={user} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
