const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const app = express();
const PORT = 4000;

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

app.use(cors());

// Use multer to handle `multipart/form-data`
const upload = multer({ dest: 'uploads/' });

// Proxy endpoint to OpenAI
app.post('/api/generate-caption', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(req.file.path));
        formData.append('purpose', 'captioning');

        const response = await axios.post('https://api.openai.com/v1/images/generate-caption', formData, {
            headers: {
                ...formData.getHeaders(),
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
        });

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        res.json(response.data);
    } catch (error) {
        console.error('Error from OpenAI:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate caption' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
