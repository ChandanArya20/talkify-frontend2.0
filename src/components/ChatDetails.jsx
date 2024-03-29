import { BiDotsVerticalRounded } from "react-icons/bi"
import {
    IoIosSearch,
    IoIosShareAlt,
    IoMdArrowBack,
    IoMdPerson,
    IoMdPhotos,
} from "react-icons/io"
import { GrEmoji } from "react-icons/gr"
import { HiMicrophone } from "react-icons/hi2"
import { useEffect, useRef, useState } from "react"
import { IoClose, IoDocumentText, IoSend } from "react-icons/io5"
import MessageCard from "./MessageCard"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
    addNewMessage,
    deleteSelectedMessages,
    setAllMessages,
    setNextPageMessagesFromServer,
} from "../Redux/Message/action"
import DefaultUser from "../assets/default-user.png"
import DefaultGroup from "../assets/default-group.png"
import sockjs, { log } from "sockjs-client/dist/sockjs"
import Stomp from "stompjs"
import { BASE_API_URL } from "../config/api"
import {
    deleteALLMessagesByChatId,
    deleteChat,
    deleteSelecetdMessagesByChatId,
    updateMessageInChat,
} from "../Redux/Chat/action"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { AiOutlineClose } from "react-icons/ai"
import { Checkbox, Menu, MenuItem } from "@mui/material"
import { MdCameraAlt, MdDelete, MdOutlineStar } from "react-icons/md"
import { BsPlusLg } from "react-icons/bs"
import ContactInfo from "./ContactInfo"
import SearchMessages from "./SearchMessages"
import MultiMediaShare from "./MultiMediaShare"
import { toast } from "react-toastify"
import axios from "axios"

function ChatDetails({ chatData, closeChatDetails }) {
    // Hooks for navigation, location, and dispatch
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const [textMessage, setTextMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const { currentUser } = useSelector((state) => state.userStore)
    const messageStore = useSelector((state) => state.messageStore)
    const { chats } = useSelector((state) => state.chatStore)

    const finalChatData = location.state || chatData
    const { chatName, chatImage, isGroup, members } = finalChatData

    const chatUser = members?.filter(
        (member) => member.id !== currentUser.id
    )[0]

    const [stompClient, setStompClient] = useState()
    const [isConnect, setIsConnect] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)
    const [showContentShare, setShowContentShare] = useState(false)
    const [showContactInfo, setShowContactInfo] = useState(false)
    const [showSearchMessages, setShowSearchMessages] = useState(false)
    const [showMediaShare, setShowMediaShare] = useState(false)
    const [showCheckbox, setShowCheckbox] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(true)

    const latestMessagesRef = useRef(messageStore.messages)
    const chatContainerRef = useRef(null)

    const label = { inputProps: { "aria-label": "Checkbox demo" } }
    const [selectedMessages, setSelectedMessages] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])
    const [page, setPage] = useState(1)
    const [previousPage, setPreviousPage] = useState(1)
    const isSmallDevice = window.innerWidth < 640

    // Effect to scroll to the bottom when messageList updates
    useEffect(() => {
        scrollToBottom()
    }, [messageList])

    useEffect(()=>{
        setTimeout(()=>{ 
            console.log("SetTimeout");
            setIsLoadingMore(false)
        }, 1000) 
    },[])

    const changePageNumber = ()=>{
        console.log("changePageNumber");
        setTimeout(()=>{ 
            setPage((prevPage) => prevPage + 1);
        }, 1000)
    }

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }

    // Effect to log selectedMessages
    useEffect(() => {
        console.log(selectedMessages)
    }, [selectedMessages])

    const handleScroll = () => {
        console.log("handleScroll");
        console.log(page);
        console.log(isLoadingMore);
        const chatContainer = chatContainerRef.current;
    
        // Calculate how far the user has scrolled from the bottom
        const scrollDistanceFromBottom = chatContainer.scrollHeight - chatContainer.clientHeight - chatContainer.scrollTop;
        console.log(scrollDistanceFromBottom);

        // Calculate 70% of the container height
        const seventyPercentOfContainerHeight = 0.7 * chatContainer.scrollHeight;
        console.log(seventyPercentOfContainerHeight);
    
        // Check if the user has scrolled 70% from the bottom
        if (!isLoadingMore && scrollDistanceFromBottom <= seventyPercentOfContainerHeight) {
            console.log("Condition for changing page");
            changePageNumber()
            setIsLoadingMore(true);
        }
    }
    

    // useEffect(() => {    

    //     chatContainerRef.current.addEventListener("scroll", handleScroll)

    //     return () => {
    //         chatContainerRef.current.removeEventListener("scroll", handleScroll)
    //     }

    // }, [isLoadingMore])

    useEffect(() => {
        
        const fetchMessagesFromServer = async()=>{
            
            let resData=[];
            try {
                if (page > 1) {

                    setPreviousPage(pre=>pre+1)
    
                    const response = await axios.get(`${BASE_API_URL}/api/message/${finalChatData.id}?page=${previousPage+1}&size=${10}`, 
                    { withCredentials: true })
    
                    resData = response.data
                    console.log(resData)
                       
                    if (resData.length === 0) {
                        chatContainerRef.current.removeEventListener("scroll", handleScroll)
                    } else {
                        dispatch(setNextPageMessagesFromServer(resData))
                    }
                }
            } catch (error) {
                console.log(error)
            } finally{
                if (resData.length > 0) {
                    setIsLoadingMore(false)
                }
            }
        }

        fetchMessagesFromServer()
    }, [page])

    useEffect(()=>{
        console.log(page);
    },[page])

    // Function to add an emoji to the text message
    const addEmoji = (emoji) => {
        setTextMessage((prevValue) => prevValue + emoji.native)
    }

    // Function to handle emoji click
    const handleEmojiClick = () => {
        setShowContentShare(false)
        setShowEmoji((pre) => !pre)
    }

    // Function to handle content share click
    const handleContentShareClick = () => {
        setShowEmoji(false)
        setShowContentShare((pre) => !pre)
    }

    // Effect to close content share when showEmoji changes
    useEffect(() => {
        setShowContentShare(false)
    }, [showEmoji])

    // State and effect for anchorEl for menu
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // Effect to reset states when chat changes
    useEffect(() => {
        setShowEmoji(false)
        setShowContentShare(false)
        setShowContactInfo(false)
        setShowSearchMessages(false)
        setShowMediaShare(false)
        handleClose()
    }, [finalChatData.id])

    // Effect to log finalChatData
    useEffect(() => {
        console.log(finalChatData)
    }, [finalChatData.id])

    // Effect to set all messages of the finalChatData
    useEffect(() => {
        dispatch(setAllMessages(finalChatData.messages))
    }, [finalChatData.id])

    // Effect to set messageList and update latestMessagesRef
    useEffect(() => {
        setMessageList(messageStore.messages)
        latestMessagesRef.current = messageStore.messages
    }, [messageStore.messages])

    // Effect to log messageList and messageStore.messages
    useEffect(() => {
        console.log(messageStore.messages)
        console.log(messageList)
    }, [messageList])

    useEffect(() => {
        try {
            // Create a new Stomp client and connect to the WebSocket
            const socket = new sockjs(BASE_API_URL + "/websocket")
            const stmClient = Stomp.over(socket)
            setStompClient(stmClient)

            // Attach the authentication token to the WebSocket headers
            const authToken = "0f6f9cde-c100-4684-b2fd-d79cd31e396a" // Implement a function to retrieve the authentication token
            const headers = { Authorization: authToken }

            stmClient.connect(headers, onConnect, onError)

            return () => {
                stmClient.disconnect()
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    // Callback function for connection success
    const onConnect = (response) => {
        setIsConnect(true)
    }

    // Callback function for connection error
    const onError = (error) => {
        console.log(error)
    }

    const handleSendMessage = () => {
        if (stompClient && isConnect) {
            if (textMessage.trim().length > 0) {
                stompClient.send(
                    "/app/message/send",
                    {},
                    JSON.stringify({
                        reqUserId: currentUser.id,
                        chatId: finalChatData.id,
                        textMessage: textMessage,
                    })
                )
            }
        }
        setTextMessage("")
        setShowEmoji(false)
        setShowContentShare(false)
    }

    useEffect(() => {
        let subscription

        if (stompClient && isConnect) {
            // subscription = stompClient.subscribe("/topic/messages" + finalChatData.id.toString(),
            //     onChatMessagesRecieve);

            // stompClient.send("/app/chat/messages",{},
            //     JSON.stringify({
            //         reqUserId: currentUser.id,
            //         chatId: finalChatData.id,
            //     })
            // );

            subscription = stompClient.subscribe(
                "/topic/message" + finalChatData.id.toString(),
                onMessageRecieve
            )
        }

        // Cleanup subscription when stompClient or isConnect changes or when the component unmounts
        return () => {
            if (subscription) {
                subscription.unsubscribe()
            }
        }
    }, [stompClient, isConnect, finalChatData.id])

    // Callback function for receiving messages
    const onMessageRecieve = (response) => {
        const newMessage = JSON.parse(response.body)
        console.log("Received Message: ", newMessage)
        const latestMessages = latestMessagesRef.current

        dispatch(addNewMessage(latestMessages, newMessage))
        dispatch(updateMessageInChat(chats, finalChatData.id, newMessage))
    }

    // const onChatMessagesRecieve = (response) => {
    //     const messages = JSON.parse(response.body);
    //     console.log("Recieved Messages : ", messages);

    //     dispatch(setAllMessages(messages));
    // };

    // Function to close contact info
    const closeContactInfo = () => {
        setShowContactInfo(false)
        handleClose()
    }

    // Function to handle chat deletion
    const handleDeleteChat = () => {
        dispatch(deleteChat(chats, finalChatData.id))
        closeChatDetails()
    }

    // Function to delete all messages of the chat
    const deleteAllMessagesOfChat = () => {
        dispatch(deleteALLMessagesByChatId(chats, finalChatData.id))
        messageStore.messages = []
        handleClose()
    }

    // Function to handle select message click
    const handleSelectMessageClick = () => {
        setShowCheckbox(true)
        handleClose()
    }

    // Function to handle message selection
    const handleSelectMessage = (message) => {
        setSelectedMessages((prev) => {
            if (prev.includes(message)) {
                return prev.filter((msg) => msg.id !== message.id)
            } else {
                return [...prev, message]
            }
        })
    }

    // Function to close messages selected
    const handleCloseMessagesSelected = () => {
        setShowCheckbox(false)
        setSelectedMessages([])
    }

    // Function to delete selected messages
    const handleDeleteSelectedMessages = () => {
        if (selectedMessages.length < 0) {
            return
        }

        setShowCheckbox(false)
        dispatch(deleteSelectedMessages(messageList, selectedMessages))
        dispatch(
            deleteSelecetdMessagesByChatId(
                chats,
                selectedMessages,
                finalChatData.id
            )
        )
    }

    // Function to close media share
    const closeMediaShare = () => {
        setShowMediaShare(false)
        setShowContentShare(false)
    }

    const handleFileInputChange = (e) => {
        const files = [...e.target.files]

        // Filter files larger than 50MB
        const filteredFiles = files.filter(
            (file) => file.size <= 50 * 1024 * 1024
        )

        const largerSizeMedia = files.length - filteredFiles.length

        if (largerSizeMedia > 0) {
            if (largerSizeMedia == 1) {
                toast.error(
                    "1 media you tried adding is larger than 50MB limit "
                )
            } else {
                toast.error(
                    `${largerSizeMedia} media you tried adding are larger than 50MB limit `
                )
            }
            setShowContentShare(false)
        }

        if (filteredFiles.length > 0) {
            setSelectedFiles((prevFiles) => [...prevFiles, ...filteredFiles])
            setShowMediaShare(true)
        }
    }

    return (
        <div>
            {/* Render contact information component if showContactInfo is true */}
            {showContactInfo && (
                <ContactInfo
                    closeContactInfo={closeContactInfo}
                    chat={finalChatData}
                    chatUser={chatUser}
                    CurrentChatId={finalChatData.id}
                    closeChatDetails={closeChatDetails}
                />
            )}

            {/* Render search messages component if showSearchMessages is true */}
            {showSearchMessages && (
                <SearchMessages
                    closeSearchMessages={() => setShowSearchMessages(false)}
                />
            )}

            {/* Render media sharing component if showMediaShare is true */}
            {showMediaShare && (
                <MultiMediaShare
                    selectedFiles={selectedFiles}
                    chatId={finalChatData.id}
                    closeMediaShare={closeMediaShare}
                />
            )}

            {/* Render main chat UI if none of the above components are rendered */}
            {!showContactInfo && !showSearchMessages && !showMediaShare && (
                <div className="w-full md:w-[60%] h-[100dvh] flex flex-col justify-between fixed">
                    <div className="bg-[#1F2B32]">
                        {/* Header */}
                        <div className="w-[95%] h-14 flex items-center justify-between mx-auto">
                            <div className="flex space-x-3 items-center">
                                {/* Render back button for mobile devices */}
                                {window.innerWidth < 640 && (
                                    <IoMdArrowBack
                                        className="cursor-pointer text-2xl text-gray-400"
                                        onClick={() => navigate(-1)}
                                    />
                                )}

                                {/* User avatar */}
                                <div className="w-10 h-10 rounded-full bg-white cursor-pointer">
                                    <img
                                        className="w-full h-full rounded-full object-cover"
                                        src={
                                            isGroup
                                                ? chatImage || DefaultGroup
                                                : chatUser.profileImage ||
                                                  DefaultUser
                                        }
                                        alt=""
                                        onClick={() => setShowContactInfo(true)}
                                    />
                                </div>

                                {/* User details */}
                                <div className="">
                                    <p className="text-white font-medium text-base">
                                        {isGroup ? chatName : chatUser.name}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        {finalChatData.isGroup
                                            ? `${finalChatData.members.length} members`
                                            : "last seen"}
                                    </p>
                                </div>
                            </div>

                            {/* Search and more options icons */}
                            <div className="flex space-x-8 text-2xl my-auto text-gray-400">
                                <IoIosSearch
                                    className="cursor-pointer"
                                    onClick={() => setShowSearchMessages(true)}
                                />
                                <div>
                                    <BiDotsVerticalRounded
                                        className="cursor-pointer"
                                        onClick={handleClick}
                                    />
                                    {/* Dropdown menu */}
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            "aria-labelledby": "basic-button",
                                        }}
                                    >
                                        {/* Menu items */}
                                        <MenuItem
                                            onClick={() =>
                                                setShowContactInfo(true)
                                            }
                                        >
                                            {finalChatData.isGroup
                                                ? "Group info"
                                                : "Chat info"}
                                        </MenuItem>
                                        {!showCheckbox && (
                                            <MenuItem
                                                onClick={
                                                    handleSelectMessageClick
                                                }
                                            >
                                                Select messages
                                            </MenuItem>
                                        )}
                                        {window.innerWidth > 640 && (
                                            <MenuItem
                                                onClick={closeChatDetails}
                                            >
                                                Close chat
                                            </MenuItem>
                                        )}
                                        <MenuItem onClick={handleClose}>
                                            Mute notifications
                                        </MenuItem>
                                        <MenuItem
                                            onClick={deleteAllMessagesOfChat}
                                        >
                                            Clear chat
                                        </MenuItem>
                                        <MenuItem onClick={handleDeleteChat}>
                                            Delete chat
                                        </MenuItem>
                                        <MenuItem>Block</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle content: Message display */}
                    <div
                        className="flex-1 bg-[#111B21] overflow-y-scroll"
                        ref={chatContainerRef}
                    >
                        <div
                            className="flex flex-col space-y-2 p-3 md:p-10 ">
                            {/* Render each message */}
                            {messageList.map((message) => {
                                const isReqUserMsg =
                                    message.createdBy.id === currentUser.id

                                return (
                                    <div
                                        key={message.id}
                                        className={`${
                                            isReqUserMsg
                                                ? "self-end"
                                                : "self-start"
                                        }`}
                                    >
                                        <div className="flex">
                                            {/* Checkbox for message selection */}
                                            {showCheckbox && (
                                                <Checkbox
                                                    {...label}
                                                    style={{ color: "green" }}
                                                    size="small"
                                                    onClick={() =>
                                                        handleSelectMessage(
                                                            message
                                                        )
                                                    }
                                                />
                                            )}
                                            {/* Render message card */}
                                            <MessageCard
                                                key={message.id}
                                                isReqUserMsg={isReqUserMsg}
                                                message={message}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-[#1F2B32]">
                        <div className="w-full h-14 flex items-center justify-between">
                            <div className="flex space-x-4 md:space-x-6 p-3 md:p-6 text-2xl text-gray-400">
                                {/* Smile and Plus icons */}

                                {showEmoji && (
                                    <AiOutlineClose
                                        className="cursor-pointer text-gray-300"
                                        onClick={() => setShowEmoji(false)}
                                    />
                                )}
                                <GrEmoji
                                    className={`cursor-pointer ${
                                        showEmoji && "text-[#00A884] "
                                    }`}
                                    onClick={handleEmojiClick}
                                />
                                <BsPlusLg
                                    className={`cursor-pointer ${
                                        showContentShare &&
                                        " duration-300 rounded-full rotate-45 text-gray-300"
                                    }`}
                                    onClick={handleContentShareClick}
                                />
                                {showContentShare && (
                                    <div className="flex flex-col p-3 pl-2 rounded-lg  absolute bg-[#233138] bottom-16   text-base text-gray-300 z-100">
                                        <label htmlFor="documentInput">
                                            <div className="flex place-items-center space-x-3 rounded-lg cursor-pointer hover:bg-[#182229] py-2 pl-1 pr-10">
                                                <IoDocumentText className="text-xl text-[#7F66FF]" />
                                                <p className="text-center">
                                                    Document
                                                </p>
                                            </div>
                                        </label>
                                        <input
                                            type="file"
                                            multiple
                                            id="documentInput"
                                            className="w-full h-full rounded-full object-cover hidden"
                                            onChange={handleFileInputChange}
                                        />
                                        <label htmlFor="imageInput">
                                            <div className="flex place-items-center space-x-3 rounded-lg cursor-pointer hover:bg-[#182229] py-2 pl-1 pr-10">
                                                <IoMdPhotos className="text-xl text-[#007BFC]" />
                                                <p>Photos</p>
                                            </div>
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            id="imageInput"
                                            className="w-full h-full rounded-full object-cover hidden"
                                            onChange={handleFileInputChange}
                                        />
                                        <label htmlFor="videoInput">
                                            <div className="flex place-items-center space-x-3 rounded-lg cursor-pointer hover:bg-[#182229] py-2 pl-1 pr-10">
                                                <IoMdPhotos className="text-xl text-yellow-400" />
                                                <p>Videos</p>
                                            </div>
                                        </label>
                                        <input
                                            type="file"
                                            accept="video/*"
                                            multiple
                                            id="videoInput"
                                            className="w-full h-full rounded-full object-cover hidden"
                                            onChange={handleFileInputChange}
                                        />
                                        <div className="flex place-items-center space-x-3 rounded-lg cursor-pointer hover:bg-[#182229] py-2 pl-1 pr-10">
                                            <MdCameraAlt className="text-xl text-[#FF2E74]" />
                                            <p>Camera</p>
                                        </div>
                                        {/* <div className="flex place-items-center space-x-3 rounded-lg cursor-pointer hover:bg-[#182229] py-2 pl-1 pr-10">
                                            <IoMdPerson className="text-xl text-[#009DE2]" />
                                            <p>Contact</p>
                                        </div> */}
                                    </div>
                                )}
                            </div>
                            {/* Input for text message */}
                            <div className="w-[85%] h-10 rounded-lg flex justify-items-start items-center space-x-8 bg-[#2A3942]">
                                <input
                                    type="text"
                                    className="bg-transparent focus:outline-none text-white text-sm w-full p-4"
                                    placeholder="Search or start new chat"
                                    value={textMessage}
                                    onChange={(e) => {
                                        setTextMessage(e.target.value)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key == "Enter") {
                                            handleSendMessage()
                                            setTextMessage("")
                                        }
                                    }}
                                />
                            </div>
                            {/* Send button or microphone based on text input */}
                            <div className="p-3 md:p-4">
                                {textMessage.trim() ? (
                                    <IoSend
                                        className="cursor-pointer text-[#8696A0] text-2xl"
                                        onClick={handleSendMessage}
                                    />
                                ) : (
                                    <HiMicrophone className="cursor-pointer text-[#8696A0] text-2xl" />
                                )}
                            </div>
                            {showEmoji && (
                                <div className="absolute top-20">
                                    <Picker
                                        data={data}
                                        onEmojiSelect={addEmoji}
                                        perLine={isSmallDevice ? 7 : 9}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {showCheckbox && (
                        <div className=" bg-[#0E181E] w-full h-14 flex items-center justify-between absolute bottom-0 z-200 px-5">
                            <div className="flex space-x-5">
                                <IoClose
                                    className="text-gray-400 text-2xl cursor-pointer"
                                    onClick={handleCloseMessagesSelected}
                                />
                                <p className="text-gray-300">{`${selectedMessages.length} selected`}</p>
                            </div>
                            <div className="flex space-x-8">
                                <MdOutlineStar
                                    className={` text-2xl ${
                                        selectedMessages.length > 0
                                            ? "cursor-pointer text-gray-400"
                                            : "text-gray-700"
                                    } `}
                                />
                                <MdDelete
                                    className={`text-2xl ${
                                        selectedMessages.length > 0
                                            ? "cursor-pointer text-gray-400"
                                            : "text-gray-700"
                                    } }`}
                                    onClick={handleDeleteSelectedMessages}
                                />
                                <IoIosShareAlt
                                    className={`text-2xl ${
                                        selectedMessages.length > 0
                                            ? "cursor-pointer text-gray-400"
                                            : "text-gray-700"
                                    } `}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ChatDetails
