import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import './styles.css';

const pdfFiles = [
    { file: "/kimball-resume.pdf", title: "Resume" },
    { file: "/kimball-meta-performance-rating.pdf", title: "Meta Performance Rating" },
    { file: "/kimball-meta-verification.pdf", title: "Meta Verification Letter" },
];

function PDFViewer() {
    const [searchParams] = useSearchParams();
    const fileFromURL = searchParams.get("file");
    const defaultPdfIndex = pdfFiles.findIndex(pdf => pdf.file === `/${fileFromURL}`) || 0;

    const [currentPdfIndex, setCurrentPdfIndex] = useState(defaultPdfIndex);
    const [pageNumber] = useState(1);
    const [pageWidth, setPageWidth] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        function updatePageWidth() {
            if (containerRef.current) {
                setPageWidth(containerRef.current.offsetWidth);
            }
        }

        updatePageWidth();
        window.addEventListener('resize', updatePageWidth);
        return () => {
            window.removeEventListener('resize', updatePageWidth);
        };
    }, []);

    return (
        <div className="pdf-container">
            <div className="title">
                <h3>{pdfFiles[currentPdfIndex].title}</h3>
                <a href={pdfFiles[currentPdfIndex].file} download>Download</a>
            </div>
            <div className="pdf-nav">
                <button onClick={() => setCurrentPdfIndex((prev) => (prev - 1 + pdfFiles.length) % pdfFiles.length)} disabled={pdfFiles.length <= 1}>&lt; Prev</button>
                <span>PDF {currentPdfIndex + 1} / {pdfFiles.length}</span>
                <button onClick={() => setCurrentPdfIndex((prev) => (prev + 1) % pdfFiles.length)} disabled={pdfFiles.length <= 1}>Next &gt;</button>
            </div>
            <div ref={containerRef} className="pdf-viewer">
                <Document file={pdfFiles[currentPdfIndex].file}>
                    <Page pageNumber={pageNumber} renderTextLayer={false} width={pageWidth} />
                </Document>
            </div>
        </div>
    );
}

export default PDFViewer;
