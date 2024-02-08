import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const SelectedGroupMember = ({ handleRemoveMember, member }) => {
    return (
        <>
            <div className="flex items-center justify-center rounded-full">
                <img
                    className="w-7 h-7 rounded-full"
                    src="https://cdn.pixabay.com/photo/2016/03/27/21/52/woman-1284411_1280.jpg"
                    alt=""
                />
                <div className="w-full h-full my-auto">
                    <p className="text-gray-300 px-2 text-nowrap">
                        {member.userName}
                    </p>
                </div>

                <div className="w-full h-full pr-2 md:pr-3 flex items-center">
                    <IoCloseOutline
                        className="cursor-pointer text-gray-300 text-base rounded-full hover:bg-slate-400"
                        onClick={handleRemoveMember}
                    />
                </div>
            </div>
        </>
    );
};

export default SelectedGroupMember;
