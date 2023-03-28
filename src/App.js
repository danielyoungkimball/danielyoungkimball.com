import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './styles.css';
import './header.css';
import './skills.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Header() {
  return (
    <header className="header card">
      <div className="column">
        <div className="profile-card">
          <img src='/profileImg.png' alt="Profile" className="profile-picture" />
        </div>
      </div>
      <div className="column">
        <div className="header-info">
          <h1 className="name">Daniel Kimball</h1>
          <h2 className="job-title">Senior Software Engineer</h2>
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
    </header>
  );
}

function PDFViewer() {
  const [pageNumber] = useState(1);
  const pageStyle = {
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Document file="/kimball-resume.pdf">
        <Page pageNumber={pageNumber} renderTextLayer={false} style={pageStyle} />
      </Document>
    </div>
  );
}



function Resume() {
  return (
    <section className="card">
      <div className='title'>
        <h3>Resume</h3>
        <a href="/kimball-resume.pdf" download>Download</a>
      </div>
      <PDFViewer />
    </section>
  );
}

function Skills() {
  return (
    <section className="card skills">
      <h3>Skills</h3>
      <div className="skills-section">
        <h4>Programming Languages:</h4>
        <ul>
          <li className="skill">JavaScript</li>
          <li className="skill">Python</li>
          <li className="skill">Java</li>
          <li className="skill">C++</li>
        </ul>
      </div>
      <div className="skills-section">
        <h4>Web Technologies:</h4>
        <ul>
          <li className="skill">HTML5</li>
          <li className="skill">CSS3</li>
          <li className="skill">React.js</li>
          <li className="skill">GraphQL</li>
          <li className="skill">Angular</li>
          <li className="skill">Vue.js</li>
        </ul>
      </div>
      <div className="skills-section">
        <h4>Backend Technologies:</h4>
        <ul>
          <li className="skill">Node.js</li>
          <li className="skill">Express.js</li>
          <li className="skill">Django</li>
          <li className="skill">Ruby on Rails</li>
        </ul>
      </div>
      <div className="skills-section">
        <h4>Databases:</h4>
        <ul>
          <li className="skill">SQL</li>
          <li className="skill">MongoDB</li>
          <li className="skill">Redis</li>
        </ul>
      </div>
      <div className="skills-section">
        <h4>Tools &amp; Technologies:</h4>
        <ul>
          <li className="skill">Git</li>
          <li className="skill">Docker</li>
          <li className="skill">Kubernetes</li>
          <li className="skill">Azure</li>
          <li className="skill">AWS</li>
          <li className="skill">Google Cloud</li>
        </ul>
      </div>
      <div className="skills-section">
        <h4>Soft Skills:</h4>
        <ul>
          <li className="skill">Agile Development</li>
          <li className="skill">Team Leadership</li>
          <li className="skill">Strong Communication</li>
        </ul>
      </div>
    </section>
  );
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
  return (
    <div className="container">
      <Header />
      <Resume />
      <Skills />
      <Footer />
    </div>
  );
};
