import { IoCheckmarkOutline } from "react-icons/io5"
import { useSelector } from "react-redux"
import DefaultUser from "../assets/default-user.png"
import DefaultGroup from "../assets/default-group.png"
import { MdInsertPhoto } from "react-icons/md"
import { BiSolidVideo } from "react-icons/bi"
import { IoDocumentText } from "react-icons/io5"
import formatMessageTiming from "../Utils/dateFormatter.js"

function ChatCard({id, chatName, chatImage, isGroup, members, messages, selectedChatId}) {

    const { currentUser } = useSelector((state) => state.userStore)

    // Get the chat user excluding the current user
    const chatUser = members.filter((member) => member.id !== currentUser.id)[0]

    // Get the last message in the chat
    const lastMessage = messages[messages.length - 1]

    // Check if the last message is from the current user
    const isLastMessageFromCurrentUser = lastMessage && lastMessage.createdBy.id === currentUser.id

    // Count the new messages
    let newMessages = 0
    for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].createdBy.id !== currentUser.id) {
            newMessages++
        } else {
            // Stop counting when the first message from chatUser is encountered
            break
        }
    }

    return (
        <div
            className={`w-[98%] p-3 border-b-2 border-gray-800 flex justify-between cursor-pointer ${
                id === selectedChatId ? "bg-[#222E35]" : "hover:bg-[#222e3573]"
            } `}
        >
            <div className="flex items-center">
                {/* Display chat image */}
                <div className="w-12 h-12 rounded-full bg-white cursor-pointer">
                    <img
                        className=" w-full h-full rounded-full object-cover"
                        src={
                            isGroup
                                ? chatImage || DefaultGroup
                                : chatUser.profileImage || DefaultUser
                        }
                        alt=""
                    />
                </div>
                <div className="max-w-36 lg:max-w-56 ml-3 text-white">
                    <div className="">
                        {/* Display chat name */}
                        <p className="text-base font-medium">
                            {isGroup ? chatName : chatUser.name}
                        </p>
                    </div>
                    <div className="flex items-center space-x-1">
                        {isLastMessageFromCurrentUser ? (
                            // Display last message if it's from current user
                            <>
                                <IoCheckmarkOutline className="text-gray-300" />
                                {/* Display different message types */}
                                {lastMessage.messageType.startsWith("TEXT") ? (
                                    <div className="flex space-x-1 items-center text-gray-500">
                                        <p className="text-sm text-gray-400">
                                            {lastMessage?.textMessage}
                                        </p>
                                    </div>
                                ) : lastMessage?.messageType.startsWith(
                                      "image"
                                  ) ? (
                                    <div className="flex space-x-1 items-center text-gray-500">
                                        <MdInsertPhoto className="text-gray-500" />
                                        <p>Photo</p>
                                    </div>
                                ) : lastMessage?.messageType.startsWith(
                                      "video"
                                  ) ? (
                                    <div className="flex space-x-1 items-center text-gray-500">
                                        <BiSolidVideo className="text-gray-500" />
                                        <p>Video</p>
                                    </div>
                                ) : lastMessage?.messageType.startsWith(
                                      "application"
                                  ) ? (
                                    <div className="flex space-x-1 items-center text-gray-500">
                                        <IoDocumentText className="text-gray-500" />
                                        <p>Document</p>
                                    </div>
                                ) : null}
                            </>
                        ) : (
                            // Display last message if it's not from current user
                            <>
                                {lastMessage?.messageType.startsWith("TEXT") ? (
                                    <div className="flex space-x-1 items-center text-gray-500">
                                        <p className="text-sm text-gray-200">
                                            {lastMessage?.textMessage}
                                        </p>
                                    </div>
                                ) : lastMessage?.messageType.startsWith(
                                      "image"
                                  ) ? (
                                    <div className="flex space-x-1 items-center text-gray-300">
                                        <MdInsertPhoto />
                                        <div className="w-36 text-nowrap text-ellipsis overflow-hidden">
                                            <p>{lastMessage?.fileName}</p>
                                        </div>
                                    </div>
                                ) : lastMessage?.messageType.startsWith(
                                      "video"
                                  ) ? (
                                    <div className="flex space-x-1 items-center text-gray-300 ">
                                        <BiSolidVideo />
                                        <div className="w-36 text-nowrap text-ellipsis overflow-hidden ">
                                            <p className="">
                                                {lastMessage?.fileName}
                                            </p>
                                        </div>
                                    </div>
                                ) : lastMessage?.messageType.startsWith(
                                      "application"
                                  ) ? (
                                    <div className="flex space-x-1 items-center text-gray-300">
                                        <IoDocumentText className="" />
                                        <div className="w-36 text-nowrap text-ellipsis overflow-hidden">
                                            <p className="text-base text-ellipsis">
                                                {lastMessage?.fileName}
                                            </p>
                                        </div>
                                    </div>
                                ) : null}
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* Display timestamp and new messages count */}
            <div className="space-y-2 flex flex-col items-end">
                <div>
                    <p
                        className={`${
                            newMessages
                                ? "text-[#00A884] font-bold"
                                : "text-gray-400"
                        } text-xs`}
                    >
                        {formatMessageTiming(lastMessage?.creationTime)}
                    </p>
                </div>
                {newMessages > 0 && (
                    <div className="w-5 h-5 rounded-full bg-[#00A884] text-center">
                        <p className="text-sm font-medium">{newMessages}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatCard
