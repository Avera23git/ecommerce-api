import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

export default function Cart() {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? <p>Cart is empty</p> : (
                cart.map(item => (
                    <div key={item._id}>
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => dispatch(removeFromCart(item._id))}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
}