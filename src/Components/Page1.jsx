import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedia } from './MediaContext'; // Adjust the path as necessary

export function Page1() {
    const navigate = useNavigate();
    const { mediaRecorder, setMediaRecorder } = useMedia();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mediaRecorder) {
            mediaRecorder.start(); // Start recording
            console.log("recording start");
        }
        navigate("/page2"); //Navigate to Page 2
    };

    useEffect(() => {
        async function setupRecorder() {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);
        }
        setupRecorder();
    }, [setMediaRecorder]);

    return (
        <div className="align-self: center min-h-screen flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl p-8 md:p-16 rounded-lg ">
                <div className="bg-gradient-to-t p-8 rounded-lg shadow-lg w-full h-full max-w-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="name"
                                className="w-full p-3 rounded-lg bg-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                                placeholder="Enter Name"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg text-white font-bold focus:outline-none focus:ring-2 focus:ring-slate-300"
                        >
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
