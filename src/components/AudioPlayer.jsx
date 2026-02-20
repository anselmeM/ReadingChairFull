import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';

const AudioPlayer = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTrack, setCurrentTrack] = useState({
        title: "The Great Gatsby - Chapter 1",
        author: "F. Scott Fitzgerald",
        duration: 180 // seconds
    });

    const timerRef = useRef(null);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + (100 / currentTrack.duration); // distinct step size
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [isPlaying, currentTrack.duration]);

    if (!isOpen) return (
        <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition z-50"
        >
            <Maximize2 size={24} />
        </button>
    );

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Track Info */}
                <div className="flex items-center space-x-4 w-1/4">
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs">
                        Cover
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 truncate">{currentTrack.title}</h4>
                        <p className="text-xs text-gray-500 truncate">{currentTrack.author}</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center w-1/2">
                    <div className="flex items-center space-x-6 mb-2">
                        <button
                            onClick={togglePlay}
                            className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white hover:bg-orange-700 transition"
                        >
                            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                        </button>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full max-w-md flex items-center space-x-3">
                        <span className="text-xs text-gray-400">
                            {Math.floor((progress / 100) * currentTrack.duration / 60)}:
                            {String(Math.floor(((progress / 100) * currentTrack.duration) % 60)).padStart(2, '0')}
                        </span>
                        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
                            <div
                                className="h-full bg-orange-500 transition-all duration-1000 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-xs text-gray-400">
                            {Math.floor(currentTrack.duration / 60)}:
                            {String(currentTrack.duration % 60).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                {/* Volume & Close */}
                <div className="flex items-center justify-end space-x-4 w-1/4">
                    <button onClick={toggleMute} className="text-gray-500 hover:text-gray-900">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <Minimize2 size={20} />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AudioPlayer;
