import { allCartItems } from "../_actions/cartItem";
import FormPayment from "../_components/formPayment";

export default async function PaymentPage() {

  const cartItems = await allCartItems();
  
  const totalPrice = cartItems?.reduce(
    (acc, cartItem) => acc + cartItem.products.price * cartItem.quantity,
    0,
  );

  return (
    <main className="flex items-center justify-center">
    <FormPayment cartItems={cartItems} totalPrice={totalPrice} />
    </main>
  );
}
