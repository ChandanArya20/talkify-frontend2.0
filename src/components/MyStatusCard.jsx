function MyStatusCard({ statusImages, statusTimeStamp }) {
    
    return (
        <div className="w-[98%] p-3 flex justify-between ]">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white ">
                    <img
                        className=" w-full h-full rounded-full object-cover"
                        src={statusImages}
                        alt=""
                    />
                </div>
                <div className="">
                    <div>
                        <p className="text-base font-medium text-gray-300">
                            My Staus
                        </p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <p className="text-sm text-gray-400">
                            {statusTimeStamp}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyStatusCard;
