import React from "react";

const ChatUserCard = ({ name, profileImage, about }) => {
    return (
        <div className="w-[98%] p-3 border-t-2 border-gray-800 flex justify-between cursor-pointer hover:bg-[#222E35]">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white cursor-pointer">
                    <img
                        className=" w-full h-full rounded-full object-cover"
                        src={profileImage || 'https://cdn.pixabay.com/photo/2016/03/27/21/52/woman-1284411_1280.jpg'}
                        alt=""
                    />
                </div>
                <div className="">
                    <div>
                        <p className="text-base font-medium text-gray-200">
                            {name}
                        </p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <p className="text-sm text-gray-100">{about || "Hey there! I am using Talkify"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatUserCard;
