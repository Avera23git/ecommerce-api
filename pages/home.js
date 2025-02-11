import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(/api/products?search=$:{search});
            setProducts(res.data);
        };
        fetchProducts();
    }, [search]);

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search products..." 
                onChange={(e) => setSearch(e.target.value)} 
            />
            <div>
                {products.map((product) => (
                    <div key={product._id}>
                        <img src={product.image} alt={product.name} width="100" />
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}