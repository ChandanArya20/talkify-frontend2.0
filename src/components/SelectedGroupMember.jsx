import React from "react"
import { IoCloseOutline } from "react-icons/io5"
import DefaultUser from "../assets/default-user.png"

const SelectedGroupMember = ({ handleRemoveMember, user }) => {
    return (
        <>
            <div className="flex items-center justify-center rounded-full">
                <img
                    className="w-7 h-7 rounded-full"
                    src={user.profileImage || DefaultUser}
                    alt=""
                />
                <div className="w-full h-full my-auto">
                    <p className="text-gray-300 px-2 text-nowrap">
                        {user.name}
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
    )
}

export default SelectedGroupMember
