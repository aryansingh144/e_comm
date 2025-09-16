import React, { useState, useContext } from 'react';
import Logo from "../assets/logo.svg";
import { useNavigate } from 'react-router-dom';
import google from '../assets/google.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { AuthDataContext } from '../context/AuthContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { UserDataContext } from '../context/UserContext';
import Loading from '../component/Loading';
import { toast } from 'react-toastify';

function Login() {
    let [show, setShow] = useState(false);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let { serverUrl } = useContext(authDataContext)
    let { getCurrentUser } = useContext(userDataContext)
    let [loading, setLoading] = useState(false)

    let navigate = useNavigate();

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            let result = await axios.post(serverUrl + '/api/auth/login', {
                email, password
            }, { withCredentials: true })
            setLoading(false)
            getCurrentUser()
            navigate("/")
            toast.success("Login Successful 🎉")
        } catch (error) {
            setLoading(false)
            toast.error("Login Failed ❌")
        }
    }

    const googlelogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let user = response.user
            let name = user.displayName;
            let email = user.email

            await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true })
            getCurrentUser()
            navigate("/")
            toast.success("Google Login Successful ")
        } catch (error) {
            toast.error("Google Login Failed ")
        }
    }

    return (
        <div
            className="w-screen h-screen flex flex-col items-center justify-center text-white relative overflow-hidden"
        >

            <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black animate-gradient"></div>


            <div className="absolute top-6 left-8 flex items-center gap-3 cursor-pointer z-10" onClick={() => navigate("/")}>
                <img className="w-[140px]" src={Logo} alt="logo" />
            </div>


            <div
                className="max-w-[550px] w-[90%] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-10 flex flex-col items-center z-10"
            >
                <h1 className="text-3xl font-bold tracking-wide mb-2">Welcome Back</h1>
                <p className="text-gray-400 mb-6">Login to continue your journey</p>

                {/* Google Button */}
                <div
                    className="w-full h-[55px] flex items-center justify-center gap-3 border border-white/20 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer transition-all text-[16px] font-medium"
                    onClick={googlelogin}
                >
                    <img src={google} alt="google" className="w-5" />
                    Continue with Google
                </div>


                <div className="w-full flex items-center my-6">
                    <div className="flex-1 h-px bg-white/20"></div>
                    <span className="mx-3 text-gray-400 text-sm">or</span>
                    <div className="flex-1 h-px bg-white/20"></div>
                </div>


                <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
                    <div className="relative">
                        <input
                            type="email"
                            className="w-full h-[55px] px-4 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:border-white/40 focus:bg-white/20 transition-all"
                            placeholder="Email Address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={show ? "text" : "password"}
                            className="w-full h-[55px] px-4 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:border-white/40 focus:bg-white/20 transition-all"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {show ? (
                            <IoEye
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer text-gray-300"
                                onClick={() => setShow(prev => !prev)}
                            />
                        ) : (
                            <IoEyeOutline
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer text-gray-300"
                                onClick={() => setShow(prev => !prev)}
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full h-[55px] mt-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-all flex items-center justify-center text-lg"
                    >
                        {loading ? <Loading /> : "Login"}
                    </button>
                </form>

                {/* Signup */}
                <p className="mt-6 text-gray-400 text-sm">
                    Don’t have an account?{" "}
                    <span
                        className="text-white font-semibold underline cursor-pointer hover:text-gray-300"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </span>
                </p>
            </div>

            <style>
                {`
                .animate-gradient {
                    background-size: 300% 300%;
                    animation: gradientMove 10s ease infinite;
                }
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                `}
            </style>
        </div>
    );
}

export default Login;
