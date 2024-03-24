import React, { useState } from "react"
import { TiStar } from "react-icons/ti"
import { PiClockCountdownLight } from "react-icons/pi"
import { BsHandThumbsDownFill } from "react-icons/bs"
import { GoChevronRight } from "react-icons/go"
import { MdDelete } from "react-icons/md"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../Redux/Auth/action"
import { ClipLoader } from "react-spinners"
import DefaultUser from "../assets/default-user.png"
import DefaultGroup from "../assets/default-group.png"
import { MdBlock, MdOutlineClose } from "react-icons/md"
import { IoIosNotifications, IoMdLock } from "react-icons/io"
import { Switch } from "@mui/material"
import { deleteChat } from "../Redux/Chat/action"

const ContactInfo = ({
    closeContactInfo,
    chatUser,
    CurrentChatId,
    closeChatDetails,
    chat,
}) => {
    // Redux state management
    const { currentUser } = useSelector((state) => state.userStore)
    const { chats } = useSelector((state) => state.chatStore)
    const dispatch = useDispatch()

    // Component state
    const [isPenClicked, setIsPenClicked] = useState(false)
    const [isAboutPenClicked, setIsAboutPenClicked] = useState(false)
    const [profileImage, setProfileImage] = useState(currentUser?.profileImage)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(currentUser?.name)
    const [about, setAbout] = useState(currentUser?.about)
    const label = { inputProps: { "aria-label": "Switch demo" } }

    // Console log for debugging
    console.log(chatUser)

    // Function to handle updating user name
    const handleUpdateName = () => {
        setIsPenClicked(false)
        console.log(name)
        dispatch(updateUser({ id: currentUser.id, name: name }))
    }

    // Function to handle updating user about
    const handleUpdateAbout = () => {
        setIsAboutPenClicked(false)
        console.log(about)
        dispatch(updateUser({ id: currentUser.id, about: about }))
    }

    // Function to handle deleting a chat
    const handleDeleteChat = () => {
        dispatch(deleteChat(chats, CurrentChatId))
        closeChatDetails()
    }

    return (
        <div className="w-full md:w-[60%] h-screen md:h-screen flex flex-col fixed bg-[#0C1317] ">
            <div className="bg-[#202C33]">
                {/* Header */}
                <div className="w-full h-14 flex items-center">
                    <div className="flex space-x-7 items-center">
                        {/* Close button */}
                        <div className="pl-5">
                            <MdOutlineClose
                                className="cursor-pointer text-gray-400 text-2xl"
                                onClick={closeContactInfo}
                            />
                        </div>
                        <p className="text-gray-200 text-base">Chat info</p>
                    </div>
                </div>
            </div>

            {/* Main section */}
            <div className="overflow-y-scroll space-y-3 h-[80vh] flex-1">
                {/* Image section */}
                <div className="h-80 flex flex-col items-center justify-center relative bg-[#111B21]">
                    {loading && (
                        <ClipLoader color="#2d0442" className="absolute" />
                    )}
                    <div className="w-44 h-44 md:w-48 md:h-48 rounded-full bg-white cursor-pointer">
                        <label htmlFor="imageInput">
                            <img
                                className=" w-full h-full rounded-full object-cover cursor-pointer"
                                src={
                                    chat.isGroup
                                        ? chat.chatImage || DefaultGroup
                                        : chatUser.profileImage || DefaultUser
                                }
                                alt=""
                            />
                        </label>
                    </div>
                    <div className="p-3 flex flex-col justify-center items-center">
                        <p className="text-gray-300 font-medium text-xl">
                            {chat.isGroup ? chat.chatName : chatUser.name}
                        </p>
                        <p className="text-gray-500 text-lg">
                            {chat.isGroup
                                ? `Group - ${chat.members.length} members`
                                : chatUser.userid}
                        </p>
                    </div>
                </div>
                {/* About section */}
                {chat.isGroup ? (
                    <div className="h-16 flex p-3 pl-6 bg-[#111B21]">
                        <div className="flex justify-between items-center">
                            <p className="text-gray-300 text-sm">
                                {`Group created by ${chat.createdBy.userid} `}
                                {chat?.creationTime &&
                                    "on" + chat?.creationTime}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="h-30 flex flex-col space-y-2 p-3 pl-6 bg-[#111B21]">
                        <div>
                            <p className="text-base text-gray-500">About</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-300">
                                {about || "Hi I am using Talkify!"}
                            </p>
                        </div>
                    </div>
                )}

                {/* Utilities section */}
                <div className="h-30 flex flex-col space-y-7 p-3 pl-6 bg-[#111B21]">
                    {/* Starred messages */}
                    <div className="flex justify-between cursor-pointer">
                        <div className="flex text-lg space-x-5 items-center text-gray-300">
                            <TiStar />
                            <p>Starred messages</p>
                        </div>
                        <div className="text-gray-400 text-2xl">
                            <GoChevronRight />
                        </div>
                    </div>

                    {/* Mute notification */}
                    <div className="flex justify-between cursor-pointer">
                        <div className="flex text-lg space-x-5 items-center text-gray-300 ">
                            <div className="flex text-lg space-x-5 items-center text-gray-300">
                                <IoIosNotifications />
                                <p>Mute notification</p>
                            </div>
                        </div>
                        <div>
                            <Switch {...label} defaultChecked />
                        </div>
                    </div>

                    {/* Disappearing messages */}

                    {!chat.isGroup ? (
                        <div className="flex justify-between cursor-pointer">
                            <div className="flex text-lg space-x-5 items-center text-gray-300">
                                <PiClockCountdownLight />
                                <div>
                                    <p>Disappearing messages</p>
                                    <p className="text-gray-400">Off</p>
                                </div>
                            </div>
                            <div>
                                <GoChevronRight className="text-gray-400 text-2xl" />
                            </div>
                        </div>
                    ) : null}

                    {/* Encryption */}
                    <div className="flex text-lg space-x-5 items-center text-gray-300 cursor-pointer">
                        <IoMdLock />
                        <div>
                            <p>Encryption</p>
                            <p className="text-sm text-gray-400">
                                Messages are end-to-end-encrypted. Click to
                                verify.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action section */}
                {chat.isGroup ? (
                    <div className="h-30 flex flex-col p-3 bg-[#111B21]">
                        {/* Block */}
                        <div
                            onClick={handleDeleteChat}
                            className="flex text-lg space-x-5 items-center text-red-500 p-3 hover:bg-gray-800 cursor-pointer"
                        >
                            <MdBlock />
                            <p>{`Exit group`}</p>
                        </div>
                        {/* Report */}
                        <div className="flex text-lg space-x-5 items-center text-red-500 p-3 hover:bg-gray-800 cursor-pointer">
                            <BsHandThumbsDownFill />
                            <p>{`Report group`}</p>
                        </div>
                    </div>
                ) : (
                    <div className="h-30 flex flex-col p-3 bg-[#111B21]">
                        {/* Block */}
                        <div className="flex text-lg space-x-5 items-center text-red-500 p-3 hover:bg-gray-800 cursor-pointer">
                            <MdBlock />
                            <p>{`Block ${chatUser.name}`}</p>
                        </div>
                        {/* Report */}
                        <div className="flex text-lg space-x-5 items-center text-red-500 p-3 hover:bg-gray-800 cursor-pointer">
                            <BsHandThumbsDownFill />
                            <p>{`Report ${chatUser.name}`}</p>
                        </div>
                        {/* Delete chat */}
                        <div
                            onClick={handleDeleteChat}
                            className="flex text-lg space-x-5 items-center text-red-500 p-3 hover:bg-gray-800 cursor-pointer"
                        >
                            <MdDelete />
                            <p>Delete chat</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ContactInfo
