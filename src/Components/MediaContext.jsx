import React, { createContext, useState, useContext } from 'react';

const MediaContext = createContext();

export function MediaProvider({ children }) {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    return (
        <MediaContext.Provider value={{ mediaRecorder, setMediaRecorder }}>
            {children}
        </MediaContext.Provider>
    );
}

export function useMedia() {
    return useContext(MediaContext);
}
