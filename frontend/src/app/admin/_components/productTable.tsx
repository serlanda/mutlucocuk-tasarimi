import { db } from "~/server/db";
import DeleteButton from "./deleteButton";
import Image from "next/image";

export default async function AdminProductTable() {
  const products = await db.query.products.findMany();

  return (
    <div className="max-h-[655px] overflow-y-scroll">
      <table className="w-full">
        <thead className="border-b sticky top-0 bg-black h-10">
          <tr>
          <th>Ürün İsmi</th>
          <th>Ürün Fiyatı</th>
          <th>Ürün Görseli</th>
          <th>Ürünü Kaldır</th>
          </tr>
        </thead>
        {products.map((product) => (
          <tbody key={product.id} className="border-b bg-black">
            <tr>
            <td className="text-center">{product.name}</td>
            <td className="text-center">{product.price} TL</td>
            <td className="flex justify-center items-center">
              <Image src={product.image} alt={product.name} width={100} height={50}/>
            </td>
            <td className="text-center">
            <DeleteButton id={product.id}>Kaldir</DeleteButton>
            </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
