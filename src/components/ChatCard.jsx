import { IoCheckmarkOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import DefaultUser from '../assets/default-user.png'
import DefaultGroup from '../assets/default-group.png'

function ChatCard({id, chatName, chatImage, isGroup, members, messages, selectedChatId}) {

    const {currentUser} = useSelector(state=>state.userStore);
    
    const chatUser = members.filter(member=>member.id!==currentUser.id)[0];
    const lastMessage = messages[messages.length - 1];
    const isLastMessageFromCurrentUser = lastMessage && lastMessage.createdBy.id === currentUser.id;

    // Count the new messages
    let newMessages = 0;
    for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].createdBy.id !== currentUser.id) {
            newMessages++;
        } else {
            // Stop counting when the first message from chatUser is encountered
            break;
        }
    }

    return (
        <div className={`w-[98%] p-3 border-b-2 border-gray-800 flex justify-between cursor-pointer ${id===selectedChatId ? 'bg-[#222E35]' : 'hover:bg-[#222e35a5]'} `}>
            <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white cursor-pointer">
                    <img
                        className=" w-full h-full rounded-full object-cover"
                        src={ isGroup ? chatImage || DefaultGroup : chatUser.profileImage || DefaultUser}
                        alt=""
                    />
                </div>
                <div className="ml-3 text-white">
                    <div>
                        <p className="text-base font-medium">{isGroup ? chatName : chatUser.name}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        {isLastMessageFromCurrentUser && <IoCheckmarkOutline className="text-gray-300" />}
                        <p className={`text-sm  ${isLastMessageFromCurrentUser ? 'text-gray-400' : 'text-gray-200'}`}>
                            {lastMessage?.textMessage}
                        </p>
                    </div>
                </div>
            </div>
            <div className="space-y-2 flex flex-col items-end">
                <div>
                    <p className={`${newMessages ? 'text-[#00A884] font-bold':'text-gray-400'} text-xs`}>{lastMessage?.creationTime}</p>
                </div>
                {
                    newMessages > 0 &&
                    <div className="w-5 h-5 rounded-full bg-[#00A884] text-center">
                        <p className="text-sm font-medium">{newMessages}</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default ChatCard;
