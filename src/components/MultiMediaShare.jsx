import React, { useEffect, useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { GrEmoji } from "react-icons/gr"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { IoSend } from "react-icons/io5"
import { BsPlusLg } from "react-icons/bs"
import DefaultFile from "../assets/defaultFileIcon.png"

const MultiMediaShare = ({ selectedFiles, closeMediaShare }) => {

    const [mediaFiles, setMediaFiles] = useState([])
    const [message, setMessage] = useState("")
    const [showEmoji, setShowEmoji] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState(null)

    useEffect(()=>{
        setMediaFiles([...selectedFiles])
    },[])

    useEffect(() => {
        setSelectedMedia(mediaFiles[mediaFiles.length - 1])
    }, [mediaFiles])

    const sendMessage = () => {
        console.log("Sent");
    }

    const addEmoji = (emoji) => {
        setMessage((prevValue) => prevValue + emoji.native)
    }

    return (
        <div className="w-full md:w-[60%] h-screen md:h-screen flex flex-col fixed bg-[#101A20] ">
            {/* Header */}
            <div className="w-full h-14 flex bg-[#1F2B32]"></div>
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
            <div className=" h-[40vh] mt-5 flex justify-center items-center ">
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
                        <p className="text-2xl text-gray-400 ">No Preview Available</p>
                        <p className="text-sm text-gray-400 text-center">
                            {selectedMedia?.type}
                        </p>
                    </div>
                )}
            </div>
            <div className="w-[80%] mx-auto mt-10 h-12 rounded-lg flex justify-items-start items-center space-x-8 bg-[#2B3B45]">
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
                    <div className="w-[90%] h-full flex space-x-2 justify-center items-center ">
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
                                { media?.type?.startsWith("image") ? (
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
                            onChange={(e) =>
                                setMediaFiles([
                                    ...mediaFiles,
                                    ...e.target.files,
                                ])
                            }
                        />
                    </div>
                    <div className="w-[10%] h-full flex justify-end items-center">
                        <div className="w-14 h-14 rounded-full bg-[#00A884] flex justify-center items-center cursor-pointer">
                            <IoSend
                                className="cursor-pointer text-white text-2xl"
                                onClick={sendMessage}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {showEmoji && (
                <div className="absolute right-[20%]">
                    <Picker data={data} onEmojiSelect={addEmoji} />
                </div>
            )}
        </div>
    )
}

export default MultiMediaShare
