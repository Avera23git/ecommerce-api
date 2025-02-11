import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const res = await axios.post("/api/auth/login", { email, password });
            dispatch(loginSuccess(res.data.user));
            localStorage.setItem("token", res.data.token);
        } catch (err) {
            console.log("Login failed");
        }
    };

    return (
        <div>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}