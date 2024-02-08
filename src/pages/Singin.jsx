import React, { useEffect, useState } from "react";
import loginImage from "../assets/login-image.png";
import Signup from "../components/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/Auth/action";
import axios from "axios";
import { toast } from "react-toastify";

const Singin = () => {

    const {isAuthenticated}=useSelector(state=>state.userStore);
    const navigate=useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        isAuthenticated && navigate("/");
    },[isAuthenticated])

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
   
    

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            await dispatch(login(userData));
        } catch (error) {
            if(axios.isAxiosError(error)){
                if(error.response?.status===404){
                    toast.error("Account not found with this email")
                }else if(error.response?.status===401){
                    toast.error("Invalid Password")
                } else{
                    console.log(error.response?.data);
                    console.log(error);
                }
            }
        }
    };


    const closeSignup=()=>{
        setIsSignup(false);
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-800 ">
            <div
                className="w-full h-full md:w-[60%] md:h-auto flex items-center bg-white dark:bg-slate-700 rounded-md py-10"
                style={{ boxShadow: "0 0 35px rgba(0, 0, 0, 0.2)" }}
            >
                <div className="w-[50%] h-full items-center justify-center py-3 pl-3 hidden md:flex">
                    <img src={loginImage} alt="" className="w-full rounded-md dark:brightness-75 bg-white dark:bg-transparent" />
                </div>

                {!isSignup ? (
                    <>
                    {/* Sign form */}
                    <div className="w-full md:w-[50%] px-5 md:px-[2vw] lg:px-[4vw]">
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
                                    setUserData({ ...userData, email: e.target.value })
                                }
                            />
                            <input
                                className="w-full bg-[#EEEEEE] dark:bg-slate-600 dark:text-white px-3 py-2 my-2 outline-none "
                                type="password"
                                placeholder="Password"
                                password={userData.password}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData, password: e.target.value,
                                    })
                                }
                            />
                            <p
                                className="forget-password text-right text-sm cursor-pointer text-blue-500"
                                onClick={() => {}}
                            >
                                Forgot your password?
                            </p>
                            <div className="w-full flex justify-center mt-4">
                                <button
                                    className="px-10 py-2 bg-[#06CF9C] rounded-full text-white uppercase font-medium text-sm"
                                >
                                    {loading ? "Sign in..." : "Sign in"}
                                    {loading && (
                                        <div className="loading-overlay-btn">
                                            <ClipLoader color="#620c88" />
                                        </div>
                                    )}
                                </button>
                            </div>
                        </form>
                        <p className="text-sm text-center mt-5 dark:text-white">
                            Don't have an account?
                            <span 
                            onClick={()=>setIsSignup(true)}
                            className="text-blue-700 cursor-pointer dark:text-blue-500"> Sign up</span>
                        </p>
                    </div>
                    </>
                ) : (
                    <Signup closeSignup={closeSignup} />
                )}
            </div>
        </div>
    );
};

export default Singin;
