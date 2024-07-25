"use client";

import { useState } from "react";
import axios from "axios";

export default function FormPayment() {
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
      gsmNumber: "+905350000000",
      email: "john.doe@example.com",
      identityNumber: "74300864791",
      lastLoginDate: "2015-10-05 12:43:35",
      registrationDate: "2013-04-21 15:12:09",
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

    const basketItems = [
      {
        id: "BI101",
        name: "Binocular",
        category1: "Collectibles",
        category2: "Accessories",
        itemType: "PHYSICAL",
        price: "150",
      },
    ];

    const paymentData = {
      price: "150",
      paidPrice: "150",
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
    <section className="flex flex-col ml-[500px]">
      <h2 className="text-3xl font-semibold py-2">Ödeme detayları</h2>
      <h3 className="text-lg font-semibold py-2 text-slate-800">Kart üzerindeki isim</h3>
      <input
      type="text"
      placeholder="Kart Sahibi"
      className="border border-gray-400 w-[600px] py-2 px-4 rounded-lg text-lg font-semibold text-slate-800"
      value={holderName}
      onChange={(e) => setHolderName(e.target.value)}
      required
    />
    <h3 className="text-lg font-semibold py-2 text-slate-800">Kart detayları</h3>
    <div className="grid grid-cols-3 w-[600px]">
    <input
      type="text"
      placeholder="Kart Numarası"
      className="border border-gray-400 py-2 px-4 rounded-t-lg text-lg font-semibold text-slate-800 col-span-3"
      value={cardNumber}
      onChange={(e) => setCardNumber(e.target.value)}
      required
    />
      <input
        type="text"
        placeholder="Son Kullanma Ayı"
        className=" border-l border-b border-gray-400 py-2 px-4 rounded-bl-lg text-lg font-semibold text-slate-800"
        value={expireMonth}
        onChange={(e) => setExpireMonth(e.target.value)}
        required
      />
       <input
        type="text"
        placeholder="Son Kullanma Yılı"
        className="border-x border-b border-gray-400 py-2 px-4 text-lg font-semibold text-slate-800"
        value={expireYear}
        onChange={(e) => setExpireYear(e.target.value)}
        required
      />
    <input
      type="number"
      placeholder="CVC"
      className="border-r border-b border-gray-400 py-2 px-4 rounded-br-lg text-lg font-semibold text-slate-800"
      value={cvc}
      onChange={(e) => setCvc(e.target.value)}
      required
    />
    </div>
    </section>
  );

{/* <div className="grid grid-cols-2">
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
</div> */}