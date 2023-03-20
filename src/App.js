import React, { useState } from 'react';
import './styles.css';
import PDFViewer from './PDFViewer';

export default function App() {
  const [isResumeVisible, setIsResumeVisible] = useState(false);

  const toggleResumeVisibility = () => {
    setIsResumeVisible(!isResumeVisible);
  };

  return (
    <div className="container">
      <div className="leftColumn">
        <div className="profile-img-container">
          <img src="/profileImg.png" alt="Profile" className="profile-img" />
          <div className="profile-links">
            <a href="https://www.linkedin.com/in/danielyoungkimball/" target="_blank" rel="noopener noreferrer">
              <img src="/linkedin.png" alt="LinkedIn" className="profile-link" />
            </a>
            <a href="https://www.github.com/danielyoungkimball/" target="_blank" rel="noopener noreferrer">
              <img src="/github.png" alt="GitHub" className="profile-link" />
            </a>
            <a href="https://www.instagram.com/danielyoungkimball/" target="_blank" rel="noopener noreferrer">
              <img src="/instagram.png" alt="Instagram" className="profile-link" />
            </a>
          </div>
          <div className="hover-card">
            <span>Milan, Italy 📍</span>
          </div>
        </div>
        <div className="profile-text-container">
          <h1 className="profile-name">Daniel Kimball</h1>
          <h2 className="profile-title">Software Engineer</h2>
          <p className="profile-description">
            I'm a software engineer with a passion for building web applications. I'm currently working at
            <a href="https://www.uber.com/" target="_blank" rel="noopener noreferrer"> Uber </a>
            as a Software Engineer on the
            <a href="https://www.uber.com/us/en/ride/uber-eats/" target="_blank" rel="noopener noreferrer"> Uber Eats </a>
            team. I'm also a recent graduate from
            <a href="https://www.berkeley.edu/" target="_blank" rel="noopener noreferrer"> UC Berkeley </a>
            with a degree in Computer Science.
          </p>
          <button className="toggle-resume-btn" onClick={toggleResumeVisibility}>
            {isResumeVisible ? 'Hide Resume' : 'Show Resume'}
          </button>
        </div>
      </div>
      <div className="rightColumn">
        {isResumeVisible ? <PDFViewer /> : null}
      </div>
    </div>
  );
}
