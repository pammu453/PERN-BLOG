import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/authContext';

const Login = () => {
    const [loginData, setloginData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const {login } = useContext(AuthContext)

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', loginData)
            login(res.data.required_data)
            navigate('/')
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div className="flex justify-center items-center my-20 bg-green-50">
            <div className="w-full sm:w-80 bg-green-100 shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
                <form onSubmit={loginHandler} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        value={loginData.username}
                        onChange={(e) => setloginData({ ...loginData, username: e.target.value })}
                        placeholder="Username"
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                    />
                    <input
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setloginData({ ...loginData, password: e.target.value })}
                        placeholder="Password"
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-500 transition-colors"
                    >
                        Login
                    </button>
                </form>
                {error && <p className="text-red-500 text-center mt-2 text-xs">{error}</p>}
                <p className="text-center mt-4 text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="text-green-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;


