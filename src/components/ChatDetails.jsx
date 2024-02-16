import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosSearch, IoMdArrowBack } from "react-icons/io";
import { FaRegFaceSmile } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { HiMicrophone } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import MessageCard from "./MessageCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessage, setAllMessages } from "../Redux/Message/action";
import DefaultUser from "../assets/default-user.png";
import DefaultGroup from "../assets/default-group.png";
import sockjs from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";
import { BASE_API_URL } from "../config/api";

function ChatDetails({ chatData }) {
    
    const [textMessage, setTextMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useSelector((state) => state.userStore);
    const messageStore = useSelector((state) => state.messageStore);
    const [messageList, setMessageList] = useState([]);
    const dispatch = useDispatch();

    const finalChatData = location.state || chatData;
    const { chatName, chatImage, isGroup, members } = finalChatData;
    const chatUser = members?.filter((member) => member.id !== currentUser.id)[0];
    const [stompClient, setStompClient] = useState();
    const [isConnect, setIsConnect] = useState(false);
    const latestMessagesRef = useRef(messageStore.messages);

    useEffect(() => {
        setMessageList(messageStore.messages);
        latestMessagesRef.current = messageStore.messages;
    }, [messageStore.messages]);

    useEffect(() => {
        console.log(messageList);
    }, [messageList]);

    useEffect(() => {
        // Create a new Stomp client and connect to the WebSocket
        const socket = new sockjs(BASE_API_URL + "/websocket");
        const stmClient = Stomp.over(socket);
        setStompClient(stmClient);

        // Attach the authentication token to the WebSocket headers
        // const authToken = "0f6f9cde-c100-4684-b2fd-d79cd31e396a" // Implement a function to retrieve the authentication token
        // const headers = { Authorization: authToken };

        stmClient.connect({ name: "Chandan" }, onConnect, onError);

        return () => {
            stmClient.disconnect();
        };
    }, []);

    const onConnect = (response) => {
        setIsConnect(true);
    };

    const onError = (error) => {
        console.log(error);
    };

    useEffect(() => {

        let subscription;

        if (stompClient && isConnect) {
            // Establish subscription only if the stompClient or isConnect changes

            subscription = stompClient.subscribe("/topic/messages" + finalChatData.id.toString(),
                onChatMessagesRecieve);

            stompClient.send("/app/messages/chat",{},
                JSON.stringify({
                    reqUserId: currentUser.id,
                    chatId: finalChatData.id,
                })
            );

            subscription = stompClient.subscribe("/topic/message" + finalChatData.id.toString(),onMessageRecieve);
        }

        // Cleanup subscription when stompClient or isConnect changes or when the component unmounts
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [stompClient, isConnect, finalChatData.id]);

    const handleSendMessage = () => {
        console.log("handleSendMessage");
        console.log(messageStore.messages);

        if (stompClient && isConnect) {
            if (textMessage.trim().length > 0) {
                stompClient.send("/app/message/send", {},
                    JSON.stringify({
                        userId: currentUser.id,
                        chatId: finalChatData.id,
                        content: textMessage,
                    })
                );
            }
        }
        setTextMessage("");
    };

    const onMessageRecieve = (response) => {
        const newMessage = JSON.parse(response.body);
        console.log("Recieved Message : ", newMessage);
        const latestMessages = latestMessagesRef.current;

        dispatch(addNewMessage(latestMessages, newMessage));
    };

    const onChatMessagesRecieve = (response) => {
        const messages = JSON.parse(response.body);
        console.log("Recieved Messages : ", messages);

        dispatch(setAllMessages(messages));
    };

    return (
        <div className="w-full md:w-[60%] h-screen md:h-screen flex flex-col justify-between fixed">
            <div className="bg-[#222e35]">
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
                                        : chatUser.profileImage || DefaultUser
                                }
                                alt=""
                            />
                        </div>
                        {/* User details */}
                        <div className="">
                            <p className="text-white font-medium text-base">
                                {isGroup ? chatName : chatUser.name}
                            </p>
                            <p className="text-gray-400 text-sm">last seen</p>
                        </div>
                    </div>
                    {/* Search and more options icons */}
                    <div className="flex space-x-8 text-2xl my-auto text-gray-400">
                        <IoIosSearch className="cursor-pointer" />
                        <BiDotsVerticalRounded className="cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Middle content */}
            <div className="flex-1 bg-[#111B21] overflow-y-scroll">
                <div className="flex flex-col space-y-1 p-3 md:p-10 ">
                    {messageList.map((message) => (
                        <MessageCard
                            key={message.id}
                            isReqUserMsg={
                                message.createdBy.id === currentUser.id
                            }
                            textMessage={message.textMessage}
                            creationTime={message.creationTime}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[#222e35]">
                <div className="w-full h-14 flex items-center justify-between">
                    <div className="flex space-x-4 md:space-x-6 p-3 md:p-6 text-2xl text-gray-400">
                        {/* Smile and Plus icons */}
                        <FaRegFaceSmile className="cursor-pointer" />
                        <FaPlus className="cursor-pointer" />
                    </div>
                    {/* Input for text message */}
                    <div className="w-[85%] h-10 rounded-lg flex justify-items-start items-center space-x-8 bg-[#2A3942]">
                        <input
                            type="text"
                            className="bg-transparent focus:outline-none text-white text-sm w-full p-4"
                            placeholder="Search or start new chat"
                            value={textMessage}
                            onChange={(e) => {
                                setTextMessage(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key == "Enter") {
                                    handleSendMessage();
                                    setTextMessage("");
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
                </div>
            </div>
        </div>
    );
}

export default ChatDetails;
