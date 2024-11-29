import React, { useEffect, useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { GrEmoji } from "react-icons/gr"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { IoSend } from "react-icons/io5"
import { BsPlusLg } from "react-icons/bs"
import DefaultFile from "../assets/defaultFileIcon.png"
import { useDispatch } from "react-redux"
import { createNewMessage } from "../Redux/Message/action"
import { toast } from "react-toastify"
import { PulseLoader } from "react-spinners"

const MultiMediaShare = ({ selectedFiles, setSelectedFiles, chatId, closeMediaShare }) => {
    
    const [mediaFiles, setMediaFiles] = useState([])
    const [message, setMessage] = useState("")
    const [showEmoji, setShowEmoji] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    // Check if the device is small (mobile)
    const isSmallDevice = window.innerWidth < 640

    useEffect(() => {
        setMediaFiles([...selectedFiles])
    }, [])

    useEffect(() => {
        setSelectedMedia(mediaFiles[mediaFiles.length - 1])
    }, [mediaFiles])

    const sendMessage = async () => {
        setLoading(true)

        for (const media of mediaFiles) {
            const formData = new FormData()
            let msgRequestData = null

            if (media === selectedMedia) {
                msgRequestData = {
                    chatId: chatId,
                    noteMessage: message,
                }
            } else {
                msgRequestData = {
                    chatId: chatId,
                }
            }

            // Append the message request data as a JSON string
            formData.append("msgRequest", JSON.stringify(msgRequestData))
            formData.append("mediaFile", media)

            await dispatch(createNewMessage(formData))
        }

        // Reset message and media files after sending
        setMessage("")
        setMediaFiles([])
        setSelectedMedia(null)
        setSelectedFiles([])
        closeMediaShare()

        setLoading(false)
    }

    const addEmoji = (emoji) => {
        setMessage((prevValue) => prevValue + emoji.native)
    }

    const handleFileInputChange = (e) => {
        const files = [...e.target.files]

        // Filter files larger than 50MB
        const filteredFiles = files.filter(
            (file) => file.size <= 50 * 1024 * 1024
        )

        const largerSizeMedia = files.length - filteredFiles.length

        if (largerSizeMedia > 0) {
            if (largerSizeMedia === 1) {
                toast.error(
                    "1 media you tried adding is larger than 50MB limit"
                )
            } else {
                toast.error(
                    `${largerSizeMedia} media you tried adding are larger than 50MB limit`
                )
            }
        }

        setMediaFiles((prevFiles) => [...prevFiles, ...filteredFiles])
    }

    return (
        <div className="w-full md:w-[60%] h-screen md:h-screen flex flex-col fixed bg-[#101A20] ">
            {loading && (
                <div className="absolute w-full h-full flex justify-center z-1000">
                    <div className="w-36 h-12 mt-[5rem] flex flex-col items-center justify-center bg-white rounded-lg">
                        <PulseLoader color="#36d7b7" size={12} />
                        <p>Sharing...</p>
                    </div>
                </div>
            )}
            {!isSmallDevice && (
                <div className="w-full h-14 flex bg-[#1F2B32]"></div>
            )}

            {/* Header */}
            <div className="w-full h-14 flex items-center">
                <div className="flex space-x-7 items-center">
                    {/* close button */}
                    <div className="pl-5">
                        <MdOutlineClose
                            className="cursor-pointer text-gray-400 text-2xl"
                            onClick={closeMediaShare}
                        />
                    </div>
                </div>
            </div>

            {/* media section */}
            <div className=" h-[40vh] mt-5 flex justify-center items-center p-4">
                {selectedMedia?.type?.startsWith("image") ? (
                    <img
                        className="h-full"
                        src={URL.createObjectURL(selectedMedia)}
                        alt="Selected Media"
                    />
                ) : selectedMedia?.type?.startsWith("video") ? (
                    <video
                        className="h-full"
                        src={URL.createObjectURL(selectedMedia)}
                        controls
                        alt="Selected Media"
                    />
                ) : (
                    <div className="h-full flex flex-col justify-center items-center">
                        <img
                            className="h-[80%]"
                            src={DefaultFile}
                            alt="Selected Media"
                        />
                        <p className="text-2xl text-gray-400 ">
                            No Preview Available
                        </p>
                        <p className="text-sm text-gray-400 text-center">
                            {selectedMedia?.type}
                        </p>
                    </div>
                )}
            </div>
            <div className="w-[93%] md:w-[80%] mx-auto mt-10 h-12 rounded-lg flex justify-items-start items-center space-x-8 bg-[#2B3B45]">
                <input
                    type="text"
                    className="bg-transparent focus:outline-none text-white text-base w-full ml-7"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage()
                            setMessage("")
                        }
                    }}
                />
                <div className="p-3">
                    <GrEmoji
                        className={`cursor-pointer text-xl ${
                            showEmoji ? "text-[#00A884]" : "text-gray-400"
                        }`}
                        onClick={() => setShowEmoji((pre) => !pre)}
                    />
                </div>
            </div>
            <div className="w-[95%] mx-auto flex-1 justify-center items-center mt-3 border-t-2 border-gray-800">
                <div className="w-full h-full flex">
                    <div className="w-[80%] md:w-[90%] h-full flex space-x-2 justify-center items-center ">
                        {mediaFiles.map((media, index) => (
                            <div
                                className={`w-14 h-14 bg-slate-700 cursor-pointer overflow-hidden border-2 rounded-md ${
                                    selectedMedia === media
                                        ? " border-[#00A884]"
                                        : "border-[#101A20]"
                                }`}
                                key={index}
                                onClick={() => setSelectedMedia(media)}
                            >
                                {media?.type?.startsWith("image") ? (
                                    <img
                                        className="h-full"
                                        src={URL.createObjectURL(media)}
                                        alt="Selected Media"
                                    />
                                ) : media?.type?.startsWith("video") ? (
                                    <video
                                        className="h-full"
                                        src={URL.createObjectURL(media)}
                                        alt="Selected Media"
                                    />
                                ) : (
                                    <div className="h-full flex justify-center items-center">
                                        <img
                                            className="h-[70%]"
                                            src={DefaultFile}
                                            alt="Selected Media"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                        <label htmlFor="imageInput">
                            <div className="w-14 h-14 border-[1px] border-white flex justify-center items-center cursor-pointer rounded-md">
                                <BsPlusLg className="text-white text-xl font-bold" />
                            </div>
                        </label>
                        <input
                            type="file"
                            multiple
                            id="imageInput"
                            className="w-full h-full rounded-full object-cover hidden"
                            onChange={handleFileInputChange}
                        />
                    </div>
                    <div className="w-[20%] md:w-[10%] h-full flex justify-end items-center">
                        <div className="w-14 h-14 md:w-14 md:h-14 rounded-full bg-[#00A884] flex justify-center items-center cursor-pointer">
                            <IoSend
                                className="cursor-pointer text-white text-2xl"
                                onClick={sendMessage}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {showEmoji && (
                <div className="absolute md:right-[20%] md:top-[10%]">
                    <Picker
                        data={data}
                        onEmojiSelect={addEmoji}
                        perLine={isSmallDevice ? 7 : 9}
                    />
                </div>
            )}
        </div>
    )
}

export default MultiMediaShare
