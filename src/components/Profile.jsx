import React, { useState } from "react"
import { IoMdArrowBack } from "react-icons/io"
import { FaPen } from "react-icons/fa"
import { IoCheckmarkOutline } from "react-icons/io5"
import { FaRegFaceSmile } from "react-icons/fa6"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../Redux/Auth/action"
import { ClipLoader } from "react-spinners"
import DefaultUser from "../assets/default-user.png"

const Profile = ({ closeOpenProfile }) => {
    // State variables
    const { currentUser } = useSelector((state) => state.userStore)
    const [isPenClicked, setIsPenClicked] = useState(false)
    const [isUseridPenClicked, setIsUseridPenClicked] = useState(false)
    const [isAboutPenClicked, setIsAboutPenClicked] = useState(false)
    const [profileImage, setProfileImage] = useState(currentUser?.profileImage)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(currentUser?.name)
    const [userid, setUserid] = useState(currentUser?.userid)
    const [about, setAbout] = useState(currentUser?.about)
    const dispatch = useDispatch()

    // Function to handle updating the name
    const handleUpdateName = () => {
        setIsPenClicked(false)
        dispatch(updateUser({ id: currentUser.id, name: name }))
    }

    // Function to handle updating the userid
    const handleUpdateUserid = () => {
        setIsUseridPenClicked(false)
        dispatch(updateUser({ id: currentUser.id, userid: userid }))
    }

    // Function to handle updating the about section
    const handleUpdateAbout = () => {
        setIsAboutPenClicked(false)
        dispatch(updateUser({ id: currentUser.id, about: about }))
    }

    // Function to handle changing profile image
    const handleProfileImageChange = async (imageFile) => {
        const data = new FormData()
        data.append("file", imageFile)
        data.append("upload_preset", "talkify-images")
        data.append("cloud_name", "ddj5asxve")

        setLoading(true)
        const response = await axios.post("https://api.cloudinary.com/v1_1/ddj5asxve/image/upload",
            data
        )
        const imageURL = response.data.url
        setProfileImage(imageURL)
        setLoading(false)

        dispatch(updateUser({ id: currentUser.id, profileImage: imageURL }))
    }

    return (
        <div>
            {/* Profile header */}
            <div className="w-full md:w-[40%] h-14 md:h-28 bg-[#222e35da] fixed top-0 z-50">
                <div className="w-full md:w-[40%] h-full flex flex-col justify-center md:justify-end">
                    <div className="flex space-x-5 items-center text-xl font-medium text-gray-300 ml-2 md:ml-6 md:mb-4">
                        <IoMdArrowBack
                            className="cursor-pointer text-2xl"
                            onClick={closeOpenProfile}
                        />
                        <p>Profile</p>
                    </div>
                </div>
            </div>

            {/* Main section */}
            <div className="mt-28 overflow-y-scroll space-y-5 h-[80vh]">
                {/* Image section */}
                <div className="h-60 flex items-center justify-center relative ">
                    {loading && (
                        <ClipLoader color="#2d0442" className="absolute" />
                    )}
                    <div className="w-44 h-44 md:w-48 md:h-48 rounded-full bg-white cursor-pointer">
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

                {/* Name section */}
                <div className="h-30 flex flex-col px-5 md:px-8">
                    <div>
                        <p className="text-sm font-medium text-[#005C4B]">
                            Your name
                        </p>
                    </div>
                    {!isPenClicked ? (
                        <div className="flex justify-between items-center">
                            <p className="py-3 text-gray-300">
                                {currentUser.name}
                            </p>
                            <FaPen
                                className="cursor-pointer text-gray-400"
                                onClick={() => setIsPenClicked(true)}
                            />
                        </div>
                    ) : (
                        <div className="flex py-2 items-center border-b-2 border-gray-400">
                            <input
                                type="text"
                                value={name}
                                className="flex-1 bg-transparent outline-none text-gray-300"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                            <div className="flex space-x-2">
                                <FaRegFaceSmile className="text-gray-400 cursor-pointer text-xl" />
                                <IoCheckmarkOutline
                                    className="text-gray-400 cursor-pointer text-2xl"
                                    onClick={handleUpdateName}
                                />
                            </div>
                        </div>
                    )}
                    <div>
                        <p className="text-gray-500 text-sm">
                            This is not your username or pin, This name will be
                            visible to your chat participants
                        </p>
                    </div>
                </div>

                {/* Userid section */}
                <div className="h-30 flex flex-col px-5 md:px-8">
                    <div>
                        <p className="text-sm font-medium text-[#005C4B]">
                            Your userid
                        </p>
                    </div>
                    {!isUseridPenClicked ? (
                        <div className="flex justify-between items-center">
                            <p className="py-3 text-gray-300">
                                {currentUser.userid}
                            </p>
                            <FaPen
                                className="cursor-pointer text-gray-400"
                                onClick={() => setIsUseridPenClicked(true)}
                            />
                        </div>
                    ) : (
                        <div className="flex py-2 items-center border-b-2 border-gray-400">
                            <input
                                type="text"
                                value={userid}
                                className="flex-1 bg-transparent outline-none text-gray-300"
                                onChange={(e) => {
                                    setUserid(e.target.value)
                                }}
                            />
                            <div className="flex space-x-2">
                                <FaRegFaceSmile className="text-gray-400 cursor-pointer text-xl" />
                                <IoCheckmarkOutline
                                    className="text-gray-400 cursor-pointer text-2xl"
                                    onClick={handleUpdateUserid}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* About section */}
                <div className="h-30 flex flex-col px-5 md:px-8 pb-5">
                    <div>
                        <p className="text-sm font-medium text-[#005C4B]">
                            About
                        </p>
                    </div>
                    {!isAboutPenClicked ? (
                        <div className="flex justify-between items-center">
                            <p className="py-3 text-gray-300">
                                {about || "Hi, I am using Talkify!"}
                            </p>
                            <FaPen
                                className="cursor-pointer text-gray-400"
                                onClick={() => setIsAboutPenClicked(true)}
                            />
                        </div>
                    ) : (
                        <div className="flex py-2 items-center border-b-2 border-gray-400">
                            <input
                                type="text"
                                value={about}
                                className="flex-1 bg-transparent outline-none text-gray-300"
                                onChange={(e) => {
                                    setAbout(e.target.value)
                                }}
                            />
                            <div className="flex space-x-2">
                                <FaRegFaceSmile className="text-gray-400 cursor-pointer text-xl" />
                                <IoCheckmarkOutline
                                    className="text-gray-400 cursor-pointer text-2xl"
                                    onClick={handleUpdateAbout}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
