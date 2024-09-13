import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedia } from './MediaContext'; // Adjust the path as necessary

export function Page2() {
    const navigate = useNavigate();
    const { mediaRecorder } = useMedia();
    const [audioUrl, setAudioUrl] = useState(null);

    useEffect(() => {
        if (mediaRecorder) {
            const handleDataAvailable = (event) => {
                if (event.data.size > 0) {
                    const blob = new Blob([event.data], { type: 'audio/webm' });
                    const url = URL.createObjectURL(blob);
                    setAudioUrl(url);
                    console.log("Audio URL created:", url);
                }
            };

            mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
            return () => {
                mediaRecorder.removeEventListener('dataavailable', handleDataAvailable);
            };
        }
    }, [mediaRecorder]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mediaRecorder) {
            mediaRecorder.stop(); // Stop recording
            console.log("Recording stopped");
        }
        navigate("/page3"); // Navigate to Page 3
    };

    const handleDownload = () => {
        if (audioUrl) {
            const a = document.createElement('a');
            a.href = audioUrl;
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
