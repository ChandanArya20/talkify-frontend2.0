import React, { useEffect, useState } from 'react';

const ProgressBar = ({ activeIndex, index, duration }) => {
     
    // Check if the current index matches the active index
    const isActive = (index === activeIndex);
    // State to track the progress of the progress bar
    const [progress, setProgress] = useState();

    // Effect to handle the progress interval
    useEffect(() => {
        // Initialize the interval to update the progress
        const intervalId = setInterval(() => {
            setProgress(prev => {
                // Increment progress by 1 until it reaches 100
                if (prev < 100) {
                    return prev + 1;
                } else {
                    // Clear the interval when progress reaches 100
                    clearInterval(intervalId);
                    return prev;
                }
            });
        }, duration / 100); // Adjust the interval duration based on the desired duration

        // Cleanup function to clear the interval on component unmount or when activeIndex changes
        return () => clearInterval(intervalId);

    }, [duration, activeIndex]); // Re-run the effect when duration or activeIndex changes
    
    // Reset progress to 0 when activeIndex changes
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
