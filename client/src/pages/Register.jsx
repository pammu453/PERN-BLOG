import React, { Children, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/register', registerData)
            navigate('/login')
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div className="flex justify-center items-center my-20  bg-green-50">
            <div className="w-full sm:w-80 bg-green-100 shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h1>
                <form onSubmit={loginHandler} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        required
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        placeholder="Username"
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                        type="email"
                        required
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        placeholder="Email"
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                        type="password"
                        required
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        placeholder="Password"
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-500 transition-colors"
                    >
                        Register
                    </button>
                </form>
                {error && <p className="text-red-500 text-center mt-2 text-sm">{error}</p>}
                <p className="text-center mt-4 text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-green-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
