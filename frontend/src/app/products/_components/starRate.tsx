"use client";
import { SetStateAction, useState } from "react";

export default function StarRate() {
  const [rating, setRating] = useState<string>("");
  const [hover, setHover] = useState<string>("");

  const handleClick = (currentRate) => {
    setRating(currentRate);
  };

  return (
      <div className="flex items-center gap-2 mt-1">
      {[...Array(5)].map((star, index) => {
          const currentRate = index + 1;
        return (
          <div key={index}>
            <label htmlFor={star}>
              <input
                type="radio"
                name="star"
                id="star"
                className="sr-only"
                key={currentRate}
                value={rating}
                onClick={() => handleClick(currentRate)}
                required
                />
              <svg
                onMouseEnter={() => setHover(currentRate)}
                onMouseLeave={() => setHover("")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-8 transition-colors ${ currentRate <= (hover || rating) && "fill-[#ffbe0b]"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              </label>
          </div>
        );
      })}
    </div>
  );
}
