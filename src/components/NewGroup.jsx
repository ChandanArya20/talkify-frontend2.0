import React, { useState } from 'react'
import { FaRegFaceSmile } from 'react-icons/fa6';
import { IoMdArrowBack } from 'react-icons/io';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { IoChevronForwardOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

const NewGroup = ({closeNewGroup}) => {

    const navigate=useNavigate();
    const [groupSubject, setGroupSubject]=useState('');

    return (
        <div className='flex flex-col justify-between w-full h-full'>

            {/* profile header */}
            <div className="w-full md:w-[40%] h-28 bg-[#222e35da] fixed top-0 z-50">
                <div className="w-full h-full flex flex-col justify-end">
                    <div className="flex space-x-5 items-center text-xl font-medium text-gray-200 ml-6 mb-4">
                        <IoMdArrowBack className="cursor-pointer" onClick={closeNewGroup}/>
                        <p>Profile</p>
                    </div>
                </div>
            </div>

            <div className='w-full flex-1 overflow-y-scroll p-5 md:p-8'>
                {/* image section */}
                <div className='mt-28 '>
                    <div className="h-60 flex items-center justify-center">
                        <div className="w-48 h-48 md:w-48 md:h-48 rounded-full cursor-pointer relative">  
                            <img
                                className=" w-full h-full rounded-full object-cover cursor-pointer "
                                src="https://t4.ftcdn.net/jpg/03/78/40/51/360_F_378405187_PyVLw51NVo3KltNlhUOpKfULdkUOUn7j.jpg"
                                alt=""
                            /> 
                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                className=" w-full h-full rounded-full object-cover hidden"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex py-2 items-center border-b-2 border-[#00A884]">
                        <input
                            type="text"
                            value={groupSubject}
                            placeholder='Group Subject (Optional)'
                            className="flex-1 bg-transparent outline-none text-gray-300"
                            onChange={(e) => {
                                setGroupSubject(e.target.value);
                            }}
                        />
                        <div className="flex space-x-2">
                            <FaRegFaceSmile className="text-gray-400 cursor-pointer text-xl" />
                        </div>
                    </div>
                    
                </div>

                <div className='w-full flex justify-between py-12 '>
                    <div className='cursor-pointer'>
                        <p className='text-white'>Dissapearing Messages</p>
                        <p className='text-gray-400'>Off</p>
                    </div>
                    <div>
                        <IoChevronForwardOutline className='text-gray-400 text-lg'/>
                    </div>
                </div>

                <div className='w-full flex justify-center '>
                    <div className='w-12 h-12 rounded-full bg-[#00A884] flex items-center justify-center cursor-pointer'>
                        <IoMdCheckmark  className='text-white text-3xl'/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NewGroup;