import React, { useEffect, useState } from "react";
import { stories } from "../assets/Stories";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import {
    MdOutlineArrowBackIos,
    MdOutlineArrowForwardIos,
    MdOutlineClose,
} from "react-icons/md";
import { FaRegFaceSmile, FaPlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import ProgressBar from "./ProgressBar";
import StatusCard from "./StatusCard";
import { useNavigate } from "react-router-dom";

const StatusViewer = ({ userName, status, closeStatusViewer }) => {

    const [currentStoriesIndex, setCurrentStoriesIndex] = useState(0);
    // State to manage the active index for progress bar
    const [activeIndex, setActiveIndex] = useState(0);
    const [replyMessage, setReplyMessage] = useState("");
    const navigate = useNavigate();

    // Check if the device is small (mobile)
    const isSmallDevice = window.innerWidth < 640;

    // Function to handle advancing to the next story
    const handleNextStory = () => {
        if (currentStoriesIndex < stories.length - 1) {
            setCurrentStoriesIndex(currentStoriesIndex + 1);
            setActiveIndex(activeIndex + 1);
        } else {
            setCurrentStoriesIndex(0);
            setActiveIndex(0);
        }
    };

    // Function to handle going back to the previous story
    const handleBackStory = () => {
        if (currentStoriesIndex > 0) {
            setCurrentStoriesIndex(currentStoriesIndex - 1);
            setActiveIndex(activeIndex - 1);
        } else {
            setCurrentStoriesIndex(0);
            setActiveIndex(0);
        }
    };

    // Auto-advance to the next story every 3 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            handleNextStory();
        }, 3000);

        // Cleanup: Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [currentStoriesIndex]);

    // Function to handle sending a reply message
    const handleReplyMessage = () => {
        // Handle sending the reply message
    };

    // Sample item for StatusCard
    const item = {
        userName: userName,
        statusImages:
            "https://cdn.pixabay.com/photo/2016/03/27/21/52/woman-1284411_1280.jpg",
        statusTimeStamp: "8h ago",
    };

    return (
        <div className="w-full h-screen bg-[#222E35] overflow-hidden absolute z-50">
            {/* Left arrow and close button */}
            <div className="fixed left-0 top-0 flex flex-col text-white text-2xl h-full space-y-52 ml-2 md:mr-5 z-10">
                <div className="h-14 flex space-x-2 items-center">
                    <IoMdArrowBack
                        className="cursor-pointer text-3xl md:text-2xl"
                        onClick={closeStatusViewer}
                    />
                    <StatusCard {...item} />
                </div>
                {currentStoriesIndex > 0 && (
                    <div
                        className={`w-10 h-10 rounded-full ${
                            isSmallDevice ? "bg-[#3741513c]" : "bg-gray-700"
                        } flex items-center justify-center`}
                    >
                        {/* Back arrow for stories */}
                        <MdOutlineArrowBackIos
                            className="cursor-pointer"
                            onClick={handleBackStory}
                        />
                    </div>
                )}
            </div>

            {/* Story content */}
            <div className="flex flex-1 justify-center mt-20 md:mt-5">
                <div className="relative h-[75vh] md:h-[84vh]">
                    {/* Story image */}
                    <img
                        className="max-h-[75vh] md:max-h-[84vh] object-contain bg-white"
                        src={stories?.[currentStoriesIndex].image}
                        alt=""
                    />
                    {/* Progress bar */}
                    <div className="absolute top-0 w-full flex space-x-2 mt-2">
                        {stories.map((item, index) => (
                            <ProgressBar
                                key={index}
                                duration={3000}
                                index={index}
                                activeIndex={activeIndex}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right arrow and close button */}
            <div className="fixed right-0 top-0 flex flex-col items-end text-white text-2xl h-full space-y-52 mr-2 md:mr-5 z-10">
                <div className="h-20 py-4">
                    {!isSmallDevice && (
                        <MdOutlineClose
                            className="cursor-pointer"
                            onClick={closeStatusViewer}
                        />
                    )}
                </div>
                {currentStoriesIndex < stories.length - 1 && (
                    <div
                        className={`w-10 h-10 rounded-full ${
                            isSmallDevice ? "bg-[#3741513c]" : "bg-gray-700"
                        } flex items-center justify-center`}
                    >
                        {/* Forward arrow for stories */}
                        <MdOutlineArrowForwardIos
                            className="cursor-pointer"
                            onClick={handleNextStory}
                        />
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center fixed bottom-3 z-20 w-full">
                <div>
                    <div className="bg-[#111b21a6] rounded-lg">
                        <div className="w-full h-14 flex items-center justify-between mx-auto">
                            {/* Smile and Plus icons */}
                            <div className="flex space-x-6 p-4 text-2xl my-auto text-gray-400">
                                <FaRegFaceSmile className="cursor-pointer" />
                            </div>
                            {/* Input for text message */}
                            <div className="w-[85%] h-10 rounded-lg flex justify-items-start items-center space-x-8 bg-[#2A3942]">
                                <input
                                    type="text"
                                    className="bg-transparent focus:outline-none text-white text-sm w-full p-4 md:min-w-[50vw]"
                                    placeholder="Search or start new chat"
                                    value={replyMessage}
                                    onChange={(e) =>
                                        setReplyMessage(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleReplyMessage();
                                            setReplyMessage("");
                                        }
                                    }}
                                />
                            </div>
                            {/* Send button or microphone based on text input */}
                            <div className="p-4">
                                <IoSend
                                    className="cursor-pointer text-[#8696A0] text-2xl"
                                    onClick={handleReplyMessage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusViewer;
