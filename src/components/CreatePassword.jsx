import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../config/api";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginAfterPasswordUpdate } from "../Redux/Auth/action";

const CreatePassword = ({ email }) => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function to handle new password creation
    const generateNewPassword = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            // Make API request to update password
            const response = await axios.post(
                `${BASE_API_URL}/api/user/otp-verified/update-password`,
                {
                    email: email,
                    newPassword: password,
                },
                { withCredentials: true }
            );
            console.log(response.data);
            dispatch(loginAfterPasswordUpdate(response.data));
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                // Handle specific Axios error cases if needed
                if (error.response.status === 404) {
                    toast.error("Account not found for " + email);
                } else {
                    toast.error("Something went wrong...");
                }
            }
        } finally {
            // Stop loading state
            setLoading(false);
        }
    };

    return (
        <div className="w-full md:w-[50%] px-5 md:px-8">
            <form onSubmit={generateNewPassword}>
                <h1 className="text-lg font-medium text-center mb-6 dark:text-white">
                    Create Password
                </h1>
                <input
                    className="w-full bg-[#EEEEEE] dark:bg-slate-600  dark:text-white px-3 py-2 my-1.5 outline-none text-sm"
                    type="text"
                    placeholder="Create new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    className="w-full bg-[#EEEEEE] dark:bg-slate-600  dark:text-white px-3 py-2 my-1.5 outline-none text-sm"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="w-full flex justify-end mt-4 space-x-2">
                    <button
                        className="px-4 py-2 bg-[#379ee2] rounded-full text-white text-sm relative"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                        {loading && (
                            <div className="loading-overlay-btn rounded-full">
                                <ClipLoader color="#620c88" size={25} />
                            </div>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePassword;
