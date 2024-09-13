import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MediaProvider } from './Components/MediaContext';
import { Page1 } from './Components/Page1';
import { Page2 } from './Components/Page2';
import { Page3 } from './Components/Page3';

function App() {
    return (
        <MediaProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Page1 />} />
                    <Route path="/page2" element={<Page2 />} />
                    <Route path="/page3" element={<Page3 />} />
                </Routes>
            </Router>
        </MediaProvider>
    );
}

export default App;
