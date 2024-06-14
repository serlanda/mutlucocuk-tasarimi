"use client";

import { useFormStatus } from "react-dom";
import { addProduct } from "../_actions/products";
import { UploadButton } from "~/utils/uploadthing";
import { useState } from "react";

export default function ProductForm() {
  const [image, setImage] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  return (
    <div className="border p-10">
      <h2 className="text-center text-2xl font-semibold">Ürün Ekle</h2>
      <form action={addProduct} className="space-y-8">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name">Ürün İsmi</label>
          <input
            type="text"
            id="name"
            name="name"
            className="rounded-lg px-4 py-2 text-black"
            placeholder="Ürün adını girin."
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="price">Ürün Fiyat</label>
          <input
            type="number"
            id="price"
            name="price"
            className="rounded-lg px-4 py-2 text-black"
            placeholder="Ürünün fiyatını girin."
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="description">Ürün Açıklaması</label>
          <textarea
            id="description"
            name="description"
            className="rounded-lg px-4 py-2 text-black"
            placeholder="Ürünün açıklamasını girin."
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="image">Ürün Görseli Yükle</label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={(e) => onChange(e)}
            placeholder="Ürün görseli yükleyin."
            className="rounded-lg px-4 py-2 text-black"
            required
          />
        </div>
        <div>
          {image ? (
            <>
              <img src={image} alt="product image" width={500} height={500}/>
            </>
          ) : (
            <>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImage(res[0].url)
                }}
              />
            </>
          )}
        </div>
        <SubmitButton/>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-green-600 rounded-lg px-4 py-2 text-black transition-colors hover:bg-green-700"
    >
      {pending ? "Kaydediliyor..." : "Ürünü Ekle"}
    </button>
  );
}
