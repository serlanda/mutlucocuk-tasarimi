import Image from "next/image";

export default function FormItems({
  totalPrice,
  cartItems,
  user,
}: {
  totalPrice: number;
  cartItems: unknown[];
  user: unknown;
}) {

  return (
    <section className="relative flex justify-center w-[50%] flex-col bg-[#F7F7F9] p-10 rounded-md border-2">
      {cartItems.map((cartItem) => (
        <div key={cartItem.id} className="flex flex-row gap-4 p-2">
          <span className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-[#000] text-[#fff]">
            {cartItem.quantity}
          </span>
          <Image
            src={cartItem.products.image}
            alt={cartItem.products.name}
            width={150}
            height={150}
            className="object-contain rounded-xl"
          />
          <h3 className="text-lg  font-semibold">{cartItem.products.name}</h3>
          <p className="ml-auto text-lg">
            ₺ {cartItem.products.price * cartItem.quantity}
          </p>
        </div>
      ))}
      <hr className="my-2"/>
      <div className="py-2">
      <div className="flex">
        <p>Ara Toplam</p>
        <span className="ml-auto text-lg">₺ {totalPrice}</span>
      </div>
      <div className="flex">
        <p>Teslimat / Kargo</p>
        <span className="ml-auto text-lg">₺ 0</span>
      </div>
      </div>
      <hr className="my-2"/>
      <div className="flex py-2">
        <h2 className="text-2xl font-semibold">Toplam</h2>
        <span className="ml-auto text-xl font-semibold">₺ {totalPrice}</span>
      </div>
      <div className="flex flex-col justify-center items-end">
        <p className="text-lg font-semibold">{user.firstName} {user.lastName}</p>
        <p className="text-sm">{user.email}</p>
      </div>
    </section>
  );
}
