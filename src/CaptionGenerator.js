import React, { useRef, useState } from 'react';
import './CaptionGenerator.css';

const CaptionGenerator = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            if (fileInputRef.current) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInputRef.current.files = dataTransfer.files;
            }
        }
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
        }
    };

    const handleGenerateCaption = async () => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/api/generate-caption', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to generate caption. You have reached your usage limit. Please retry after some time.');
            }

            const data = await response.json();
            setCaption(data.caption);
        } catch (error) {
            console.error('Error generating caption:', error);
            setCaption('Failed to generate caption. You have reached your usage limit. Please retry after some time.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="caption-generator card">
            <h2>AI-Powered Instagram Caption Generator</h2>
            <div
                className="drop-zone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                {image ? (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Uploaded Preview"
                        className="preview-image"
                    />
                ) : (
                    <p>Drag & Drop an image here, or click to upload</p>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    ref={fileInputRef}
                />
            </div>
            <button onClick={handleGenerateCaption} disabled={loading}>
                {loading ? 'Generating Caption...' : 'Generate Caption'}
            </button>
            {caption && <p className="generated-caption">{caption}</p>}
        </div>
    );
};

export default CaptionGenerator;
