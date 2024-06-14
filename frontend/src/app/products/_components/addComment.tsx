"use client";
import { useFormStatus } from "react-dom";
import { addComment } from "../_actions/comment";
import StarRate from "./starRate";

export default function AddComment({ product }) {
  return (
    <form action={addComment}>
      <div className="relative flex flex-col gap-1">
        <label htmlFor="author" className="font-semibold">
          İsminiz
        </label>
        <input
          type="text"
          name="author"
          id="author"
          maxLength={256}
          className="border-b border-[#000] bg-transparent py-0.5 placeholder:text-gray-500 focus:outline-none"
          placeholder="İsminiz girin. (herkese açık)"
          required
        />
        <label htmlFor="header" className="font-semibold">
          Yorum Başlığı
        </label>
        <input
          type="text"
          name="header"
          id="header"
          maxLength={256}
          className="border-b border-[#000] bg-transparent py-0.5 placeholder:text-gray-500 focus:outline-none"
          placeholder="Yorumunuza bir başlık verin."
          required
        />
        <label htmlFor="content" className="font-semibold">
          Yorumunuz
        </label>
        <textarea
          name="content"
          id="content"
          maxLength={512}
          className="resize-none border-b border-[#000] bg-transparent py-0.5 placeholder:text-gray-500 focus:outline-none"
          placeholder="Nelerden hoşlandınız veya neleri beğenmediniz? bu ürünü ne için kullandınız?"
          required
        />
        <StarRate />
        <input
          type="text"
          name="productId"
          id="productId"
          readOnly
          hidden
          value={product}
          required
        />
        <CommentSubmitButton />
      </div>
    </form>
  );
}

function CommentSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="absolute -bottom-0.5 right-0 rounded-full border border-black px-3 py-0.5 text-lg font-semibold text-black transition-colors hover:bg-[#FFAFCC] hover:text-white"
    >
      {pending ? "Gönderiliyor..." : "Yorumu Gönder"}
    </button>
  );
}
