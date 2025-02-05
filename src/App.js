import React, { useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import PDFViewer from './PDFViewer.react';
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

function Resume() {
  return (
    <section className="card">
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

  const footerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    borderTop: '1px solid #e9ecef',
    width: '100%',
    bottom: 0
  };

  const textStyle = {
    margin: 0,
    paddingRight: '0.5rem'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    transition: 'color 0.2s'
  };

  return (
    <footer style={footerStyle} className='card footer'>
      <p style={textStyle}>Get in touch:</p>
      <a style={linkStyle} href={`mailto:${email}`}>{email}</a>
    </footer>
  );
}


export default function App() {
  useEffect(() => {
    document.body.style.backgroundImage = 'url("/background.png")';
    document.body.style.backgroundRepeat = 'repeat';
  }, []);

  return (
    <div className="container">
      <Header />
      <Resume />
      <Skills />
      <Footer />
    </div>
  );
};
