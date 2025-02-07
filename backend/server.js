const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 4000;

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

app.use(cors());
app.use(express.json());

app.post('/api/generate-caption', async (req, res) => {
    try {
        // Fixed prompt for generating an Instagram caption
        const prompt = 'Generate an Instagram caption for any photo.';

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are an assistant that generates Instagram captions.' },
                    { role: 'user', content: prompt },
                ],
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.json({ caption: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error from OpenAI:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate caption' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
