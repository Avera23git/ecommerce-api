import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductCard({ product }) {
    const dispatch = useDispatch();

    return (
        <div>
            <img src={product.image} alt={product.name} width="100" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </div>
    );
}