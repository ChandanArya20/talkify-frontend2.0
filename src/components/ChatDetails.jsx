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
} from "../Redux/Message/action"
import DefaultUser from "../assets/default-user.png"
import DefaultGroup from "../assets/default-group.png"
import sockjs from "sockjs-client/dist/sockjs"
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

function ChatDetails({ chatData, closeChatDetails }) {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [textMessage, setTextMessage] = useState("")
    const { currentUser } = useSelector((state) => state.userStore)
    const messageStore = useSelector((state) => state.messageStore)
    const { chats } = useSelector((state) => state.chatStore)
    const [messageList, setMessageList] = useState([])
    const finalChatData = location.state || chatData
    const { chatName, chatImage, isGroup, members } = finalChatData
    const chatUser = members?.filter(
        (member) => member.id !== currentUser.id
    )[0]
    const [stompClient, setStompClient] = useState()
    const [isConnect, setIsConnect] = useState(false)
    const latestMessagesRef = useRef(messageStore.messages)
    const [showEmoji, setShowEmoji] = useState(false)
    const [showContentShare, setShowContentShare] = useState(false)
    const [showContactInfo, setShowContactInfo] = useState(false)
    const [showSearchMessages, setShowSearchMessages] = useState(false)
    const [showMediaShare, setShowMediaShare] = useState(false)
    const label = { inputProps: { "aria-label": "Checkbox demo" } }
    const [selectedMessages, setSelectedMessages] = useState([])
    const [showCheckbox, setShowCheckbox] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState(null)

    useEffect(() => {
        console.log(selectedMessages)
    }, [selectedMessages])

    const addEmoji = (emoji) => {
        setTextMessage((prevValue) => prevValue + emoji.native)
    }

    const handleEmojiClick = () => {
        setShowContentShare(false)
        setShowEmoji((pre) => !pre)
    }

    const handleContentShareClick = () => {
        setShowEmoji(false)
        setShowContentShare((pre) => !pre)
    }

    useEffect(() => {
        setShowContentShare(false)
    }, [showEmoji])

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    // Function to handle opening the dropdown menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    // Function to handle closing the dropdown menu
    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        setShowEmoji(false)
        setShowContentShare(false)
        setShowContactInfo(false)
        setShowSearchMessages(false)
        setShowMediaShare(false)
        handleClose()
    }, [finalChatData.id])

    useEffect(() => {
        console.log(finalChatData)
    }, [finalChatData.id])

    useEffect(() => {
        dispatch(setAllMessages(finalChatData.messages))
    }, [finalChatData.id])

    useEffect(() => {
        setMessageList(messageStore.messages)
        latestMessagesRef.current = messageStore.messages
    }, [messageStore.messages])

    useEffect(() => {
        console.log(messageStore.messages)
        console.log(messageList)
    }, [messageList])

    useEffect(() => {
        // Create a new Stomp client and connect to the WebSocket
        const socket = new sockjs(BASE_API_URL + "/websocket")
        const stmClient = Stomp.over(socket)
        setStompClient(stmClient)

        // Attach the authentication token to the WebSocket headers
        const authToken = "0f6f9cde-c100-4684-b2fd-d79cd31e396a" // Implement a function to retrieve the authentication token
        const headers = { Authorization: authToken }

        stmClient.connect({ name: "Chandan" }, onConnect, onError)

        return () => {
            stmClient.disconnect()
        }
    }, [])

    const onConnect = (response) => {
        setIsConnect(true)
    }

    const onError = (error) => {
        console.log(error)
    }

    useEffect(() => {
        let subscription

        if (stompClient && isConnect) {
            // Establish subscription only if the stompClient or isConnect changes

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

    const handleSendMessage = () => {
        if (stompClient && isConnect) {
            if (textMessage.trim().length > 0) {
                stompClient.send(
                    "/app/message/send",
                    {},
                    JSON.stringify({
                        userId: currentUser.id,
                        chatId: finalChatData.id,
                        content: textMessage,
                    })
                )
            }
        }
        setTextMessage("")
        setShowEmoji(false)
        setShowContentShare(false)
    }

    const onMessageRecieve = (response) => {
        const newMessage = JSON.parse(response.body)
        console.log("Recieved Message : ", newMessage)
        const latestMessages = latestMessagesRef.current

        dispatch(addNewMessage(latestMessages, newMessage))
        dispatch(updateMessageInChat(chats, finalChatData.id, newMessage))
    }

    // const onChatMessagesRecieve = (response) => {
    //     const messages = JSON.parse(response.body);
    //     console.log("Recieved Messages : ", messages);

    //     dispatch(setAllMessages(messages));
    // };

    const closeContactInfo = () => {
        setShowContactInfo(false)
        handleClose()
    }

    const handleDeleteChat = () => {
        dispatch(deleteChat(chats, finalChatData.id))
        closeChatDetails()
    }

    const deleteAllMessagesOfChat = () => {
        dispatch(deleteALLMessagesByChatId(chats, finalChatData.id))
        messageStore.messages = []
        handleClose()
    }

    const handleSelectMessageClick = () => {
        setShowCheckbox(true)
        handleClose()
    }

    const handleSelectMessage = (message) => {
        setSelectedMessages((prev) => {
            if (prev.includes(message)) {
                // Message is already selected, remove it
                return prev.filter((msg) => msg.id !== message.id)
            } else {
                // Message is not in the selected list, add it
                return [...prev, message]
            }
        })
    }

    const handleCloseMessagesSelected = () => {
        setShowCheckbox(false)
        setSelectedMessages([])
    }

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

    const closeMediaShare = () => {
        setShowMediaShare(false)
        setShowContentShare(false)
    }

    return (
        <div>
            {showContactInfo && (
                <ContactInfo
                    closeContactInfo={closeContactInfo}
                    chatUser={chatUser}
                    CurrentChatId={finalChatData.id}
                    closeChatDetails={closeChatDetails}
                />
            )}
            {showSearchMessages && (
                <SearchMessages
                    closeSearchMessages={() => setShowSearchMessages(false)}
                />
            )}
            {showMediaShare && (
                <MultiMediaShare
                    selectedFiles={selectedFiles}
                    closeMediaShare={closeMediaShare}
                />
            )}
            {!showContactInfo && !showSearchMessages && !showMediaShare && (
                <div className="w-full md:w-[60%] h-screen md:h-screen flex flex-col justify-between fixed">
                    <div className="bg-[#1F2B32]">
                        {/* Header */}
                        <div className="w-[95%] h-14 flex items-center justify-between mx-auto">
                            <div className="flex space-x-3 items-center">
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
                                        last seen
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
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            "aria-labelledby": "basic-button",
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() =>
                                                setShowContactInfo(true)
                                            }
                                        >
                                            Contact info
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
                                        {window.innerWidth > 640 && ( // fonly show for desktop width
                                            <MenuItem
                                                onClick={closeChatDetails}
                                            >
                                                Close chat
                                            </MenuItem>
                                        )}
                                        <MenuItem onClick={handleClose}>
                                            Mute notifications
                                        </MenuItem>
                                        {/* <MenuItem onClick={handleClose}>
                                                Disappearing messages
                                            </MenuItem> */}
                                        <MenuItem
                                            onClick={deleteAllMessagesOfChat}
                                        >
                                            Clear chat
                                        </MenuItem>
                                        <MenuItem onClick={handleDeleteChat}>
                                            Delete chat
                                        </MenuItem>
                                        {/* <MenuItem >
                                                Report
                                            </MenuItem> */}
                                        <MenuItem>Block</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle content */}
                    <div className="flex-1 bg-[#11211c] overflow-y-scroll">
                        <div className="flex flex-col space-y-2 p-3 md:p-10 ">
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
                                            <MessageCard
                                                key={message.id}
                                                isReqUserMsg={isReqUserMsg}
                                                textMessage={
                                                    message.textMessage
                                                }
                                                creationTime={
                                                    message.creationTime
                                                }
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
                                        <label htmlFor="imageInput">
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
                                            id="imageInput"
                                            className="w-full h-full rounded-full object-cover hidden"
                                            onChange={(e) => {
                                                setSelectedFiles(e.target.files)
                                                setShowMediaShare(true)
                                            }}
                                        />
                                        <label htmlFor="imageInput">
                                            <div className="flex place-items-center space-x-3 rounded-lg cursor-pointer hover:bg-[#182229] py-2 pl-1 pr-10">
                                                <IoMdPhotos className="text-xl text-[#007BFC]" />
                                                <p>Photos & Videos</p>
                                            </div>
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*, video/*"
                                            multiple
                                            id="imageInput"
                                            className="w-full h-full rounded-full object-cover hidden"
                                            onChange={(e) => {
                                                setSelectedFiles(e.target.files)
                                                setShowMediaShare(true)
                                            }}
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
