import { PiCircleDashedBold } from "react-icons/pi";
import { RiChatNewLine } from "react-icons/ri";
import { MdDelete, MdOutlineChat, MdOutlineStar } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiWechat2Line } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosSearch, IoIosShareAlt, IoMdArrowBack } from "react-icons/io";
import { IoClose, IoFilter } from "react-icons/io5";
import DefaultUser from "../assets/default-user.png";
import ChatCard from "../components/ChatCard";
import { useEffect, useState } from "react";
import ChatDetails from "../components/ChatDetails";
import Profile from "../components/Profile";
import { useNavigate } from "react-router-dom";
import Status from "../components/Status";
import { Checkbox, Menu, MenuItem } from "@mui/material";
import applogo from "../assets/applogo.png";
import CreateGroup from "../components/CreateGroup";
import AddNewUser from "../components/AddNewUser";
import HomePageImage from "../assets/login-image.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Auth/action";
import { getUsersChat } from "../Redux/Chat/action";
import axios from "axios";
import SearchMessages from "../components/SearchMessages";

function HomePage() {
    
    const { isAuthenticated, currentUser } = useSelector(
        (state) => state.userStore
    );
    const navigate = useNavigate();

    useEffect(() => {
        !isAuthenticated && navigate("/signing");
    }, [isAuthenticated]);

    const [query, setQuery] = useState("");
    const [isFilterClicked, setIsFilterClicked] = useState(false);
    const [currentChat, setCurrentChat] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [isProfile, setIsProfile] = useState(false);
    const [isStatus, setIsStatus] = useState(false);
    const [isGroup, setIsGroup] = useState(false);
    const [isAddNewUser, setIsAddNewUser] = useState(false);
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const dispatch = useDispatch();
    const { chats, createdChat, createdGroup } = useSelector(
        (store) => store.chatStore
    );
    const [selectedChats, setSelectedChats] = useState([]);
    const [filteredChats, setFilteredChats] = useState([]);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [showCheckbox, setShowCheckbox] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    // Function to handle opening the dropdown menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // Function to handle closing the dropdown menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorE2, setAnchorE2] = useState(null);
    const open2 = Boolean(anchorE2);
    // Function to handle opening the dropdown menu
    const handleClick2 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    // Function to handle closing the dropdown menu
    const handleClose2 = () => {
        setAnchorE2(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getUsersChat());
            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    if (error?.response.status === 400) {
                        dispatch(logout());
                    }
                }
            }
        };

        fetchData(); // Call the function immediately
    }, [createdChat, createdGroup]);

    const rearrangeChats = () => {
        // Iterate through chats to identify chats with new messages
        const chatsWithNewMessages = [];
        const chatsWithoutNewMessages = [];

        for (let chat of chats) {
            if (chat.messages.length === 0) {
                chatsWithoutNewMessages.push(chat);
                continue;
            }
            const lastMessage = chat.messages[chat.messages.length - 1];
            const isLastMessageFromCurrentUser =
                lastMessage && lastMessage.createdBy.id === currentUser.id;

            if (!isLastMessageFromCurrentUser) {
                chatsWithNewMessages.push(chat);
            } else {
                chatsWithoutNewMessages.push(chat);
            }
        }

        // Further separate chatsWithoutNewMessages into two arrays based on empty messages
        const chatsWithEmptyMessages = chatsWithoutNewMessages.filter(
            (chat) => !chat.messages.length
        );
        const chatsWithoutEmptyMessages = chatsWithoutNewMessages.filter(
            (chat) => chat.messages.length
        );

        // Combine the arrays, putting chats with new messages first and those without empty messages first
        const rearrangedChats = [
            ...chatsWithNewMessages,
            ...chatsWithoutEmptyMessages,
            ...chatsWithEmptyMessages,
        ];

        // Update filteredChats with the rearranged array
        setFilteredChats(rearrangedChats);
    };

    useEffect(() => {
        console.log(chats);
        rearrangeChats();
    }, [chats]);

    useEffect(() => {
        console.log(filteredChats);
    }, [filteredChats]);

    // Function to filter chats based on the search query
    const handleSearch = (query) => {
        const filteredChats = chats.filter((chat) => {
            if (chat.isGroup) {
                return chat.chatName
                    .toLowerCase()
                    .includes(query.toLowerCase());
            } else {
                const chatUser = chat.members.filter(
                    (member) => member.id !== currentUser.id
                )[0];
                return chatUser.name
                    .toLowerCase()
                    .includes(query.toLowerCase());
            }
        });
        setFilteredChats(filteredChats);
    };

    // Function to handle clicking the filter button
    const handleFilterClick = () => {
        setIsFilterClicked(!isFilterClicked);
    };

    useEffect(() => {
        if (isFilterClicked) {
            const chatsWithNewMessages = [];

            for (let chat of chats) {
                if (chat.messages.length === 0) {
                    continue;
                }
                const lastMessage = chat.messages[chat.messages.length - 1];
                const isLastMessageFromCurrentUser =
                    lastMessage && lastMessage.createdBy.id === currentUser.id;

                if (!isLastMessageFromCurrentUser) {
                    chatsWithNewMessages.push(chat);
                }
            }
            console.log(chatsWithNewMessages);
            setFilteredChats(chatsWithNewMessages);
        } else {
            rearrangeChats();
        }
    }, [isFilterClicked]);

    // Function to handle clicking on the current chat
    const handleCurrentChatClick = (chat) => {
        if (selectedChat?.id == chat.id) {
            return;
        }
        setSelectedChat(chat);
        // Navigate to chat details on small devices, otherwise set the current chat
        if (window.innerWidth < 640) {
            navigate("/chat-details", { state: chat });
        } else {
            setCurrentChat(true);
        }
    };

    // Function to handle clicking on the user's profile
    const handleProfileClick = () => {
        setIsProfile(true);
    };

    // Function to close the user's profile
    const closeOpenProfile = () => {
        setIsProfile(false);
    };

    // Function to close and open the status section
    const closeOpenStatus = () => {
        setIsStatus(false);
    };

    // Function to close and open the create group section
    const closeOpenCreateGroup = () => {
        setIsGroup(false);
    };

    // Function to handle creating a group
    const handleCreateGroup = () => {
        setIsGroup(true);
        handleClose();
    };

    const closeAddNewUserSection = () => {
        setIsAddNewUser(false);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const closeChatDetails = () => {
        setCurrentChat(false);
        setSelectedChat(null);
    };

    const handleSelectChat=(chat)=>{

        setSelectedChats(prev => {

            if (prev.includes(chat)) {
                // Message is already selected, remove it
                return prev.filter(chatItem => chatItem.id !== chat.id);
            } else {
                // Message is not in the selected list, add it
                return [...prev, chat];
            }
        });
    }
    
    const handleSelectChatClick=()=>{
        setShowCheckbox(true);
        handleClose();
    }

    const handleCloseChatSelected=()=>{
        setShowCheckbox(false);
        setSelectedChats([]);
    }

    return (
        <div className="w-full h-screen bg-[#222E35] flex overflow-hidden">
            {/* Left Section */}
            <div className="w-[100%] md:w-[40%] bg-[#111B21] relative">
                {isProfile && <Profile closeOpenProfile={closeOpenProfile} />}
                {isStatus && <Status closeOpenStatus={closeOpenStatus} />}
                {isGroup && (
                    <CreateGroup closeOpenCreateGroup={closeOpenCreateGroup} />
                )}
                {isAddNewUser && (
                    <AddNewUser
                        closeAddNewUserSection={closeAddNewUserSection}
                    />
                )}

                {!isProfile && !isStatus && !isGroup && !isAddNewUser && (
                    <>
                        {/* Header */}
                        <div className="h-14 bg-[#222e35da] flex items-center">
                            <div className="w-[95%] mx-auto flex justify-between">
                                <div
                                    className="w-10 h-10 rounded-full bg-white cursor-pointer"
                                    onClick={handleProfileClick}
                                >
                                    <img
                                        className=" w-full h-full rounded-full object-cover"
                                        src={
                                            currentUser?.profileImage ||
                                            DefaultUser
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="flex space-x-7 text-2xl my-auto text-gray-400">
                                    <FaPeopleGroup
                                        className="cursor-pointer"
                                        onClick={() => setIsGroup(true)}
                                    />
                                    <PiCircleDashedBold
                                        className="cursor-pointer"
                                        onClick={() => setIsStatus(true)}
                                    />
                                    {/* <RiWechat2Line className="cursor-pointer" /> */}
                                    <RiChatNewLine
                                        className="cursor-pointer"
                                        onClick={() => setIsAddNewUser(true)}
                                    />
                                    <div>
                                        <BiDotsVerticalRounded
                                            className="cursor-pointer"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                "aria-labelledby":
                                                    "basic-button",
                                            }}
                                        >
                                            <MenuItem
                                                onClick={handleCreateGroup}
                                            >
                                                New group
                                            </MenuItem>
                                            {/* <MenuItem onClick={handleClose}>
                                                New community
                                            </MenuItem> */}
                                            <MenuItem onClick={handleClose}>
                                                Starred messages
                                            </MenuItem>
                                            {
                                                !showCheckbox &&
                                                <MenuItem onClick={handleSelectChatClick}>
                                                    Select Chats
                                                </MenuItem>
                                            }
                                            <MenuItem onClick={handleClose}>
                                                Settings
                                            </MenuItem>
                                            <MenuItem onClick={handleLogout}>
                                                Log out
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Search Bar */}
                        <div className="ml-3 mt-2 flex items-center">
                            <div className="w-[87%] md:w-[92%] h-9 rounded-lg flex justify-items-start items-center space-x-4 md:space-x-6 bg-[#202C33]">
                                <div className="w-12 h-12 ml-1 flex items-center justify-center">
                                    {!isSearchClicked ? (
                                        <IoIosSearch
                                            className="text-gray-400 text-xl cursor-pointer"
                                            onClick={() =>
                                                setIsSearchClicked(true)
                                            }
                                        />
                                    ) : (
                                        <IoMdArrowBack
                                            className="text-[#00A884] text-2xl cursor-pointer"
                                            onClick={() =>
                                                setIsSearchClicked(false)
                                            }
                                        />
                                    )}
                                </div>
                                <input
                                    type="text"
                                    className="bg-transparent focus:outline-none text-white text-sm w-full"
                                    placeholder="Search or start new chat"
                                    autoFocus={isSearchClicked}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        handleSearch(e.target.value);
                                    }}
                                    onClick={() => setIsSearchClicked(true)}
                                />
                            </div>
                            <div
                                className={`m-auto w-8 h-8 md:w-6 md:h-6 rounded-full flex items-center justify-center ${
                                    isFilterClicked ? "bg-[#00A884]" : ""
                                }`}
                                onClick={handleFilterClick}
                            >
                                <IoFilter
                                    className={`text-xl md:text-base cursor-pointer ${
                                        isFilterClicked
                                            ? "text-white"
                                            : "text-gray-400"
                                    }`}
                                />
                            </div>
                        </div>
                        {/* Chat Cards */}
                        <div className="w-full h-[83vh] ml-3 mt-2 overflow-y-scroll pb-5 pr-4">
                            {filteredChats.map((chat) => (
                                <div
                                    className="flex"
                                    key={chat.id}
                                >
                                    { showCheckbox && <Checkbox {...label} style={{ color: 'green' }} size="small" onClick={()=>handleSelectChat(chat)}/> }
                                    <div className="flex-1" onClick={() => handleCurrentChatClick(chat)}>
                                        <ChatCard
                                            {...chat}
                                            selectedChatId={selectedChat?.id}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {
                    showCheckbox &&
                    <div className=" bg-[#1F2B32] w-full h-14 flex items-center justify-between absolute top-14 z-200 px-5">
                        <div className="flex space-x-5">
                            <IoClose  className="text-gray-400 text-2xl cursor-pointer" onClick={handleCloseChatSelected} />
                            <p className="text-gray-300">{`${selectedChats.length} selected`}</p>
                        </div> 
                        {
                            selectedChats.length > 0 &&
                            <div>
                                <div className="text-gray-400 text-xl rotate-90">
                                    <BiDotsVerticalRounded className="cursor-pointer" onClick={handleClick2}/>
                                </div>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorE2}
                                open={open2}
                                onClose={handleClose2}
                                MenuListProps={{
                                    "aria-labelledby":
                                        "basic-button",
                                }}
                            >
                                <MenuItem onClick={handleClose2}>
                                    Mark as unread
                                </MenuItem>
                                <MenuItem onClick={handleClose2}>
                                    Mute notifications
                                </MenuItem>
                            </Menu>
                        </div>
                           
                        }
                    </div>
                }
            </div>

            {/* Right Section */}
            <div className="hidden md:flex md:w-[60%] border-l-2 border-slate-800">
                {currentChat ? (
                    <ChatDetails
                        chatData={selectedChat}
                        closeChatDetails={closeChatDetails}
                    />
                ) : (
                    <div className="w-full h-screen flex flex-col items-center justify-center">
                        {/* Image */}
                        <div className="w-[270px]">
                            <img
                                className="w-full rounded-md bg-slate-700"
                                src={HomePageImage}
                                alt=""
                            />
                            <div className="flex flex-col items-center relative bottom-7">
                                <img src={applogo} className="w-16" alt="" />
                                <h1 className="text-[#864AF9] text-2xl font-bold">
                                    Talkify
                                </h1>
                            </div>
                        </div>
                        {/* Text Content */}
                        <div className="text-white text-center space-y-5">
                            <h1 className="text-4xl text-gray-200">
                                Connect With Your Loved Ones
                            </h1>
                            <p className="text-sm text-gray-400">
                                Connect with your loved ones effortlessly. Stay
                                in touch, <br />
                                share moments, and create lasting memories.
                                Whether near or far, <br />
                                bring your conversations.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
