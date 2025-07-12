// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
            });
            alert("Registered successfully! You can now log in.");
            navigate("/");
        } catch (err) {
            alert("Registration failed: " + err.response?.data?.message || "Server error");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form className="bg-white p-8 rounded shadow-md w-80" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                    Register
                </button>
                <p className="text-sm mt-4 text-center">
                    Already have an account?{" "}
                    <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Register;
