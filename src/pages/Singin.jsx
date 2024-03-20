import React, { useEffect, useState } from "react"
import loginImage from "../assets/login-image.png"
import Signup from "../components/Signup"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../Redux/Auth/action"
import axios from "axios"
import { toast } from "react-toastify"
import ForgotPassword from "../components/ForgotPassword"
import OTPVerification from "../components/OTPVerification"
import CreatePassword from "../components/CreatePassword"

const Singin = () => {
    // Redux state selectors
    const { isAuthenticated } = useSelector((state) => state.userStore)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Local state variables
    const [userData, setUserData] = useState({
        email: "",  
        password: "",              
    })

    // Giving a demo login data for testing purpose
    useEffect(()=>{
        setUserData({email:"chandank1848@gmail.com", password:"20022002"}) 

        const setTimeoutId = setTimeout(() => {
            toast.info("Just click on 'SIGN IN' for testing purpose")
        }, 2000);

        return () => clearTimeout(setTimeoutId)
        
    },[])

    const [loading, setLoading] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const [showForgetPassword, setShowForgetPassword] = useState(false)
    const [showOTPVerification, setShowOTPVerification] = useState(false)
    const [showCreatePassword, setShowCreatePassword] = useState(false)

    // Redirect to home if already authenticated
    useEffect(() => {
        isAuthenticated && navigate("/")
    }, [isAuthenticated])

    // Update email in local state
    const setEmail = (email) => {
        setUserData({ ...userData, email: email })
    }

    // Handle login submission
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await dispatch(login(userData))
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    toast.error("Account not found with this email")
                } else if (error.response?.status === 401) {
                    toast.error("Invalid Password")
                } else {
                    console.log(error.response?.data)
                    console.log(error)
                }
            }
        }
    }

    // Close signup modal
    const closeSignup = () => {
        setShowSignup(false)
    }

    // Close forgot password modal
    const closeForgotPassword = () => {
        setShowForgetPassword(false)
    }

    // Go to OTP verification
    const goForVerification = () => {
        setShowOTPVerification(true)
        setShowForgetPassword(false)
    }

    // Go to create password after OTP verification
    const goForCreatePassword = () => {
        setShowOTPVerification(false)
        setShowCreatePassword(true)
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-800 ">
            <div
                className="w-full h-full md:w-[650px] lg:w-[700px] md:h-auto flex items-center bg-white dark:bg-slate-700 rounded-md py-10"
                style={{ boxShadow: "0 0 35px rgba(0, 0, 0, 0.2)" }}
            >
                {/* Left Section - Image */}
                <div className="w-[50%] h-full items-center justify-center py-3 pl-3 hidden md:flex">
                    <img
                        src={loginImage}
                        alt=""
                        className="w-full rounded-md dark:brightness-75 bg-white dark:bg-transparent"
                    />
                </div>

                {/* Right Section - Signin form, Signup, Forgot Password, OTP Verification, Create Password */}
                {showSignup && <Signup closeSignup={closeSignup} />}
                {showForgetPassword && (
                    <ForgotPassword
                        closeForgotPassword={closeForgotPassword}
                        email={userData.email}
                        setEmail={setEmail}
                        goForVerification={goForVerification}
                    />
                )}
                {showOTPVerification && (
                    <OTPVerification
                        goForCreatePassword={goForCreatePassword}
                        email={userData.email}
                        goForVerification={goForVerification}
                    />
                )}
                {showCreatePassword && (
                    <CreatePassword email={userData.email} />
                )}

                {!showSignup &&
                    !showForgetPassword &&
                    !showOTPVerification &&
                    !showCreatePassword && (
                        // Signin form
                        <div className="w-full md:w-[50%] px-5 md:px-8">
                            <form onSubmit={handleLogin}>
                                <h1 className="font-bold text-3xl text-center mb-8 dark:text-white">
                                    Sign in
                                </h1>
                                <input
                                    className="w-full bg-[#EEEEEE] dark:bg-slate-600  dark:text-white px-3 py-2 my-3 outline-none"
                                    type="email"
                                    placeholder="Email"
                                    value={userData.email}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    className="w-full bg-[#EEEEEE] dark:bg-slate-600 dark:text-white px-3 py-2 my-2 outline-none "
                                    type="password"
                                    placeholder="Password"
                                    value={userData.password}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                                <p
                                    className="forget-password text-right text-sm cursor-pointer text-[#52aeec]"
                                    onClick={() => {
                                        setShowForgetPassword(true)
                                        setShowSignup(false)
                                    }}
                                >
                                    Forgot your password?
                                </p>
                                <div className="w-full flex justify-center mt-4">
                                    <button className="px-10 py-2 bg-[#06CF9C] rounded-full text-white uppercase font-medium text-sm">
                                        {loading ? "Sign in..." : "Sign in"}
                                        {loading && (
                                            <div className="loading-overlay-btn">
                                                <ClipLoader color="#620c88" />
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </form>
                            <p className="text-sm text-center mt-5 dark:text-gray-200">
                                Don't have an account?
                                <span
                                    onClick={() => setShowSignup(true)}
                                    className="text-[#52aeec] cursor-pointer dark:text-[#52aeec]"
                                >
                                    {" "}
                                    Sign up
                                </span>
                            </p>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Singin
