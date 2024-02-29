import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../Redux/Auth/action";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateUserId from "./CreateUserId";

const Signup = ({ closeSignup }) => {

    const {isAuthenticated}=useSelector(state=>state.userStore);
    useEffect(()=>{
        isAuthenticated && navigate("/");
    },[isAuthenticated])

    const [showCreateUserId, setShowCreateUserId]=useState(false);
    const navigate=useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch=useDispatch();
    
    const handleBtnClick = (e) => {
        
        if(user.password!==confirmPassword){
            toast.error("Password don't match")
            return
        }
        setShowCreateUserId(true);
    };

    const closeCreateUserId=()=>{
        setShowCreateUserId(false);
    }

    return (
        <>
        {showCreateUserId && <CreateUserId  user={user} closeCreateUserId={closeCreateUserId}/>}
        { !showCreateUserId &&

        <div className="w-full md:w-[50%] px-5 md:px-8">
            <div>
                <h1 className="font-bold text-3xl text-center mb-6 dark:text-white">Sign up</h1>
                <input
                    className="w-full bg-[#EEEEEE] dark:bg-slate-600  dark:text-white px-3 py-2 my-1 outline-none text-sm"
                    type="text"
                    placeholder="Name"
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value })}
                />
                <input
                    className="w-full bg-[#EEEEEE] dark:bg-slate-600  dark:text-white px-3 py-2 my-1 outline-none text-sm"
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                {/* <input
                    className="w-full bg-[#EEEEEE] dark:bg-slate-600  dark:text-white px-3 py-2 my-1.5 outline-none text-sm"
                    type="tel"
                    placeholder="phone (Optional)"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                /> */}
                <input
                    className="w-full bg-[#EEEEEE] dark:bg-slate-600  dark:text-white px-3 py-2 my-1 outline-none text-sm"
                    type="text"
                    placeholder="Create Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <input
                    className="w-full bg-[#EEEEEE] dark:bg-slate-600  dark:text-white px-3 py-2 my-1 outline-none text-sm"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="w-full flex justify-center mt-4">
                    <button onClick={handleBtnClick} className="px-6 py-2 bg-[#06CF9C] rounded-full text-white uppercase font-medium text-sm">
                        {loading ? "Signup..." : "Sign up"}
                        {loading && (
                            <div className="loading-overlay-btn">
                                <ClipLoader color="#620c88" />
                            </div>
                        )}
                    </button>
                </div>
            </div>
            <p className="text-sm text-center mt-5 dark:text-white">
                Already have account?
                <span
                    onClick={closeSignup}
                    className="text-blue-500 cursor-pointer">{" "}Sign in 
                </span>
            </p>
        </div>
        }
        </>
    );
};

export default Signup;
