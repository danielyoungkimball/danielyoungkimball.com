import React, { useState } from 'react';
import './CaptionGenerator.css';

const CaptionGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCaption = async () => {
    if (!inputText) return;
    setLoading(true);
    
    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: `Generate a creative social media caption for: ${inputText}`,
          max_tokens: 50
        })
      });
      
      const data = await response.json();
      setCaption(data.choices[0].text.trim());
    } catch (error) {
      console.error('Error fetching caption:', error);
      setCaption('Failed to generate caption. Try again!');
    }
    
    setLoading(false);
  };

  return (
    <div className="caption-generator card">
      <h2>AI-Powered Caption Generator</h2>
      <input 
        type="text" 
        placeholder="Enter video title or theme..." 
        value={inputText} 
        onChange={(e) => setInputText(e.target.value)} 
      />
      <button onClick={generateCaption} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Caption'}
      </button>
      {caption && <p className="generated-caption">{caption}</p>}
    </div>
  );
};

export default CaptionGenerator;