import React from 'react';

export const MessageCard = ({ isReqUserMsg, textMessage }) => {
    
    return (
        <div
            className={`flex flex-col items-${isReqUserMsg ? 'end' : 'start'} mx-2 my-1 max-w-[50%] rounded-md ${
                isReqUserMsg ? 'self-end bg-[#005C4B]' : 'self-start bg-[#202C33]'
            }`}
        >
            <div className='p-2 flex space-x-2'>
                <p className='text-sm text-white'>{textMessage}</p>
                <div className='flex flex-col justify-end'>
                    <p className='text-xs text-gray-400 mt-2'>12:14 pm</p>
                </div>
            </div>
            
        </div>
    );
};

export default MessageCard;
