import React from 'react';
import './styles.css';
import PDFViewer from './PDFViewer';

function App() {
    return (
        <div className="container">
            <div className="leftColumn">
                <img src="/profileImg.png" alt="Profile" className="profile-img" />
            </div>
            <div className="rightColumn">
                <PDFViewer />
            </div>
        </div>
    );
}

export default App;
