import React from 'react';
import './Apple.css';

const Apple = () => {
    return (
        <div className="apple-page card">
            <h2>Apple Contract Opportunity</h2>

            {/* Highlight Reel */}
            <p>
                With <strong>4 years of software engineering experience</strong>, including time at <strong>Meta</strong>,
                I have built a deep foundation in <strong>JavaScript</strong>, <strong>automation</strong>, and <strong>full-stack development</strong>.
                My background uniquely blends <strong>technical problem-solving</strong> with <strong>creative automation</strong>, making me a strong fit for this role.
            </p>
            <p>
                At <strong>Meta</strong>, I worked on scalable <strong>web applications</strong> and honed my expertise in <strong>JavaScript (JSX/ExtendScript)</strong>,
                <strong>React</strong>, and <strong>backend scripting</strong>. Since then, I’ve specialized in <strong>Adobe After Effects</strong> and <strong>Photoshop automations</strong>,
                developing tools that optimize <strong>workflows</strong>, enhance <strong>rendering efficiency</strong>, and streamline <strong>batch processing</strong> for large-scale creative projects.
            </p>
            <p>
                I know where <strong>automation</strong> makes the biggest impact—whether it’s <strong>batch processing</strong> animations,
                optimizing <strong>render pipelines</strong>, or scripting <strong>workflow automation</strong> to free up creative time.
                My ability to work seamlessly across <strong>Adobe’s scripting ecosystem</strong>, leveraging <strong>JavaScript (JSX/ExtendScript)</strong>,
                <strong>JSON-based automation</strong>, and integrations with <strong>Swift</strong>, <strong>Python</strong>, and <strong>Objective-C</strong>,
                allows me to design solutions that don’t just work—they <strong>transform</strong> how creatives interact with their tools.
            </p>
            <p>
                <strong>Apple’s commitment to innovation</strong> aligns with my passion for creating <strong>elegant, high-impact automation solutions</strong>
                that empower creators to <strong>work smarter and more intuitively</strong>. This role is a perfect match for my <strong>technical and creative</strong>
                expertise, and I’m excited about the opportunity to contribute to <strong>Apple’s Adobe automation ecosystem</strong>.
            </p>

            <h3>Relevant Skills & Experience</h3>
            <ul>
                <li>Extensive hands-on experience with <strong>Adobe After Effects</strong> and <strong>Photoshop</strong></li>
                <li>Automation scripting using <strong>JavaScript (JSX/ExtendScript)</strong></li>
                <li>Proficient in <strong>Swift, Python, and Objective-C</strong></li>
                <li>Experience optimizing <strong>render performance and workflow efficiency</strong></li>
                <li>Strong understanding of <strong>FFmpeg, AVFoundation, and video transcoding</strong></li>
                <li>Full-stack development experience with a problem-solving mindset</li>
            </ul>

            <h3>Portfolio</h3>
            <p>Check out my work on <a href="https://github.com/danielyoungkimball" target="_blank" rel="noreferrer">GitHub</a> and <a href="https://danielyoungkimball.com" target="_blank" rel="noreferrer">my website</a>.</p>

            {/* Video Grid */}
            <h3>Examples of My Automated Adobe After Effects Workflow</h3>
            <p>These videos demonstrate my batch processing system, which automates animation rendering on every 4th frame.</p>
            <div className="video-grid">
                <video src="/anim_0.mp4" controls muted loop />
                <video src="/anim_1.mp4" controls muted loop />
                <video src="/anim_2.mp4" controls muted loop />
            </div>

            {/* Code Snippet */}
            <h3>Sample Automation Code</h3>
            <p>This script automates After Effects to render only every 4th frame for efficient batch processing.</p>
            <pre className="code-snippet">
                <code>
                    {`// Batch-process every 4th frame in After Effects & store settings in JSON
var comp = app.project.activeItem;
var frameStep = 4; // Process every 4th frame
var automationSettings = { processedFrames: [] };

for (var i = 0; i < comp.numLayers; i++) {
    var layer = comp.layer(i + 1);
    if (layer.canSetTimeRemapEnabled) {
        layer.timeRemapEnabled = true;
        for (var f = 0; f < comp.duration; f += frameStep) {
            layer.timeRemap.setValueAtTime(f / comp.frameRate, f / comp.frameRate);
            automationSettings.processedFrames.push(f);
        }
    }
}

// Save automation settings to an external JSON file
var jsonFile = new File("~/Desktop/after_effects_automation.json");
jsonFile.open("w");
jsonFile.write(JSON.stringify(automationSettings, null, 2));
jsonFile.close();

alert("Batch processing complete. JSON settings saved.");
`}
                </code>
            </pre>

            {/* Why This Snippet Works */}
            <h3>How This Snippet Works</h3>
            <div className="why-it-works">
                <p>✅ <strong>Automation</strong> → When I animate frames, it's done independantly in Procreate so I need a good way to bring it to life in <strong>Adobe After Effects</strong></p>
                <p>✅ <strong>Uses JavaScript (JSX/ExtendScript)</strong> → Matches <em>"Adobe After Effects and Photoshop automations (JavaScript, external JSX/JSON file creation)"</em> in the job description</p>
                <p>✅ <strong>Demonstrates efficiency improvements</strong> → Batch-processing every 4th frame showcases my <strong>workflow optimization</strong> so that I can continue creating faster</p>
            </div>
        </div>
    );
};

export default Apple;
