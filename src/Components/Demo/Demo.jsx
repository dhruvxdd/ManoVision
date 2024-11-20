import React, { useRef, useState } from 'react';
import demovid from '../Image/demovid.mp4';

const Demo = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayVideo = () => {
        videoRef.current.play();
        setIsPlaying(true);
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-900/90">
            <div className="relative bg-white bg-opacity-90 rounded-lg shadow-lg p-6 max-w-2xl w-full">
                <video
                    ref={videoRef}
                    src={demovid} // Use imported video file
                    onEnded={handleVideoEnd}
                    className="rounded-lg w-full h-auto"
                    controls={true}
                    muted={false}
                />
                {!isPlaying && (
                    <button
                        onClick={handlePlayVideo}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition"
                    >
                        Play Video
                    </button>
                )}
            </div>
        </div>
    );
};

export default Demo;
