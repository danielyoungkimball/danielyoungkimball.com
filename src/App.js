import React, { useEffect, useState, useRef } from 'react';
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

// --- Load GitHub repo data from markdown (for demo, parse as static, in real app fetch or use API) ---
const githubRepos = [
  {
    name: '1dollardayitinerary',
    url: 'https://github.com/danielyoungkimball/1dollardayitinerary',
    language: 'TypeScript',
    stars: 1,
    desc: 'No description',
  },
  {
    name: 'Daily-Python-Exercises',
    url: 'https://github.com/danielyoungkimball/Daily-Python-Exercises',
    language: 'Python',
    stars: 1,
    desc: 'TBH just for fun, i like doing random challenges',
  },
  {
    name: 'AI-Powered-Code-Revision-UI-for-Next.js-Chatbot',
    url: 'https://github.com/danielyoungkimball/AI-Powered-Code-Revision-UI-for-Next.js-Chatbot',
    language: 'TypeScript',
    stars: 0,
    desc: 'No description',
  },
  {
    name: 'AI-Powered-Resume-Screener',
    url: 'https://github.com/danielyoungkimball/AI-Powered-Resume-Screener',
    language: 'TypeScript',
    stars: 0,
    desc: "AI Powered Resume Screener Showcasing Skills in using AI API's",
  },
  {
    name: 'alos.coffee',
    url: 'https://github.com/danielyoungkimball/alos.coffee',
    language: 'TypeScript',
    stars: 0,
    desc: 'Website for Alo! Coffee and Bakery',
  },
  {
    name: 'sendmycatmoney.com',
    url: 'https://github.com/danielyoungkimball/sendmycatmoney.com',
    language: 'TypeScript',
    stars: 0,
    desc: "Donations for Joji's Snack Fund",
  },
  {
    name: 'upstart-project',
    url: 'https://github.com/danielyoungkimball/upstart-project',
    language: 'JavaScript',
    stars: 0,
    desc: 'No description',
  },
  // ...add more as needed
];

function useOutsideClick(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, handler]);
}

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  // Top 5 repos by stars, fallback to most recent if all are 0
  const topRepos = [...githubRepos]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 5);

  return (
    <nav className="navbar glassy-navbar sticky-navbar">
      <div className="navbar-left">
        <img src="/profileImg.png" alt="Profile" className="navbar-profile-pic" />
        <Link to="/" className="navbar-logo gradient-text">Daniel Kimball</Link>
      </div>
      <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
        <Link to="/" className="navbar-link">Home</Link>
        <a href="https://www.linkedin.com/in/danielyoungkimball/" target="_blank" rel="noopener noreferrer" className="navbar-link">LinkedIn</a>
        <a href="https://www.github.com/danielyoungkimball/" target="_blank" rel="noopener noreferrer" className="navbar-link">GitHub</a>
        <div className="navbar-dropdown" ref={dropdownRef}>
          <button
            className="navbar-link navbar-dropdown-toggle"
            onClick={() => setDropdownOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            Projects <span className="dropdown-arrow">▼</span>
          </button>
          <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
            <Link to="/projects" className="dropdown-item" style={{ fontWeight: 700 }}>All Projects →</Link>
            <Link to="/projects#caption-generator" className="dropdown-item">AI Caption Generator</Link>
            <Link to="/projects#apple-contract" className="dropdown-item">Apple Contract</Link>
            {topRepos.map((repo, i) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item"
                style={{ animationDelay: `${i * 0.07 + 0.1}s` }}
              >
                <span className="dropdown-repo-name">{repo.name}</span>
                <span className="dropdown-repo-lang">{repo.language}</span>
                <span className="dropdown-repo-stars">★ {repo.stars}</span>
                <span className="dropdown-repo-desc">{repo.desc}</span>
              </a>
            ))}
            <a
              href="https://github.com/danielyoungkimball"
              target="_blank"
              rel="noopener noreferrer"
              className="dropdown-item more-on-github"
              style={{ animationDelay: `${topRepos.length * 0.07 + 0.1}s` }}
            >
              More on GitHub →
            </a>
          </div>
        </div>
        <Link to="/resume" className="navbar-link">Resume</Link>
        <Link to="#contact" className="navbar-link">Contact</Link>
      </div>
      <button
        className={`navbar-burger ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}

function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section card">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Full Stack Software Engineer</span>
          </h1>
          <p className="hero-subtitle">
            Former Meta engineer, now focused on building clean, fast, meaningful products at smaller, more mission-driven teams.

            I spent three years working on large-scale infra, optimization tooling, and internal platforms used by leadership to drive billions in efficiency. After that, I left to prototype a startup, take on freelance work, and explore life outside big tech.

            These days I’m looking for opportunities where I can bring startup grit and product intuition—without sacrificing code quality or autonomy. I move fast, write clearly, and care deeply about user experience and clean abstractions.

            Currently U.S.-based, available for remote roles in any time zone, in-person within Los Angeles.
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">View Projects</Link>
            <Link to="/resume" className="btn btn-secondary">View Resume</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-elements">
            <div className="floating-card" style={{ '--delay': '0s' }}>
              <span>💻</span>
              <p>Full Stack Engineer</p>
            </div>
            <div className="floating-card" style={{ '--delay': '1s' }}>
              <span>🎥</span>
              <p>Content Creator</p>
            </div>
            <div className="floating-card" style={{ '--delay': '2s' }}>
              <span>🐱</span>
              <p>Cat Dad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section card skills">
        <h4>Technical Skills</h4>
        <div className="skills-categories">
          <div className="skills-category">
            <h5>Languages</h5>
            <div className="skills-tags">
              <span className="skills-tag">TypeScript</span>
              <span className="skills-tag">JavaScript</span>
              <span className="skills-tag">Python</span>
              <span className="skills-tag">GDScript</span>
              <span className="skills-tag">PHP</span>
              <span className="skills-tag">Java</span>
              <span className="skills-tag">C++</span>
              <span className="skills-tag">C</span>
              <span className="skills-tag">Rust</span>
              <span className="skills-tag">Go</span>
              <span className="skills-tag">Bash</span>
              <span className="skills-tag">SQL</span>
            </div>
          </div>
          <div className="skills-category">
            <h5>Frontend</h5>
            <div className="skills-tags">
              <span className="skills-tag">React.js</span>
              <span className="skills-tag">Next.js</span>
              <span className="skills-tag">TailwindCSS</span>
              <span className="skills-tag">Redux</span>
              <span className="skills-tag">GraphQL</span>
              <span className="skills-tag">Relay</span>
              <span className="skills-tag">Turbo</span>
              <span className="skills-tag">HTML5</span>
              <span className="skills-tag">CSS</span>
            </div>
          </div>
          <div className="skills-category">
            <h5>Backend</h5>
            <div className="skills-tags">
              <span className="skills-tag">Node.js</span>
              <span className="skills-tag">Express.js</span>
              <span className="skills-tag">Django</span>
              <span className="skills-tag">WebSockets</span>
              <span className="skills-tag">Ruby on Rails</span>
              <span className="skills-tag">Kafka</span>
            </div>
          </div>
          <div className="skills-category">
            <h5>Databases</h5>
            <div className="skills-tags">
              <span className="skills-tag">PostgreSQL</span>
              <span className="skills-tag">MongoDB</span>
              <span className="skills-tag">Redis</span>
              <span className="skills-tag">Firebase</span>
              <span className="skills-tag">Supabase</span>
              <span className="skills-tag">DynamoDB</span>
              <span className="skills-tag">MySQL</span>
            </div>
          </div>
          <div className="skills-category">
            <h5>Deployment</h5>
            <div className="skills-tags">
              <span className="skills-tag">Vercel</span>
              <span className="skills-tag">DigitalOcean</span>
              <span className="skills-tag">Railway</span>
              <span className="skills-tag">Netlify</span>
              <span className="skills-tag">AWS</span>
              <span className="skills-tag">Azure</span>
              <span className="skills-tag">Google Cloud</span>
              <span className="skills-tag">Docker</span>
              <span className="skills-tag">Kubernetes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section card skills">
        <h4>Technical Expertise</h4>
        <div className="skills-categories">
          <div className="skills-category">
            <h5>🚀 Core Technologies</h5>
            <div className="skills-tags">
              <span className="skills-tag">TypeScript</span>
              <span className="skills-tag">JavaScript</span>
              <span className="skills-tag">Python</span>
              <span className="skills-tag">React</span>
              <span className="skills-tag">Node.js</span>
              <span className="skills-tag">Next.js</span>
            </div>
          </div>
          <div className="skills-category">
            <h5>⚡ Performance & Scale</h5>
            <div className="skills-tags">
              <span className="skills-tag">WebSockets</span>
              <span className="skills-tag">Redis</span>
              <span className="skills-tag">PostgreSQL</span>
              <span className="skills-tag">Docker</span>
              <span className="skills-tag">AWS</span>
              <span className="skills-tag">Kubernetes</span>
            </div>
          </div>
          <div className="skills-category">
            <h5>🎨 Modern Development</h5>
            <div className="skills-tags">
              <span className="skills-tag">TailwindCSS</span>
              <span className="skills-tag">GraphQL</span>
              <span className="skills-tag">Vercel</span>
              <span className="skills-tag">Stripe</span>
              <span className="skills-tag">Supabase</span>
              <span className="skills-tag">Git</span>
            </div>
          </div>
          <div className="skills-category">
            <h5>🔧 Specialized Skills</h5>
            <div className="skills-tags">
              <span className="skills-tag">AI/ML Integration</span>
              <span className="skills-tag">Real-time Systems</span>
              <span className="skills-tag">API Design</span>
              <span className="skills-tag">Microservices</span>
              <span className="skills-tag">Testing</span>
              <span className="skills-tag">CI/CD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section card">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-icon">🎮</div>
            <h3>Vocara.world</h3>
            <p>Real-time multiplayer strategy game with dynamic gameplay and competitive features</p>
            <div className="project-tech">
              <span className="tech-tag">Godot</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">WebSockets</span>
              <span className="tech-tag">DigitalOcean</span>
            </div>
            <a href="https://vocara.world" target="_blank" rel="noopener noreferrer" className="project-link">Play Now →</a>
          </div>

          <div className="project-card">
            <div className="project-icon">🗺️</div>
            <h3>1dollardaytrip.com</h3>
            <p>Full stack day trip planner helping users discover and plan affordable adventures</p>
            <div className="project-tech">
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">PostgreSQL</span>
              <span className="tech-tag">Vercel</span>
            </div>
            <a href="https://1dollardaytrip.com" target="_blank" rel="noopener noreferrer" className="project-link">Plan a Trip →</a>
          </div>

          <div className="project-card">
            <div className="project-icon">☕</div>
            <h3>alos.coffee</h3>
            <p>Online coffee shop ordering system with integrated payments and WhatsApp notifications</p>
            <div className="project-tech">
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">Stripe</span>
              <span className="tech-tag">Supabase</span>
              <span className="tech-tag">WhatsApp API</span>
            </div>
            <a href="https://alos.coffee" target="_blank" rel="noopener noreferrer" className="project-link">Order Coffee →</a>
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="experience-section card">
        <h2 className="section-title">Professional Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>Software Engineer</h3>
              <h4>Meta (Facebook)</h4>
              <p>Designed and launched the Elastic Compute Interface, contributing $50 – 60 million in savings as part of
                Meta’s broader $1.2B Efficiency Program.</p>
              <p>Promoted to Mid-Level SWE within 1 year (Top 2%), earning Redefined Expectations rating.</p>
              <p>Developed the interface layer for Optimus, Meta’s internal elastic compute leasing system, enabling
                dynamic workloads to leverage temporary, zero-SLA capacity.</p>
              <p>Partnered with Finance/Infra teams to improve capacity cost forecasting across product and ML workloads.</p>
              <div className="timeline-tech">
                <span className="tech-badge">React</span>
                <span className="tech-badge">JavaScript</span>
                <span className="tech-badge">Full-Stack</span>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>Software Engineer</h3>
              <h4>Jori Health</h4>
              <p>A multi-agent clinical co-pilot built with LangGraph, enabling dynamic collaboration
                between LLM agents to assist oncologists with treatment planning.</p>
              <p>Developed a multi-agent clinical co-pilot built with LangGraph, enabling dynamic collaboration
                between LLM agents to assist oncologists with treatment planning.</p>
              <p>Deployed a RAG system with OpenAI embeddings and vector DBs to surface insights from PubMed and
                ClinicalTrials.gov</p>
              <p>Collaborated with clinicians and ML researchers to translate workflows into scalable product features</p>
              <div className="timeline-tech">
                <span className="tech-badge">Open AI API</span>
                <span className="tech-badge">LLM Engineering</span>
                <span className="tech-badge">Full-Stack</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section id="videos" className="video-showcase card">
        <h2 className="section-title">Creative Work</h2>
        <p className="section-subtitle">Watch my automated Adobe After Effects workflow in action</p>
        <div className="video-grid">
          <video src="/anim_0.mp4" controls muted loop style={{ '--video-index': '0' }} />
          <video src="/anim_1.mp4" controls muted loop style={{ '--video-index': '1' }} />
          <video src="/anim_2.mp4" controls muted loop style={{ '--video-index': '2' }} />
        </div>
      </section>
    </div>
  );
}

function ProjectsPage() {
  // Featured manual projects
  const featured = [
    {
      id: 'caption-generator',
      title: 'AI Caption Generator',
      desc: 'Generate creative Instagram captions with AI. Upload an image and get a smart, catchy caption instantly.',
      tech: ['React', 'Node.js', 'AI'],
      link: '/ai-powered-caption-generator',
      icon: '🤖',
    },
    {
      id: 'apple-contract',
      title: 'Apple Contract',
      desc: 'Adobe automation and creative workflow tools for Apple. Scripting, batch processing, and creative pipeline enhancements.',
      tech: ['JSX', 'Adobe Suite', 'Creative Coding'],
      link: '/apple',
      icon: '🍏',
    },
  ];
  // All GitHub projects
  const github = githubRepos;
  return (
    <div className="projects-page">
      <h1 className="section-title">Projects</h1>
      <div className="projects-grid">
        {featured.map((proj) => (
          <div className="project-card" id={proj.id} key={proj.id}>
            <div className="project-icon">{proj.icon}</div>
            <h3>{proj.title}</h3>
            <p>{proj.desc}</p>
            <div className="project-tech">
              {proj.tech.map((t) => <span className="tech-tag" key={t}>{t}</span>)}
            </div>
            <Link to={proj.link} className="project-link">View Project →</Link>
          </div>
        ))}
        {github.map((repo) => (
          <a
            className="project-card"
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="project-icon">💻</div>
            <h3>{repo.name}</h3>
            <p>{repo.desc}</p>
            <div className="project-tech">
              <span className="tech-tag">{repo.language}</span>
              <span className="tech-tag">★ {repo.stars}</span>
            </div>
            <span className="project-link">View on GitHub →</span>
          </a>
        ))}
      </div>
    </div>
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
    <footer className='card footer' id="contact">
      <p>Get in touch: <a href={`mailto:${email}`}>{email}</a></p>
      <div className="footer-links">
        <a href="https://www.linkedin.com/in/danielyoungkimball/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://www.github.com/danielyoungkimball/" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
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
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/pdf-viewer" element={<PDFViewer />} />
          <Route path="/ai-powered-caption-generator" element={<CaptionGenerator />} />
          <Route path="/apple" element={<Apple />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
