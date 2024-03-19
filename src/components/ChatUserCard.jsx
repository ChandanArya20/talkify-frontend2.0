import React from "react";
import DefaultUser from '../assets/default-user.png'

const ChatUserCard = ({profileImage, name, userid, about}) => {
  
    return (
        <div className="w-[98%] p-3 border-t-2 border-gray-800 flex justify-between cursor-pointer hover:bg-[#222E35]">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white cursor-pointer">
                    <img
                        className=" w-full h-full rounded-full object-cover"
                        src={profileImage || DefaultUser}
                        alt=""
                    />
                </div>
                <div >
                    <div>
                        <p className="text-base font-medium text-gray-200">
                            {name}
                        </p>
                    </div>
                    <div className="flex items-center space-x-1">
                        {/* <p className="text-sm text-gray-100">{about || "Hey there! I am using Talkify"}</p> */}
                        <p className="text-sm text-gray-100">{userid}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatUserCard;
