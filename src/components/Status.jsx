import React, { useEffect, useState } from "react";
import StatusCard from "./StatusCard";
import { IoMdArrowBack } from "react-icons/io";
import MyStatusCard from "./MyStatusCard";
import { BsLockFill } from "react-icons/bs";
import statusData from "../assets/statusData";
import StatusViewer from "./StatusViewer";
import { useSelector } from "react-redux";
import DefaultUser from '../assets/default-user.png'

const Status = ({ closeOpenStatus }) => {
    
    const [status, setStatus] = useState(statusData);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const {currentUser} = useSelector(state=>state.userStore);

    // Function to open the StatusViewer modal
    const openStatusViewer = (status) => {
        setSelectedStatus(status);
        setIsViewerOpen(true);
    };

    // Function to close the StatusViewer modal
    const closeStatusViewer = () => {
        setIsViewerOpen(false);
    };

    // Sample item for MyStatusCard
    const item = {
        statusImages: DefaultUser,
        statusTimeStamp: "no updates",
    };

    return (
        <div className="flex flex-col">
            {/* Status header */}
            <div className="w-full md:w-[40%] fixed top-0 z-50">
                <div className="w-full h-14 md:h-28 bg-[#222e35da] ">
                    <div className="w-full md:md:w-[40%] h-full flex flex-col justify-center md:justify-end">
                        <div className="flex space-x-5 items-center text-xl font-medium text-gray-300 ml-2 md:ml-6 md:mb-4">
                            <IoMdArrowBack
                                className="cursor-pointer text-2xl"
                                onClick={closeOpenStatus}
                            />
                            <p>Status</p>
                        </div>
                    </div>
                </div>
                <div className="px-2 mt-5">
                    <MyStatusCard {...item} />
                </div>
            </div>

            {/* User statuses */}
            <div className="mt-[140px] md:mt-[200px] w-full overflow-y-auto h-[65vh] ">
                <div>
                    <p className="text-base text-[#216b5d] p-8">RECENT</p>
                </div>

                {/* Display recent status cards */}
                <div className="flex flex-col space-y-2 ">
                    {statusData.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => openStatusViewer(item)}
                        >
                            <StatusCard {...item} />
                        </div>
                    ))}
                </div>

                {/* Info about end-to-end encryption */}
                <div className=" mx-auto">
                    <div className="w-[100%] py-8 flex items-center justify-center space-x-1 text-xs text-gray-400">
                        <BsLockFill className="text-xs text-gray-400" />
                        <p>
                            Your status updates are
                            <span className="text-[#53BDEB] ml-1">
                                end-to-end-encrypted
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* StatusViewer modal */}
            {isViewerOpen && (
                <StatusViewer
                    userName={selectedStatus.userName}
                    status={selectedStatus}
                    closeStatusViewer={closeStatusViewer}
                />
            )}
        </div>
    );
};

export default Status;
