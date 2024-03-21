
function ChatCardSkeleton() {
    return (
        <div
            className={`w-[98%] p-3 border-b-2 border-gray-800 flex justify-between cursor-pointer ${"hover:bg-[#222e3573]"} `}
        >
            <div className="flex items-center">
                {/* Display chat image */}
                <div className="w-12 h-12 rounded-full bg-gray-300 cursor-pointer">
                    
                </div>
                <div className="max-w-36 lg:max-w-56 ml-3 text-white flex flex-col gap-1">
                    <div className="bg-red-400">
                        {/* Display chat name */}
                        <div className="w-32 h-4 bg-slate-300">

                        </div>
                    </div>
                    <div className="flex items-center space-x-1 ">
                        <div className="w-20 h-2 bg-slate-400">

                        </div>
                    </div>
                </div>
            </div>
            {/* Display timestamp and new messages count */}
            <div className="space-y-2 flex flex-col items-end">
                <div className="w-8 h-2 bg-gray-400">
                    
                </div>
            </div>
        </div>
    )
}

export default ChatCardSkeleton
