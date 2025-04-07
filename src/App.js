import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import Apple from './Apple.js';
import PDFViewer from './PDFViewer.react';
import CaptionGenerator from './CaptionGenerator';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import './header.css';
import './skills.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Header() {
  return (
    <header className="header card">
      <nav className="navigation">
        <Link to="/">Resume</Link> | <Link to="/ai-powered-caption-generator">AI Caption Generator</Link> | <Link to="/apple">Apple Contract</Link>
      </nav>
      <div className='row'>
        <div className="column">
          <div className="profile-card">
            <img src="/profileImg.png" alt="Profile" className="profile-picture" />
          </div>
        </div>
        <div className="column">
          <div className="header-info">
            <h1 className="name">Daniel Kimball</h1>
            <h2 className="job-title">Software Engineer</h2>
          </div>
        </div>
        <div className="column">
          <div className="header-links">
            <a href="https://www.linkedin.com/in/danielyoungkimball/" target="_blank" rel="noopener noreferrer">
              <img src="/linkedin.png" alt="LinkedIn" className="header-link" />
            </a>
            <a href="https://www.github.com/danielyoungkimball/" target="_blank" rel="noopener noreferrer">
              <img src="/github.png" alt="GitHub" className="header-link" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Resume() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/pdf-viewer?file=kimball-resume.pdf');  // Redirect to default PDF
  }, [navigate]);

  return null;  // Prevents rendering a blank screen
}


function Footer() {
  const email = 'danielyoungkimball@outlook.com';
  return (
    <footer className='card footer'>
      <p>Get in touch: <a href={`mailto:${email}`}>{email}</a></p>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.body.style.backgroundImage = 'url("/background.png")';
    document.body.style.backgroundRepeat = 'repeat';
  }, []);

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Resume />} />
          <Route path="/pdf-viewer" element={<PDFViewer />} />
          <Route path="/ai-powered-caption-generator" element={<CaptionGenerator />} />
          <Route path="/apple" element={<Apple />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
