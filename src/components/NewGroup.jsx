import React, { useState } from 'react'
import { FaRegFaceSmile } from 'react-icons/fa6';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { IoChevronForwardOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import DefaultGroup from '../assets/default-group.png'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { createGroupChat } from '../Redux/Chat/action';
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { toast } from "react-toastify";

const NewGroup = ({closeNewGroup, closeOpenCreateGroup, groupMembersId}) => {

    const navigate=useNavigate();
    const [groupSubject, setGroupSubject]=useState('');
    const [groupImage, setGroupImage]=useState(null);
    const [showEmoji, setShowEmoji] = useState(false);
    const [loading, setLoading]=useState(false);
    const dispatch = useDispatch();

    const handleProfileImageChange=async(imageFile)=>{
       
        const data=new FormData();
        data.append("file",imageFile);
        data.append("upload_preset","talkify-images");
        data.append("cloud_name","ddj5asxve");

        setLoading(true);
        const response=await axios.post("https://api.cloudinary.com/v1_1/ddj5asxve/image/upload",data)
        const imageURL=response.data.url;
        setGroupImage(imageURL);
        console.log(imageURL);
        setLoading(false);
    }

    const createNewGroup=()=>{
        console.log(groupMembersId);
        dispatch(createGroupChat({groupName:groupSubject, groupImage:groupImage, membersId:groupMembersId}));
        closeNewGroup();
        closeOpenCreateGroup();
    }

    const addEmoji = (emoji) => {
        setGroupSubject((prevValue) => prevValue + emoji.native);
    };

    return (
        <div className='flex flex-col justify-between w-full h-full'>

            {/* profile header */}
            <div className="w-full md:w-[40%] h-14 md:h-28 bg-[#222e35da] fixed top-0 z-50">
                <div className="w-full h-full flex flex-col justify-end">
                    <div className="flex space-x-5 items-center text-xl font-medium text-gray-200 ml-6 mb-4">
                        <IoMdArrowBack className="cursor-pointer" onClick={closeNewGroup}/>
                        <p>Profile</p>
                    </div>
                </div>
            </div>

            <div className='w-full flex-1 overflow-y-scroll p-5 md:p-8 '>
                {/* image section */}
                <div className='mt-28 relative'>
                    {loading && <ClipLoader color="#ddd" className="absolute"/>}
                    <div className="h-60 flex items-center justify-center">
                        <div className="w-48 h-48 md:w-48 md:h-48 rounded-full cursor-pointer relative ">  
                            <label htmlFor="imageInput">
                                <img
                                    className=" w-full h-full rounded-full object-cover cursor-pointer "
                                    src={groupImage || DefaultGroup}
                                    alt=""
                                /> 
                            </label>
                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                className=" w-full h-full rounded-full object-cover hidden"
                                onChange={e=>handleProfileImageChange(e.target.files[0])}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex py-2 items-center border-b-2 border-[#00A884]">
                        <input
                            type="text"
                            value={groupSubject}
                            placeholder='Group Subject'
                            className="flex-1 bg-transparent outline-none text-gray-300"
                            onChange={(e) => {
                                setGroupSubject(e.target.value);
                            }}
                        />
                        <div className="flex space-x-2">
                            <FaRegFaceSmile 
                                className={`cursor-pointer text-xl ${showEmoji ? "text-[#00A884]" : "text-gray-400" }` }
                                onClick={()=>setShowEmoji(pre=>!pre)}
                            />
                        </div>
                    </div>
                    
                </div>

                <div className='w-full flex justify-between py-8'>
                    <div className='cursor-pointer'>
                        <p className='text-white'>Dissapearing Messages</p>
                        <p className='text-gray-400'>Off</p>
                    </div>
                    <div>
                        <IoChevronForwardOutline className='text-gray-400 text-lg'/>
                    </div>
                </div>
                {   groupSubject.trim().length > 0 &&
                    <div className='w-full flex justify-center '>
                        <div className='w-12 h-12 rounded-full bg-[#00A884] flex items-center justify-center cursor-pointer'>
                            <IoMdCheckmark  
                                className='text-white text-3xl'
                                onClick={createNewGroup}
                            />
                        </div>
                    </div>
                }

            </div>
            {showEmoji && (
                <div className="absolute top-1/2 md:top-[60%] md:left-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-200000">
                    <Picker
                        data={data}
                        onEmojiSelect={addEmoji}
                        emojiSize={18}
                        perLine={6}
                    />
                </div>
            )}
        </div>
    )
}

export default NewGroup;