import { useSelector } from "react-redux";
import axios from "axios";

export default function Checkout() {
    const cart = useSelector(state => state.cart.items);

    const handleCheckout = async () => {
        const res = await axios.post("/api/checkout/create-checkout-session", { items: cart });
        window.location.href = res.data.url;
    };

    return (
        <div>
            <h2>Checkout</h2>
            <button onClick={handleCheckout}>Proceed to Payment</button>
        </div>
    );
}