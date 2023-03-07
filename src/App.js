import React from 'react';
import './styles.css';
import PDFViewer from './PDFViewer';

function App() {
  return (
    <div className="container">
      <div className="leftColumn">
        <div className="centered">
          <div className="profile-img-container">
            <img src="/profileImg.png" alt="Profile" className="profile-img" />
            <div className="hover-card">
              <span>Milan, Italy 📍</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rightColumn">
        <PDFViewer />
      </div>
    </div>
  );
}

export default App;
