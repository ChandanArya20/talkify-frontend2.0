import React, { useEffect, useState } from 'react';

const ProgressBar = ({ activeIndex, index, duration }) => { 
    
    const isActive = (index === activeIndex);  // Check if the current index matches the active index
    const [progress, setProgress] = useState();

    // Effect to handle the progress interval
    useEffect(() => {
    
        const intervalId = setInterval(() => {
            setProgress(prev => {
                if (prev < 100) {
                    return prev + 1;
                }else{
                    clearInterval(intervalId);
                    return prev;
                }
            });
        }, duration / 100);

        // Cleanup function to clear the interval on component unmount or when activeIndex changes
        return () => clearInterval(intervalId);

    }, [duration, activeIndex]); 
    
    useEffect(() => {
        setProgress(0);
    }, [activeIndex]);

    return (
        <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
            <div
                className={`${isActive ? "progress-bar" : ""}`}
                style={{
                    width: `${progress}%`
                }}
            >
            </div>
        </div>
    );
}

export default ProgressBar;
