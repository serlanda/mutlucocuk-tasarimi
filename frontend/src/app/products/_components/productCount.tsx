"use client";

import { useState } from "react";

export default function ProductCount({ product }) {
  const [quantity, setQuantity] = useState(1);

  const onChange = (e) => {
    if (e.target.value > 0) {
      setQuantity(e.target.value);
    }
  };

  const handleClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className="relative flex w-[50%] items-center justify-center bg-[#FFC8DD]">
        <div className="mb-auto mr-auto flex">
          <div
            className="flex w-[30px] items-center justify-center border hover:cursor-pointer hover:bg-[#CDB4DB] transition-colors"
            onClick={handleClick}
          >
            -
          </div>
          <label htmlFor="quantity">
            <input
              type="text"
              name="quantity"
              className="w-[50px] border bg-transparent text-center"
              id="quantity"
              value={quantity}
              onChange={onChange}
              readOnly
            />
          </label>
          <div
            className="flex w-[30px] items-center justify-center border hover:cursor-pointer hover:bg-[#CDB4DB] transition-colors"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </div>
        </div>
        <p className="absolute left-[50%] translate-x-[-50%] transition text-[25px]">
          {product.price * quantity} TL
        </p>
      </div>
    </>
  );
}
