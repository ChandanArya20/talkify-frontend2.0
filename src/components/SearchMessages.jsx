import React, { useState } from "react";
import { IoIosSearch, IoMdArrowBack } from "react-icons/io";
import { MdOutlineClose, MdCalendarToday} from "react-icons/md";

const SearchMessages = ({closeSearchMessages}) => {

    const [query, setQuery] = useState("");
    const [isSearchClicked, setIsSearchClicked]=useState(false);

    // Function to handle search
    const handleSearch = (query) => {
        
    };

  return (
    <div className="w-full md:w-[60%] h-screen md:h-screen flex flex-col fixed bg-[#111B21]">
        <div className="bg-[#202C33]">
            {/* Header */}
            <div className="w-full h-14 flex items-center">
                <div className="flex space-x-7 items-center">
                    {/* close button */}
                    <div className="pl-5">
                        <MdOutlineClose 
                            className="cursor-pointer text-gray-400 text-2xl"
                            onClick={closeSearchMessages}
                            />
                    </div>    
                    <p className="text-gray-200 text-base">
                        Search Messages
                    </p>
                </div>
            </div>
        </div>

        {/* Search input */}
        <div className="flex space-x-3 items-center px-3 mt-2">
            <div className="items-center">
                <MdCalendarToday className="text-gray-400 text-xl cursor-pointer"/>
            </div>
            <div className="flex-1 h-9 rounded-lg flex justify-items-start items-center space-x-3 md:space-x-4 bg-[#202C33]">
                <div className="w-12 h-12 ml-1 flex items-center justify-center">
                    {
                        !isSearchClicked ?
                        <IoIosSearch 
                            className="text-gray-400 text-xl cursor-pointer" 
                            onClick={()=>setIsSearchClicked(true)}
                        /> :
                        <IoMdArrowBack
                            className="text-[#00A884] text-2xl cursor-pointer"
                            onClick={()=>setIsSearchClicked(false)}
                        />
                    }
                </div>
                <input
                    type="text"
                    className="bg-transparent focus:outline-none text-white text-sm w-full"
                    placeholder="search..."
                    autoFocus={isSearchClicked}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        handleSearch(e.target.value);
                    }}
                    onClick={()=>setIsSearchClicked(true)}
                />
            </div>
        </div>


        <div className="bg-[#111B21] flex-1">

        </div>
    </div>
  )
}

export default SearchMessages;