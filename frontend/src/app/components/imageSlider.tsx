"use client";
import { useState } from "react";
import Image from "next/image";

const images = [
  "https://utfs.io/f/d8e93857-bd8a-4638-bb74-58ba9757cb22-23i2v.jpg",
  "https://utfs.io/f/789efbf1-c49b-44c7-ba17-593992cd9fde-1t0ki3.jpg",
  "https://utfs.io/f/0af329d4-86d9-4fb0-85d0-d01c851daf51-1t0ki4.jpg",
];

export default function ImageSlider() {
  const [imageIndex, setImageIndex] = useState(0);

  const showNextImage = () => {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  };

  const showPrevImage = () => {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  };

  return (
    <section className="bg-[#f8f8f4] w-screen pb-8">
    <div className="relative left-[50%] translate-x-[-50%] w-[90%] overflow-hidden mt-8 rounded-3xl">
      <Image src={images[imageIndex]} className="block items-center w-[100%] object-contain" alt="ana sayfa urun resmi" width={1000} height={500}/>
      <button
        onClick={showPrevImage}
        className="absolute bottom-0 left-0 top-0 block p-4 transition-colors hover:bg-[#3333]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={showNextImage}
        className="absolute bottom-0 right-0 top-0 block p-4 transition-colors hover:bg-[#3333]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
    </section>
  );
}
