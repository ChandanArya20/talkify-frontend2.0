import React, { useEffect, useState } from "react"
import { IoMdArrowBack } from "react-icons/io"
import SelectedGroupMember from "./SelectedGroupMember"
import ChatUserCard from "./ChatUserCard"
import { IoMdArrowForward } from "react-icons/io"
import NewGroup from "./NewGroup"
import { useDispatch, useSelector } from "react-redux"
import { SearchUser } from "../Redux/Auth/action"

const CreateGroup = ({ closeOpenCreateGroup }) => {
    
    const [groupMember, setGroupMember] = useState(new Set())
    const [query, setQuery] = useState("")
    // Redux state management
    const userStore = useSelector((state) => state.userStore)
    const [chatUsers, setChatUsers] = useState([]) // State to store chat users
    const [isNewGroup, setIsNewGroup] = useState(false) // State to manage new group creation
    const dispatch = useDispatch()

    // Update chat users when searched users change
    useEffect(() => {
        setChatUsers(userStore.searchedUsers)
    }, [userStore.searchedUsers])

    console.log(chatUsers)
    console.log(groupMember)

    // Function to add a group member
    const addGroupMember = (user) => {
        const newGroupMember = new Set(groupMember)
        newGroupMember.add(user)
        setGroupMember(newGroupMember)
        setQuery("")
    }

    // Filter out selected group members from available chat users
    useEffect(() => {
        const filteredChatUsers = userStore.searchedUsers.filter(
            (chatUser) => !groupMember.has(chatUser)
        )
        setChatUsers(filteredChatUsers)
    }, [groupMember])

    // Function to handle removal of a group member
    const handleRemoveMember = (user) => {
        const newGroupMember = new Set(groupMember)
        newGroupMember.delete(user)
        setGroupMember(newGroupMember)
    }

    // Function to handle search
    const handleSearch = (query) => {
        dispatch(SearchUser(query))
    }

    // Function to close the new group creation modal
    const closeNewGroup = () => {
        setIsNewGroup(false)
    }

    return (
        <>
            {!isNewGroup ? (
                // If not creating a new group, display group creation interface
                <div className="flex w-full h-full flex-col justify-between">
                    {/* Group header */}
                    <div className="w-full h-14 md:h-28 bg-[#222e35] ">
                        <div className="w-full h-full flex flex-col justify-center md:justify-end">
                            <div className="w-full flex space-x-5 items-center text-xl font-semibold text-gray-300 ml-2 md:ml-6 md:mb-4">
                                {/* Back button */}
                                <IoMdArrowBack
                                    className="cursor-pointer text-2xl"
                                    onClick={closeOpenCreateGroup}
                                />
                                <p>Add group members</p>
                            </div>
                        </div>
                    </div>

                    {/* Display selected group members */}
                    <div className="w-full pt-5 px-2 md:px-8">
                        <div className="flex flex-wrap">
                            {groupMember.size > 0 &&
                                Array.from(groupMember).map((user, index) => (
                                    <div key={index} className="pb-2">
                                        <SelectedGroupMember
                                            user={user}
                                            handleRemoveMember={() =>
                                                handleRemoveMember(user)
                                            }
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Search input */}
                    <div className="w-full pb-5 px-2 md:px-8 pt-3">
                        <div className="w-full rounded-lg ">
                            <input
                                type="text"
                                className="bg-transparent focus:outline-none text-white text-sm w-full border-b-2 border-slate-800 p-1"
                                placeholder="Search a name or number"
                                autoFocus
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                    handleSearch(e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    {/* Display available chat users */}
                    <div className="flex-1 overflow-y-scroll mt-5">
                        {chatUsers.map((user, index) => (
                            <div
                                key={index}
                                onClick={() => addGroupMember(user)}
                            >
                                <ChatUserCard {...user} />
                            </div>
                        ))}
                    </div>

                    {/* Display forward arrow if there are selected group members */}
                    {groupMember.size > 0 && (
                        <div className="w-full h-20 bg-slate-700 flex items-center justify-center">
                            <div className="w-12 h-12 bg-[#00A884] rounded-full flex items-center justify-center">
                                <IoMdArrowForward
                                    className="text-white text-2xl cursor-pointer"
                                    onClick={() => setIsNewGroup(true)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                // If creating a new group, display new group creation modal
                <NewGroup
                    closeNewGroup={closeNewGroup}
                    closeOpenCreateGroup={closeOpenCreateGroup}
                    groupMembersId={Array.from(groupMember).map(
                        (member) => member.id
                    )}
                />
            )}
        </>
    )
}

export default CreateGroup
