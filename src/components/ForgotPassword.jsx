import React, { useState } from "react"
import { toast } from "react-toastify"
import { BASE_API_URL } from "../config/api"
import { ClipLoader } from "react-spinners"

const ForgotPassword = ({ closeForgotPassword, email, setEmail, goForVerification }) => {

    const [loading, setLoading] = useState(false)
    console.log(email)

    // Function to handle sending OTP
    const sendOTP = async (e) => {
        e.preventDefault()
        setLoading(true) // Start loading state

        try {
            // Make API call to send OTP
            const apiCall = fetch(`${BASE_API_URL}/api/user/send-otp?email=${email}`)

            // Create a promise that resolves after 3 seconds (timeout)
            const timeoutPromise = new Promise((resolve, reject) => {
                setTimeout(() => resolve({ status: "timeout" }), 3000)
            })

            // Use Promise.race to either resolve with the API response or the timeout
            const response = await Promise.race([apiCall, timeoutPromise])

            // Check if OTP is sent successfully or timeout occurred
            if (response.ok || response.status === "timeout") {
                console.log("OTP sent")
                goForVerification() // Proceed to OTP verification
            } else if (response.status === 404) {
                toast.error("Account not found for this email")
            } else {
                console.log(await response.json())
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false) // Stop loading state
        }
    }

    return (
        <div className="w-full md:w-[50%] px-5 md:px-8">
            <form onSubmit={sendOTP}>
                {/* Title */}
                <h1 className="text-lg font-medium text-center mb-6 dark:text-white">
                    Forgot Password?
                </h1>
                {/* Email input */}
                <input
                    className="w-full bg-[#EEEEEE] dark:bg-slate-600  dark:text-white px-3 py-2 my-1.5 outline-none text-sm"
                    type="email"
                    placeholder="Registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/* Buttons */}
                <div className="w-full flex justify-end mt-4 space-x-2">
                    {/* Back button */}
                    <button
                        className="px-4 py-2 rounded-full border-[1px] border-red-500"
                        onClick={closeForgotPassword}
                    >
                        <p className="text-sm text-red-500">Back</p>
                    </button>
                    {/* Send OTP button */}
                    <button
                        className="px-4 py-2 bg-[#379ee2] rounded-full text-white text-sm relative"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send OTP"}
                        {/* Loading spinner */}
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

export default ForgotPassword
