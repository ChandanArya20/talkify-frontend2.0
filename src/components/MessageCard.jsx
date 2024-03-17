import React from "react"
import DefaultFile from "../assets/defaultFileIcon.png"
import { BiDownload } from "react-icons/bi"
import { IoCheckmarkOutline } from "react-icons/io5"

export const MessageCard = ({ isReqUserMsg, message }) => {
    const downloadContent = () => {
        // Create a temporary link element
        const link = document.createElement("a")
        // Set the href attribute to the download URL
        link.href = `${message.mediaURL}/download`
        // Set the download attribute to specify the filename
        link.setAttribute("download", message.fileName)
        // Trigger the click event to initiate the download
        document.body.appendChild(link)
        link.click()
        // Clean up by removing the link element
        document.body.removeChild(link)
    }

    return (
        <>
            {message.messageType === "TEXT" ? (
                <div
                    className={`rounded-md ${
                        isReqUserMsg ? "bg-[#005C4B]" : "bg-[#202C33]"
                    }`}
                >
                    <div className="p-2 flex space-x-2">
                        <p className="text-sm text-white">
                            {message.textMessage}
                        </p>
                        <div className="flex items-center space-x-1 mt-2">
                            <p className="text-xs text-gray-300 text-nowrap">
                                {message.creationTime}
                            </p>
                            {isReqUserMsg && (
                                <IoCheckmarkOutline className="text-gray-300" />
                            )}
                        </div>
                    </div>
                </div>
            ) : message.messageType.startsWith("image") ? (
                <div
                    className={`flex justify-end cursor-pointer`}
                    onClick={downloadContent}
                >
                    <div
                        className={`w-[70%] md:w-52 p-1 rounded-md flex flex-col space-y-1  ${
                            isReqUserMsg ? "bg-[#005C4B]" : "bg-[#202C33]"
                        }`}
                    >
                        <div>
                            <img src={message.mediaURL} alt="Image" />
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-white">
                                {message.noteMessage}
                            </p>
                            <div className="flex items-center space-x-1 mt-2">
                                <p className="text-xs text-gray-300 text-nowrap">
                                    {message.creationTime}
                                </p>
                                {isReqUserMsg && (
                                    <IoCheckmarkOutline className="text-gray-300" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : message.messageType.startsWith("audio") ? (
                <div className={`flex`}>
                    <div
                        className={` p-1 rounded-md flex flex-col space-y-1  ${
                            isReqUserMsg ? "bg-[#005C4B]" : "bg-[#202C33]"
                        }`}
                    >
                        <div>
                            <audio src={message.mediaURL} controls />
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-white">
                                {message.noteMessage}
                            </p>
                            <div className="flex items-center space-x-1 mt-2">
                                <p className="text-xs text-gray-300 text-nowrap">
                                    {message.creationTime}
                                </p>
                                {isReqUserMsg && (
                                    <IoCheckmarkOutline className="text-gray-300" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : message.messageType.startsWith("video") ? (
                <div className="flex justify-end ">
                    <div
                        className={`max-w-72 p-1 rounded-md flex flex-col items-center space-y-1  ${
                            isReqUserMsg ? "bg-[#005C4B]" : "bg-[#202C33]"
                        }`}
                    >
                        <div className="">
                            <video src={message.mediaURL} controls />
                        </div>
                        <div className="w-full flex justify-between">
                            <p className="text-sm text-white">
                                {message.noteMessage}
                            </p>
                            <div className="flex items-center space-x-1 mt-2">
                                <p className="text-xs text-gray-300 text-nowrap">
                                    {message.creationTime}
                                </p>
                                {isReqUserMsg && (
                                    <IoCheckmarkOutline className="text-gray-300" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`flex justify-end `}>
                    <div
                        className={`w-72 p-1 rounded-md flex flex-col  ${
                            isReqUserMsg ? "bg-[#005C4B]" : "bg-[#202C33]"
                        }`}
                    >
                        <div className="flex flex-col">
                            <div
                                className={`${
                                    isReqUserMsg
                                        ? "bg-[#124e44]"
                                        : "bg-slate-800"
                                } flex justify-between items-center p-1`}
                            >
                                <div className="flex space-x-1">
                                    <img
                                        src={DefaultFile}
                                        className="h-12 cursor-pointer"
                                        alt="Image"
                                    />
                                    <div className="flex flex-col ">
                                        <div className="w-40">
                                            <p className=" text-gray-200 text-sm text-nowrap text-ellipsis overflow-hidden">
                                                {message.fileName}
                                            </p>
                                        </div>
                                        <p className="text-gray-400 text-sm">
                                            {message.messageType.split("/")[1]}{" "}
                                            .{" "}
                                            {(
                                                message.fileSize /
                                                (1024 * 1024)
                                            ).toFixed(2)}
                                            MB
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="text-gray-400 text-2xl cursor-pointer"
                                    onClick={downloadContent}
                                >
                                    <BiDownload />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-sm text-white">
                                    {message.noteMessage}
                                </p>
                                <div className="flex items-center space-x-1 mt-2">
                                    <p className="text-xs text-gray-300 text-nowrap">
                                        {message.creationTime}
                                    </p>
                                    {isReqUserMsg && (
                                        <IoCheckmarkOutline className="text-gray-300" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MessageCard
