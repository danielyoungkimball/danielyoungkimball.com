import React from 'react';
import './styles.css';

export default function App() {
    return (
        <div className="container">
            <header className="header">
                <img src='/profileImg.png' alt="Profile" className="profile-picture" />
                <h1>John Doe</h1>
                <h2>Senior Software Engineer</h2>
                <div className="social-links">
                    <a href="https://www.linkedin.com/in/your_username" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://github.com/your_username" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
            </header>

            <section className="about">
                <h3>About Me</h3>
                <p>I am a highly skilled senior software engineer with over 10 years of experience. Specializing in modern web technologies, I am passionate about creating efficient, scalable, and elegant solutions.</p>
            </section>

            <section className="skills">
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

            <section className="portfolio">
                <h3>Portfolio</h3>
                <div className="projects">
                    <div className="project">
                        <h4>Project 1</h4>
                        <p>A modern web application using React, Redux, and TypeScript.</p>
                    </div>
                    <div className="project">
                        <h4>Project 2</h4>
                        <p>A high-performance back-end service built with Node.js and Express.</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>Contact: johndoe@example.com</p>
            </footer>
        </div>
    );
};
