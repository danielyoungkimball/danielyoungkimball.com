import React, { useRef, useState } from 'react';
import './CaptionGenerator.css';

const CaptionGenerator = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null); // Reference to the file input

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            // Update the file input element programmatically
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
        if (!image) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await fetch('http://localhost:4000/api/generate-caption', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setCaption(data.caption || 'Failed to generate caption.');
        } catch (error) {
            console.error('Error generating caption:', error);
            setCaption('Failed to generate caption. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div className="caption-generator card">
            <h2>AI-Powered Image Caption Generator</h2>
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
            <button onClick={handleGenerateCaption} disabled={!image || loading}>
                {loading ? 'Generating Caption...' : 'Generate Caption'}
            </button>
            {caption && <p className="generated-caption">{caption}</p>}
        </div>
    );
};

export default CaptionGenerator;
