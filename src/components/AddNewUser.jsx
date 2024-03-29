import React, { useState } from "react"
import { IoIosSearch, IoMdArrowBack, IoMdArrowForward } from "react-icons/io"
import ChatUserCard from "./ChatUserCard"
import { useDispatch, useSelector } from "react-redux"
import { SearchUser } from "../Redux/Auth/action"
import { createChat } from "../Redux/Chat/action"

const AddNewUser = ({ closeAddNewUserSection }) => {
    // State variables
    const [query, setQuery] = useState("")
    const [isSearchClicked, setIsSearchClicked] = useState(false)

    // Redux hooks
    const userStore = useSelector((state) => state.userStore) // Accessing user store from Redux state
    const dispatch = useDispatch()

    // Function to handle search
    const handleSearch = (query) => {
        dispatch(SearchUser(query)) 
    }

    // Function to create a chat with a user
    const handleCreateChat = (participantId) => {
        dispatch(createChat(participantId)) 
        closeAddNewUserSection()
    }

    return (
        <div className="flex w-full h-full flex-col justify-between">
            {/* Header */}
            <div className="w-full h-14 md:h-28 bg-[#222e35]">
                <div className="w-full h-full flex flex-col justify-center md:justify-end">
                    <div className="w-full flex space-x-7 items-center font-semibold text-gray-300 ml-2 md:ml-6 md:mb-4">
                        {/* Back button */}
                        <IoMdArrowBack
                            className="cursor-pointer text-2xl"
                            onClick={closeAddNewUserSection}
                        />
                        <p className="text-xl">New chat</p>
                    </div>
                </div>
            </div>

            {/* Search input */}
            <div className="h-9 rounded-lg flex justify-items-start items-center space-x-3 md:space-x-4 bg-[#202C33] my-2 mx-1 md:mx-3">
                <div className="w-12 h-12 ml-1 flex items-center justify-center">
                    {/* Toggle search button */}
                    {!isSearchClicked ? (
                        <IoIosSearch
                            className="text-gray-400 text-xl cursor-pointer"
                            onClick={() => setIsSearchClicked(true)}
                        />
                    ) : (
                        <IoMdArrowBack
                            className="text-[#00A884] text-2xl cursor-pointer"
                            onClick={() => setIsSearchClicked(false)}
                        />
                    )}
                </div>
                {/* Search input field */}
                <input
                    type="text"
                    className="bg-transparent focus:outline-none text-white text-sm w-full"
                    placeholder="Search userid or name"
                    autoFocus={isSearchClicked}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        handleSearch(e.target.value) 
                    }}
                    onClick={() => setIsSearchClicked(true)}
                />
            </div>

            {/* Display searched results */}
            <div className="flex-1 overflow-y-scroll">
                <div>
                    <p className="text-base text-[#00a884ab] p-8">
                        SEARCHED RESULTS
                    </p>
                </div>

                {/* Display available chat users */}
                <div>
                    {userStore?.searchedUsers?.map((user, index) => (
                        <div
                            key={index}
                            onClick={() => handleCreateChat(user.id)}
                        >
                            {/* Render ChatUserCard for each user */}
                            <ChatUserCard {...user} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddNewUser
