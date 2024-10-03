import { headers } from "next/headers";
import { allCartItems, getUser } from "../_actions/cartItem";
import FormPayment from "../_components/formPayment";

export default async function PaymentPage() {

  const cartItems = await allCartItems();
  
  const totalPrice = cartItems?.reduce(
    (acc, cartItem) => acc + cartItem.products.price * cartItem.quantity,
    0,
  );
  
  const user = await getUser();

  const header = headers()
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
    
  return (
    <main className="flex items-center justify-center w-[100%] mt-5">
    <FormPayment cartItems={cartItems} totalPrice={totalPrice} user={user} ip={ip}/>
    </main>
  );
}
