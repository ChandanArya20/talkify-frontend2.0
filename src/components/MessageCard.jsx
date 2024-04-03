import React from "react"
import DefaultFile from "../assets/defaultFileIcon.png"
import { BiDownload } from "react-icons/bi"
import { IoCheckmarkOutline } from "react-icons/io5"

export const MessageCard = ({ isReqUserMsg, message, isGroup }) => {

    // console.log(message)

    // Function to download content
    const downloadContent = () => {
        // Create a temporary link element
        const link = document.createElement("a")

        link.href = `${message.mediaURL}/download`
        link.setAttribute("download", message.fileName)
        document.body.appendChild(link)

        // Trigger the click event to initiate the download
        link.click()
        // Clean up by removing the link element
        document.body.removeChild(link)
    }

    return (
        <>
            {/*Not a group message*/}
            {!isGroup ? (
                <>
                    {/* Conditional rendering based on message type */}
                    {message.messageType === "TEXT" ? (
                        // Text message
                        <div
                            className={`rounded-md ${
                                isReqUserMsg ? "bg-[#005C4B]" : "bg-[#202C33]"
                            }`}
                        >
                            <div className="p-2 flex space-x-2">
                                {/* Text content */}
                                <p className="text-base text-white">
                                    {message.textMessage}
                                </p>
                                <div className="flex items-center space-x-1 mt-2">
                                    {/* Message timestamp */}
                                    <p className="text-xs text-gray-300 text-nowrap">
                                        {message.creationTime}
                                    </p>
                                    {/* Checkmark icon for sent messages */}
                                    {isReqUserMsg && (
                                        <IoCheckmarkOutline className="text-gray-300" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : message.messageType.startsWith("image") ? (
                        // Image message
                        <div
                            className={`flex justify-end cursor-pointer`}
                            onClick={downloadContent}
                        >
                            <div
                                className={`w-64 p-1 rounded-md flex flex-col space-y-1 ${
                                    isReqUserMsg
                                        ? "bg-[#005C4B]"
                                        : "bg-[#202C33]"
                                }`}
                            >
                                <div>
                                    {/* Image content */}
                                    <img src={message.mediaURL} alt="Image" />
                                </div>
                                <div className="flex justify-between">
                                    {/* Image note message */}
                                    <p className="text-sm text-white">
                                        {message.noteMessage}
                                    </p>
                                    {/* Message timestamp */}
                                    <div className="flex items-center space-x-1 mt-2">
                                        <p className="text-xs text-gray-300 text-nowrap">
                                            {message.creationTime}
                                        </p>
                                        {/* Checkmark icon for sent messages */}
                                        {isReqUserMsg && (
                                            <IoCheckmarkOutline className="text-gray-300" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : message.messageType.startsWith("audio") ? (
                        // Audio message
                        <div className={`flex`}>
                            <div
                                className={`p-1 rounded-md flex flex-col space-y-1 ${
                                    isReqUserMsg
                                        ? "bg-[#005C4B]"
                                        : "bg-[#202C33]"
                                }`}
                            >
                                <div>
                                    {/* Audio content */}
                                    <audio src={message.mediaURL} controls />
                                </div>
                                <div className="flex justify-between">
                                    {/* Audio note message */}
                                    <p className="text-sm text-white">
                                        {message.noteMessage}
                                    </p>
                                    {/* Message timestamp */}
                                    <div className="flex items-center space-x-1 mt-2">
                                        <p className="text-xs text-gray-300 text-nowrap">
                                            {message.creationTime}
                                        </p>
                                        {/* Checkmark icon for sent messages */}
                                        {isReqUserMsg && (
                                            <IoCheckmarkOutline className="text-gray-300" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : message.messageType.startsWith("video") ? (
                        // Video message
                        <div className="flex justify-end ">
                            <div
                                className={`max-w-72 p-1 rounded-md flex flex-col items-center space-y-1 ${
                                    isReqUserMsg
                                        ? "bg-[#005C4B]"
                                        : "bg-[#202C33]"
                                }`}
                            >
                                <div className="">
                                    {/* Video content */}
                                    <video src={message.mediaURL} controls />
                                </div>
                                <div className="w-full flex justify-between">
                                    {/* Video note message */}
                                    <p className="text-sm text-white">
                                        {message.noteMessage}
                                    </p>
                                    {/* Message timestamp */}
                                    <div className="flex items-center space-x-1 mt-2">
                                        <p className="text-xs text-gray-300 text-nowrap">
                                            {message.creationTime}
                                        </p>
                                        {/* Checkmark icon for sent messages */}
                                        {isReqUserMsg && (
                                            <IoCheckmarkOutline className="text-gray-300" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Other file message
                        <div className={`flex justify-end `}>
                            <div
                                className={`w-72 p-1 rounded-md flex flex-col ${
                                    isReqUserMsg
                                        ? "bg-[#005C4B]"
                                        : "bg-[#202C33]"
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
                                            {/* Default file icon */}
                                            <img
                                                src={DefaultFile}
                                                className="h-12 cursor-pointer"
                                                alt="Image"
                                            />
                                            <div className="flex flex-col ">
                                                {/* File name */}
                                                <div className="w-40">
                                                    <p className="text-gray-200 text-sm text-nowrap text-ellipsis overflow-hidden">
                                                        {message.fileName}
                                                    </p>
                                                </div>
                                                {/* File details */}
                                                <p className="text-gray-400 text-sm">
                                                    {
                                                        message.messageType.split(
                                                            "/"
                                                        )[1]
                                                    }{" "}
                                                    .{" "}
                                                    {(
                                                        message.fileSize /
                                                        (1024 * 1024)
                                                    ).toFixed(2)}{" "}
                                                    MB
                                                </p>
                                            </div>
                                        </div>
                                        {/* Download button */}
                                        <div
                                            className="text-gray-400 text-2xl cursor-pointer"
                                            onClick={downloadContent}
                                        >
                                            <BiDownload />
                                        </div>
                                    </div>
                                    {/* File note message */}
                                    <div className="flex justify-between">
                                        <p className="text-sm text-white">
                                            {message.noteMessage}
                                        </p>
                                        {/* Message timestamp */}
                                        <div className="flex items-center space-x-1 mt-2">
                                            <p className="text-xs text-gray-300 text-nowrap">
                                                {message.creationTime}
                                            </p>
                                            {/* Checkmark icon for sent messages */}
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
            ) : (
                <>
                    {/*Not a group message*/}
                    {/* Conditional rendering based on message type */}
                    {message.messageType === "TEXT" ? (
                        // Text message
                        <div
                            className={`rounded-md ${
                                isReqUserMsg ? "bg-[#005C4B]" : "bg-[#202C33]"
                            }`}
                        >
                            <div className="pl-2 text-yellow-400 text-sm"><p className="">{message.createdBy.userid}</p></div>
                            <div className="p-2 pt-0 flex space-x-2">
                                {/* Text content */}
                                <p className="text-base text-white">
                                    {message.textMessage}
                                </p>
                                <div className="flex items-center space-x-1 mt-2">
                                    {/* Message timestamp */}
                                    <p className="text-xs text-gray-300 text-nowrap">
                                        {message.creationTime}
                                    </p>
                                    {/* Checkmark icon for sent messages */}
                                    {isReqUserMsg && (
                                        <IoCheckmarkOutline className="text-gray-300" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : message.messageType.startsWith("image") ? (
                        // Image message
                        <div
                            className={`flex justify-end cursor-pointer`}
                            onClick={downloadContent}
                        >
                            <div
                                className={`w-64 p-1 rounded-md flex flex-col space-y-1 ${
                                    isReqUserMsg
                                    ? "bg-[#005C4B]"
                                    : "bg-[#202C33]"
                                }`}
                            >
                                <div className="pl-2 pt-0 pb-1 text-yellow-400"><p className="">{message.createdBy.userid}</p></div>
                                <div>
                                    {/* Image content */}
                                    <img src={message.mediaURL} alt="Image" />
                                </div>
                                <div className="flex justify-between">
                                    {/* Image note message */}
                                    <p className="text-sm text-white">
                                        {message.noteMessage}
                                    </p>
                                    {/* Message timestamp */}
                                    <div className="flex items-center space-x-1 mt-2">
                                        <p className="text-xs text-gray-300 text-nowrap">
                                            {message.creationTime}
                                        </p>
                                        {/* Checkmark icon for sent messages */}
                                        {isReqUserMsg && (
                                            <IoCheckmarkOutline className="text-gray-300" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : message.messageType.startsWith("audio") ? (
                        // Audio message
                        <div className={`flex`}>
                            <div
                                className={`p-1 rounded-md flex flex-col space-y-1 ${
                                    isReqUserMsg
                                        ? "bg-[#005C4B]"
                                        : "bg-[#202C33]"
                                }`}
                            >
                                <div className="pl-2 text-yellow-400"><p className="">{message.createdBy.userid}</p></div>
                                <div>
                                    {/* Audio content */}
                                    <audio src={message.mediaURL} controls />
                                </div>
                                <div className="flex justify-between">
                                    {/* Audio note message */}
                                    <p className="text-sm text-white">
                                        {message.noteMessage}
                                    </p>
                                    {/* Message timestamp */}
                                    <div className="flex items-center space-x-1 mt-2">
                                        <p className="text-xs text-gray-300 text-nowrap">
                                            {message.creationTime}
                                        </p>
                                        {/* Checkmark icon for sent messages */}
                                        {isReqUserMsg && (
                                            <IoCheckmarkOutline className="text-gray-300" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : message.messageType.startsWith("video") ? (
                        // Video message
                        <div className="flex justify-end ">
                            <div
                                className={`max-w-72 p-1 rounded-md flex flex-col items-center space-y-1 ${
                                    isReqUserMsg
                                        ? "bg-[#005C4B]"
                                        : "bg-[#202C33]"
                                }`}
                            >
                                <div className="pl-2 pt-0 pb-1 text-yellow-400"><p className="">{message.createdBy.userid}</p></div>
                                <div className="">
                                    {/* Video content */}
                                    <video src={message.mediaURL} controls />
                                </div>
                                <div className="w-full flex justify-between">
                                    {/* Video note message */}
                                    <p className="text-sm text-white">
                                        {message.noteMessage}
                                    </p>
                                    {/* Message timestamp */}
                                    <div className="flex items-center space-x-1 mt-2">
                                        <p className="text-xs text-gray-300 text-nowrap">
                                            {message.creationTime}
                                        </p>
                                        {/* Checkmark icon for sent messages */}
                                        {isReqUserMsg && (
                                            <IoCheckmarkOutline className="text-gray-300" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Other file message
                        <div className={`flex justify-end `}>
                            <div
                                className={`w-72 p-1 rounded-md flex flex-col ${
                                    isReqUserMsg
                                        ? "bg-[#005C4B]"
                                        : "bg-[#202C33]"
                                }`}
                            >
                                <div className="pl-2 text-yellow-400"><p className="">{message.createdBy.userid}</p></div>
                                <div className="flex flex-col">
                                    <div
                                        className={`${
                                            isReqUserMsg
                                                ? "bg-[#124e44]"
                                                : "bg-slate-800"
                                        } flex justify-between items-center p-1`}
                                    >
                                        <div className="flex space-x-1">
                                            {/* Default file icon */}
                                            <img
                                                src={DefaultFile}
                                                className="h-12 cursor-pointer"
                                                alt="Image"
                                            />
                                            <div className="flex flex-col ">
                                                {/* File name */}
                                                <div className="w-40">
                                                    <p className="text-gray-200 text-sm text-nowrap text-ellipsis overflow-hidden">
                                                        {message.fileName}
                                                    </p>
                                                </div>
                                                {/* File details */}
                                                <p className="text-gray-400 text-sm">
                                                    {
                                                        message.messageType.split(
                                                            "/"
                                                        )[1]
                                                    }{" "}
                                                    .{" "}
                                                    {(
                                                        message.fileSize /
                                                        (1024 * 1024)
                                                    ).toFixed(2)}{" "}
                                                    MB
                                                </p>
                                            </div>
                                        </div>
                                        {/* Download button */}
                                        <div
                                            className="text-gray-400 text-2xl cursor-pointer"
                                            onClick={downloadContent}
                                        >
                                            <BiDownload />
                                        </div>
                                    </div>
                                    {/* File note message */}
                                    <div className="flex justify-between">
                                        <p className="text-sm text-white">
                                            {message.noteMessage}
                                        </p>
                                        {/* Message timestamp */}
                                        <div className="flex items-center space-x-1 mt-2">
                                            <p className="text-xs text-gray-300 text-nowrap">
                                                {message.creationTime}
                                            </p>
                                            {/* Checkmark icon for sent messages */}
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
            )}
        </>
    )
}

export default MessageCard
