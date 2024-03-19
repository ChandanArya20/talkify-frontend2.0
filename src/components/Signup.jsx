import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import CreateUserId from "./CreateUserId"

const Signup = ({ closeSignup }) => {
    // Redux state selectors
    const { isAuthenticated } = useSelector((state) => state.userStore)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Local state variables
    const [showCreateUserId, setShowCreateUserId] = useState(false)
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    // Effect to redirect to home page if user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated, navigate])

    // Function to handle button click for signup
    const handleBtnClick = (e) => {
        // Check if passwords match
        if (user.password !== confirmPassword) {
            toast.error("Passwords don't match")
            return
        }
        setShowCreateUserId(true)
    }

    // Function to close the CreateUserId component
    const closeCreateUserId = () => {
        setShowCreateUserId(false)
    }

    return (
        <>
            {/* Render CreateUserId component if showCreateUserId is true */}
            {showCreateUserId && (
                <CreateUserId
                    user={user}
                    closeCreateUserId={closeCreateUserId}
                />
            )}
            {/* Render signup form if showCreateUserId is false */}
            {!showCreateUserId && (
                <div className="w-full md:w-[50%] px-5 md:px-8">
                    <div>
                        <h1 className="font-bold text-3xl text-center mb-6 dark:text-white">
                            Sign up
                        </h1>
                        {/* Input fields for user details */}
                        <input
                            className="w-full bg-[#EEEEEE] dark:bg-slate-600 dark:text-white px-3 py-2 my-1 outline-none text-sm"
                            type="text"
                            placeholder="Name"
                            value={user.name}
                            onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                            }
                        />
                        <input
                            className="w-full bg-[#EEEEEE] dark:bg-slate-600 dark:text-white px-3 py-2 my-1 outline-none text-sm"
                            type="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                        <input
                            className="w-full bg-[#EEEEEE] dark:bg-slate-600 dark:text-white px-3 py-2 my-1 outline-none text-sm"
                            type="text"
                            placeholder="Create Password"
                            value={user.password}
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                        />
                        <input
                            className="w-full bg-[#EEEEEE] dark:bg-slate-600 dark:text-white px-3 py-2 my-1 outline-none text-sm"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {/* Signup button */}
                        <div className="w-full flex justify-center mt-4">
                            <button
                                onClick={handleBtnClick}
                                className="px-6 py-2 bg-[#06CF9C] rounded-full text-white uppercase font-medium text-sm"
                            >
                                {loading ? "Signup..." : "Sign up"}
                                {loading && (
                                    <div className="loading-overlay-btn">
                                        <ClipLoader color="#620c88" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                    {/* Link to sign in */}
                    <p className="text-sm text-center mt-5 dark:text-white">
                        Already have an account?
                        <span
                            onClick={closeSignup}
                            className="text-blue-500 cursor-pointer"
                        >
                            {" "}
                            Sign in
                        </span>
                    </p>
                </div>
            )}
        </>
    )
}

export default Signup
