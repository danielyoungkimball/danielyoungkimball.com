import React from 'react';
import './styles.css';

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <div className="profile-card">
          <img src='/profileImg.png' alt="Profile" className="profile-picture" />
          <div className="header-info">
            <h1 className="name">John Doe</h1>
            <h2 className="job-title">Senior Software Engineer</h2>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/your_username" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/your_username" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <div className="card-left">
            <p>Milan, Italy</p>
          </div>
        </div>
      </header>

      <div className="main-content">
        <section className="card about">
          <h3>About Me</h3>
          <p>I am a highly skilled senior software engineer with over 10 years of experience. Specializing in modern web technologies, I am passionate about creating efficient, scalable, and elegant solutions.</p>
        </section>

        <section className="card skills">
          <h3>Skills</h3>
          <ul>
            <li>React</li>
            <li>JavaScript</li>
            <li>Node.js</li>
            <li>Python</li>
            <li>Java</li>
            <li>Git</li>
          </ul>
        </section>
      </div>

      <footer className="footer">
        <p>Contact: johndoe@example.com</p>
      </footer>
    </div>
  );
};
