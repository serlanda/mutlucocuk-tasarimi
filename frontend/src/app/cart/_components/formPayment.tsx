"use client";

import { useState } from "react";
import axios from "axios";
import FormItems from "./formItems";

export default function FormPayment({
  totalPrice,
  cartItems,
  user,
  ip,
}: {
  totalPrice: number;
  cartItems: unknown[];
  user: unknown;
  ip: string;
}) {

  const [cardNumber, setCardNumber] = useState("");
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [holderName, setHolderName] = useState("");
  const [response, setResponse] = useState(null);

  const [name, setName] = useState(`${user.firstName}`);
  const [surname, setSurname] = useState(`${user.lastName}`);
  const [identityNumber, setIdentityNumber] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [gsmNumber, setGsmNumber] = useState("");

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
      id: `${user.id}`,
      name: name,
      surname: surname,
      gsmNumber: gsmNumber,
      email: `${user.email}`,
      identityNumber: identityNumber,
      // lastLoginDate: "2015-10-05 12:43:35",
      // registrationDate: "2013-04-21 15:12:09",
      registrationAddress: address,
      ip: ip,
      city: city,
      country: "Turkey",
      zipCode: zipCode,
    };

    const shippingAddress = {
      contactName: name,
      city: city,
      country: "Turkey",
      address: `${address} ${address2} ${district}`,
      zipCode: zipCode,
    };

    const billingAddress = {
      contactName: name,
      city: city,
      country: "Turkey",
      address: `${address} ${address2} ${district}`,
      zipCode: zipCode,
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
      basketId: "sa",
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
      <section className="flex w-[50%] flex-col items-center justify-center">
        <h2 className="py-2 text-center text-3xl font-semibold">Adres</h2>
        <div className="grid w-[600px] grid-cols-4">
          <input
            type="text"
            placeholder="Ad"
            className="col-span-2 m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Soyadı"
            className="col-span-2 m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Adres"
            className="col-span-4 m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apartman, daire, vb. (isteğe bağlı)"
            className="col-span-2 m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
          <input
            type="text"
            placeholder="Posta Kodu (isteğe bağlı)"
            className="col-span-2 m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="T.C. Kimlik Numarası"
            className="col-span-4 m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={identityNumber}
            onChange={(e) => setIdentityNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Şehir"
            className="col-span-2 m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="İlçe"
            className="col-span-2 m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Telefon"
            className="col-span-4 m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={gsmNumber}
            onChange={(e) => setGsmNumber(e.target.value)}
            required
          />
        </div>
        <h2 className="py-2 text-center text-3xl font-semibold">Ödeme</h2>
        <div className="grid w-[600px] grid-cols-3">
          <input
            type="text"
            placeholder="Kart Üzerindeki İsim"
            className="col-span-3 m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Kart Numarası"
            className="col-span-3 m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Son Kullanma Ayı"
            className="m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={expireMonth}
            onChange={(e) => setExpireMonth(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Son Kullanma Yılı"
            className="m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={expireYear}
            onChange={(e) => setExpireYear(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="CVC"
            className="m-2 rounded-lg border border-gray-400 px-4 py-2 font-semibold text-slate-800"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            required
          />
          <button
            className="col-span-3 my-4 rounded-lg bg-[#A2D2FF] px-4 py-2 text-lg text-white transition-all hover:bg-[#BDE0FE]"
            onClick={handlePayment}
          >
            Şimdi Öde
          </button>
        </div>
      </section>
      <FormItems totalPrice={totalPrice} cartItems={cartItems} user={user} />
    </>
  );
}
