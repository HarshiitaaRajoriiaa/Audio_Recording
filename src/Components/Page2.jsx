import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedia } from './MediaContext'; // Adjust the path as necessary

export function Page2() {
    // const navigate = useNavigate();
    // const { mediaRecorder } = useMedia();
    // const [audioUrl, setAudioUrl] = useState(null);

    // useEffect(() => {
    //     if (mediaRecorder) {
    //         const handleDataAvailable = (event) => {
    //             console.log("enter")
    //             if (event.data.size > 0) {
    //                 console.log("enter 2")
    //                 const blob = new Blob([event.data], { type: 'audio/webm' });
    //                 console.log("enter 3")
    //                 const url = URL.createObjectURL(blob);
    //                 console.log("enter 4")
    //                 setAudioUrl(url);
    //                 console.log("enter 5")
    //                 console.log("Audio URL created:", url);
    //                 console.log("enter 6")
    //             }
    //         };
    //         console.log("enter 7")
    //         mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
    //         console.log("enter 8")
    //         return () => {
    //             mediaRecorder.removeEventListener('dataavailable', handleDataAvailable);
    //         };
    //     }
    // }, [mediaRecorder]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (mediaRecorder) {
    //         mediaRecorder.requestData();
    //         mediaRecorder.stop(); // Stop recording
    //         console.log("Recording stopped");
    //     }
    //     console.log(audioUrl)
    //     //navigate("/page3"); // Navigate to Page 3
    // };

    const navigate = useNavigate();
    const { mediaRecorder } = useMedia();
    const [audioUrl, setAudioUrl] = useState(null); // Stores audio URL
    const [isRecordingStopped, setIsRecordingStopped] = useState(false); // Tracks when the recording is stopped

    useEffect(() => {
        if (mediaRecorder) {
            const handleDataAvailable = (event) => {
                if (event.data.size > 0) {
                    const blob = new Blob([event.data], { type: 'audio/webm' });
                    const url = URL.createObjectURL(blob);
                    setAudioUrl(url); // Store the generated URL
                    console.log("Audio URL created:", url); // Log the URL
                }
            };

            mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
            return () => {
                mediaRecorder.removeEventListener('dataavailable', handleDataAvailable);
            };
        }
    }, [mediaRecorder]);

    // Trigger recording stop and wait for audioUrl to be generated before navigating
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mediaRecorder) {
            mediaRecorder.requestData(); // Triggers `dataavailable` event
            mediaRecorder.stop(); // Stop recording
            console.log("Recording stopped");
            setIsRecordingStopped(true);
        }
    };

    // React to when recording has stopped and audioUrl is set
    useEffect(() => {
        if (isRecordingStopped && audioUrl) {
            console.log("Stored Audio URL: ", audioUrl); // Log the stored URL after stopping the recording
            //navigate("/page3"); // Navigate to Page 3 after URL is generated
        }
    }, [audioUrl, isRecordingStopped, navigate]);
    const handleDownload = () => {
        if (audioUrl) {
            const a = document.createElement('a');
            a.href = audioUrl;
            console.log(audioUrl)
            a.download = 'recording.webm'; // Set the file name
            document.body.appendChild(a); // Append to body
            a.click(); // Trigger download
            document.body.removeChild(a); // Remove from body
            URL.revokeObjectURL(audioUrl); // Clean up URL object
            console.log("Download triggered");
        } else {
            console.log("No audio URL available for download");
        }
    };

    return (
        <div className="align-self: center min-h-screen flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl p-8 md:p-16 rounded-lg ">
                <div className="bg-gradient-to-t p-8 rounded-lg shadow-lg w-full h-full max-w-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="number"
                                id="number"
                                className="w-full p-3 rounded-lg bg-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                                placeholder="Enter Your Number"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg text-white font-bold focus:outline-none focus:ring-2 focus:ring-slate-300"
                        >
                            Next and End Recording
                        </button>
                    </form>
                    {audioUrl && (
                        <div>
                            <p>Recorded Audio:</p>
                            <audio controls src={audioUrl} />
                            <button onClick={handleDownload}>Download Recording</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
