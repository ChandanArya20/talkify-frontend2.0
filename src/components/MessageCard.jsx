import React from 'react';

export const MessageCard = ({ isReqUserMsg, textMessage, creationTime}) => {
    
    return (
        <div
            className={`rounded-md ${isReqUserMsg ? 'bg-[#005C4B]' : 'bg-[#202C33]'}`}
        >
            <div className='p-2 flex space-x-2'>
                <p className='text-sm text-white'>{textMessage}</p>
                <p className='text-xs text-gray-400 mt-2 text-nowrap'>{creationTime}</p>
            </div>
            
        </div>
    );
};

export default MessageCard;
