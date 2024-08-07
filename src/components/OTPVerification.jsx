import React, { useState } from "react"
import { toast } from "react-toastify"
import { BASE_API_URL } from "../config/api"
import { ClipLoader } from "react-spinners"
import axios from "axios"
import { useDispatch } from "react-redux"
import { updateJwtToken } from "../Redux/Auth/action"

const OTPVerification = ({ email, goForCreatePassword }) => {
    // State variables
    const [loading, setLoading] = useState(false)
    const [OTP, setOTP] = useState("")
    const [showResendOTP, setShowResendOTP] = useState(false)
    const dispatch = useDispatch()

    // useEffect to show resend OTP option after 15 seconds
    useState(() => {
        const id = setTimeout(() => {
            setShowResendOTP(true)
        }, 15000)

        return () => clearTimeout(id)
    }, [email])

    // Function to handle OTP verification
    const verifyOTP = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await axios.post(`${BASE_API_URL}/api/users/otp/verify`, { email, OTP })

            // If OTP is verified
            dispatch(updateJwtToken(response.data.token))
            goForCreatePassword()
        } catch (error) {
            console.log(error)

            if (axios.isAxiosError(error)) {
                // Handle specific Axios error cases if needed
                if (error.response.data.errorCode === 1003) {
                    toast.error("Account not found for this " + email)
                } else if (error.response.data.errorCode === 1013) {
                    toast.error("OTP verification failed...")
                } else {
                    toast.error("Something went wrong...")
                }
            }
        } finally {
            // Stop loading state
            setLoading(false)
        }
    }

    // Function to handle sending OTP
    const sendOTP = async (e) => {
        e.preventDefault()
        try {
            toast.info("OTP sent to "+email)
            const response = await axios.post(`${BASE_API_URL}/api/users/otp/send?email=${email}`,{})
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="w-full md:w-[50%] px-5 md:px-8">
            <form onSubmit={verifyOTP}>
                <h1 className="text-lg font-medium text-center mb-1 dark:text-white">
                    Enter OTP
                </h1>
                <p className="text-gray-500 dark:text-gray-300 text-sm text-center mb-6">
                    <span>OTP has been sent to {email}</span>
                </p>
                <input
                    className="w-full bg-[#EEEEEE] dark:bg-slate-600  dark:text-white px-3 py-2 my-1.5 outline-none text-sm"
                    type="text"
                    placeholder="Enter OTP"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                />

                <div className="w-full flex justify-end mt-4 space-x-2">
                    {showResendOTP && (
                        <button
                            className="px-4 py-2 rounded-full border-[1px] border-green-400"
                            onClick={sendOTP}
                        >
                            <p className="text-sm text-green-400">Resend OTP</p>
                        </button>
                    )}
                    <button
                        className="px-4 py-2 bg-[#379ee2] rounded-full text-white text-sm relative"
                        onClick={(e) => verifyOTP(e)}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                        {loading && (
                            <div className="loading-overlay-btn rounded-full">
                                <ClipLoader color="#620c88" size={25} />
                            </div>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default OTPVerification
