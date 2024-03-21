import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { BASE_API_URL } from "../config/api"
import { ClipLoader } from "react-spinners"
import axios from "axios"
import { useDispatch } from "react-redux"
import { register } from "../Redux/Auth/action"
import DefaultUser from "../assets/default-user.png"

const CreateUserId = ({ user, closeCreateUserId }) => {

    const [profileLoading, setProfileLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userid, setUserId] = useState("")
    const [useridAvailable, setUseridAvailable] = useState(false)
    const [profileImage, setProfileImage] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Handle setting input (userid)
    const handleSetUserId = (userid) => {
        // Remove whitespaces from user id
        const id = userid.replace(/\s/g, "")
        setUserId(id)
    }

    useEffect(() => {
        const getUserData = async () => {
            if (userid.length > 0) {
                setLoading(true)
            } else {
                return
            }
            try {
                const response = await axios.get(`${BASE_API_URL}/api/user/search-userid?query=` + userid)
                console.log(response.data)
                setUseridAvailable(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
    }, [userid])

    useEffect(() => {
        // Check if user id is being typed
        if (userid.length > 0) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [userid])

    // Function to handle signup
    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            // Dispatch action to register user
            await dispatch(register({ ...user, userid, profileImage }))
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                if(!error.response){
                    toast.error("Server is down, try again later...")
                } else if (error.response?.status === 409) {
                    toast.error(error.response.data)
                } else {
                    console.log(error.response?.data)
                }
            }
        }
    }

    // Function to handle profile image change
    const handleProfileImageChange = async (imageFile) => {
        const data = new FormData()
        data.append("file", imageFile)
        data.append("upload_preset", "talkify-images")
        data.append("cloud_name", "ddj5asxve")

        setProfileLoading(true)
        const response = await axios.post("https://api.cloudinary.com/v1_1/ddj5asxve/image/upload",
            data
        )
        const imageURL = response.data.url
        setProfileImage(imageURL)
        console.log(imageURL)
        setProfileLoading(false)
    }

    // Function to close create user id form
    const handleCloseCreateUserId = (e) => {
        e.preventDefault()
        closeCreateUserId()
    }

    return (
        <div className="w-full md:w-[50%] px-5 md:px-8">
            <form onSubmit={handleSignup}>
                {/* Profile image */}
                <div className=" flex flex-col items-center justify-center relative ">
                    {profileLoading && (
                        <ClipLoader color="#2d0442" className="absolute" />
                    )}
                    <div className="w-32 h-32 rounded-full bg-gray-500 cursor-pointer">
                        <label htmlFor="imageInput">
                            <img
                                className=" w-full h-full rounded-full object-cover cursor-pointer"
                                src={profileImage || DefaultUser}
                                alt=""
                            />
                        </label>
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            className=" w-full h-full rounded-full object-cover hidden"
                            onChange={(e) =>
                                handleProfileImageChange(e.target.files[0])
                            }
                        />
                    </div>
                </div>
                {/* User ID input */}
                <h1 className="text-base font-medium text-center mt-4 mb-2 dark:text-gray-200">
                    Make a User id
                </h1>
                <div className="flex bg-[#EEEEEE] dark:bg-slate-600 dark:text-white text-sm px-1 my-1">
                    <input
                        className="w-full bg-transparent outline-none px-2 py-2"
                        type="text"
                        placeholder="Create user id"
                        value={userid}
                        onChange={(e) => handleSetUserId(e.target.value)}
                    />
                    {/* Loading spinner */}
                    <div className="flex items-center bg-[#EEEEEE] dark:bg-slate-600">
                        {loading && (
                            <div className=" rounded-full">
                                <ClipLoader color="gray" size={18} />
                            </div>
                        )}
                    </div>
                </div>
                {/* Display error if user id is not available */}
                {useridAvailable && (
                    <p className="text-red-600 text-sm">
                        The id '{userid}' is already taken by some other user,
                        try different...
                    </p>
                )}
                {/* Buttons */}
                <div className="w-full flex justify-end mt-4 space-x-2">
                    <button
                        className="px-4 py-2 rounded-full border-[1px] border-red-500"
                        onClick={closeCreateUserId}
                    >
                        <p className="text-sm text-red-500">Back</p>
                    </button>
                    <button
                        className="px-5 py-2 bg-[#379ee2] rounded-full text-gray-100 text-base relative disabled:disabled:cursor-not-allowed"
                        disabled={userid.length < 3 || useridAvailable}
                    >
                        Finish
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateUserId
