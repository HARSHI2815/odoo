// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed: " + err.response?.data?.message || "Server error");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form className="bg-white p-8 rounded shadow-md w-80" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Login
                </button>
                <p className="text-sm mt-4 text-center">
                    Don't have an account?{" "}
                    <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login;
