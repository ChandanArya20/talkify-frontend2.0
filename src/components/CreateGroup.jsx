import React, { useEffect, useState } from "react";
import { IoIosSearch, IoMdArrowBack } from "react-icons/io";
import SelectedGroupMember from "./SelectedGroupMember";
import chatUserData from "../assets/chatUserData";
import ChatUserCard from "./ChatUserCard";
import { IoMdArrowForward } from "react-icons/io";
import NewGroup from "./NewGroup";

const CreateGroup = ({ closeOpenCreateGroup }) => {
    
    const [groupMember, setGroupMember] = useState(new Set());  // State to manage the selected group members
    const [query, setQuery] = useState("");
    // State to store chat users
    const [chatUsers, setChatUsers] = useState(chatUserData);
    const [isNewGroup, setIsNewGroup]=useState(false);

    // Function to handle removal of a group member
    const handleRemoveMember = (item) => {
        const newGroupMember = new Set(groupMember);
        newGroupMember.delete(item);
        setGroupMember(newGroupMember);
    };

    // Effect to filter out selected group members from the available chat users
    useEffect(() => {
        const filteredChatUsers = chatUserData.filter(
            (chatUser) => !groupMember.has(chatUser)
        );
        setChatUsers(filteredChatUsers);
    }, [groupMember]);

    // Function to add a group member
    const addGroupMember = (item) => {
        const newGroupMember = new Set(groupMember);
        newGroupMember.add(item);
        setGroupMember(newGroupMember);
        setQuery("");
    };

    // Function to handle search
    const handleSearch = (query) => {
        const filteredChatUsers = chatUserData.filter((chatUser) =>
            chatUser.userName.toLowerCase().includes(query.toLowerCase())
        );
        setChatUsers(filteredChatUsers);
    };

    const closeNewGroup=()=>{
        setIsNewGroup(false);
    }

    return (
        <>
        {
            !isNewGroup ?
            <div className="flex w-full h-full flex-col justify-between">
                {/* Group header */}
                <div className="w-full h-14 md:h-28 bg-[#222e35] ">
                    <div className="w-full h-full flex flex-col justify-center md:justify-end">
                        <div className="w-full flex space-x-5 items-center text-xl font-semibold text-gray-300 ml-2 md:ml-6 md:mb-4">
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
                            Array.from(groupMember).map((item, index) => (
                                <div key={index} className="pb-2">
                                    <SelectedGroupMember
                                        member={item}
                                        handleRemoveMember={() =>
                                            handleRemoveMember(item)
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
                                setQuery(e.target.value);
                                handleSearch(e.target.value);
                            }}
                        />
                    </div>
                </div>

                {/* Display available chat users */}
                <div className="flex-1 overflow-y-scroll mt-5">
                    {chatUsers.map((item, index) => (
                        <div key={index} onClick={() => addGroupMember(item)}>
                            <ChatUserCard {...item} />
                        </div>
                    ))}
                </div>

                {/* Display forward arrow if there are selected group members */}
                {groupMember.size > 0 && (
                    <div className="w-full h-28 bg-[#111B21] flex items-center justify-center">
                        <div className="w-12 h-12 bg-[#00A884] rounded-full flex items-center justify-center">
                            <IoMdArrowForward 
                                className="text-white text-2xl cursor-pointer" 
                                onClick={()=>setIsNewGroup(true)}
                            />
                        </div>
                    </div>
                )}
            </div> :

            <NewGroup closeNewGroup={closeNewGroup} />

            
        }
        </>
    );
};

export default CreateGroup;
