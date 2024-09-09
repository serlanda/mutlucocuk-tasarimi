"use client";

import { useState } from "react";
import axios from "axios";
import FormItems from "./formItems";

export default function FormPayment({
  totalPrice,
  cartItems,
}: {
  totalPrice: number;
  cartItems: unknown[];
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [holderName, setHolderName] = useState("");
  const [response, setResponse] = useState(null);

  const handlePayment = async () => {
    const paymentCard = {
      cardHolderName: holderName,
      cardNumber: cardNumber,
      expireMonth: expireMonth,
      expireYear: expireYear,
      cvc: cvc,
      registerCard: "0",
    };

    const buyer = {
      id: "BY789",
      name: "Mehmet Efe",
      surname: "Ümit",
      // gsmNumber: "+905350000000",
      email: "john.doe@example.com",
      identityNumber: "74300864791",
      // lastLoginDate: "2015-10-05 12:43:35",
      // registrationDate: "2013-04-21 15:12:09",
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732",
    };

    const shippingAddress = {
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34742",
    };

    const billingAddress = {
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34742",
    };

    const basketItems = cartItems.map((cartItem) => ({
      id: `${cartItem.id}`,
      name: `${cartItem.products.name}`,
      category1: "MASA",
      category2: `COCUK MASASI ADET : ${cartItem.quantity}`,
      itemType: "PHYSICAL",
      price: `${cartItem.products.price * cartItem.quantity}`,
    }));

    const paymentData = {
      price: `${totalPrice}`,
      paidPrice: `${totalPrice}`,
      currency: "TRY",
      basketId: "B67832",
      paymentCard: paymentCard,
      buyer: buyer,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      basketItems: basketItems,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/payment",
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setResponse(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section className="flex flex-col justify-start items-center w-[50%] h-screen">
        <h2 className="py-2 text-center text-3xl font-semibold">
          Ödeme detayları
        </h2>
        <h3 className="py-2 text-lg font-semibold text-slate-800">
          Kart üzerindeki isim
        </h3>
        <input
          type="text"
          placeholder="Kart Sahibi"
          className="w-[600px] rounded-lg border border-gray-400 px-4 py-2 text-lg font-semibold text-slate-800"
          value={holderName}
          onChange={(e) => setHolderName(e.target.value)}
          required
        />
        <h3 className="py-2 text-lg font-semibold text-slate-800">
          Kart detayları
        </h3>
        <div className="grid w-[600px] grid-cols-3">
          <input
            type="text"
            placeholder="Kart Numarası"
            className="col-span-3 rounded-t-lg border border-gray-400 px-4 py-2 text-lg font-semibold text-slate-800"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Son Kullanma Ayı"
            className=" rounded-bl-lg border-b border-l border-gray-400 px-4 py-2 text-lg font-semibold text-slate-800"
            value={expireMonth}
            onChange={(e) => setExpireMonth(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Son Kullanma Yılı"
            className="border-x border-b border-gray-400 px-4 py-2 text-lg font-semibold text-slate-800"
            value={expireYear}
            onChange={(e) => setExpireYear(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="CVC"
            className="rounded-br-lg border-b border-r border-gray-400 px-4 py-2 text-lg font-semibold text-slate-800"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            required
          />
          <button
            className="col-span-3 my-4 rounded-lg bg-[#A2D2FF] px-4 py-2 text-lg text-white hover:bg-[#BDE0FE] transition-all"
            onClick={handlePayment}
          >
            Siparişi Tamamla
          </button>
        </div>
      </section>
      <FormItems totalPrice={totalPrice} cartItems={cartItems} />
    </>
  );
}

{
  /* <div className="grid grid-cols-2">
<div className="flex flex-col items-center justify-center gap-4 bg-gray-500">
<h1 className="text-3xl">Ödeme Formu</h1>
<div className="flex h-64 w-96 flex-col gap-3">
<input
type="text"
      placeholder="Kart Sahibi"
      value={holderName}
      onChange={(e) => setHolderName(e.target.value)}
    />
    <input
      type="text"
      placeholder="Kart Numarası"
      value={cardNumber}
      onChange={(e) => setCardNumber(e.target.value)}
    />
    <div className="flex flex-row gap-3">
      <input
        type="text"
        placeholder="Son Kullanma Ayı"
        value={expireMonth}
        onChange={(e) => setExpireMonth(e.target.value)}
      />
      <input
        type="text"
        placeholder="Son Kullanma Yılı"
        value={expireYear}
        onChange={(e) => setExpireYear(e.target.value)}
      />
    </div>
    <input
      type="text"
      placeholder="CVC"
      value={cvc}
      onChange={(e) => setCvc(e.target.value)}
    />
    <button onClick={handlePayment}>Ödeme Yap</button>
  </div>
</div>
<div className="h-64">
  {response && (
    <div className="rounded-lg border-2 bg-slate-200 p-10">
      <h2>Sonuç:</h2>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  )}
</div>
</div> */
}
