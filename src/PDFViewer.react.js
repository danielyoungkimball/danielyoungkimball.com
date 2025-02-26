import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import './styles.css';

const pdfFiles = [
    { file: "/kimball-resume.pdf", title: "Resume" },
    { file: "/kimball-meta-performance-rating.pdf", title: "Meta Performance Rating" },
    { file: "/kimball-meta-verification.pdf", title: "Meta Verification Letter" },
    { file: "/kimball-employment-history.pdf", title: "Employment History" },
];

function PDFViewer() {
    const [searchParams] = useSearchParams();
    const fileFromURL = searchParams.get("file");
    const defaultPdfIndex = pdfFiles.findIndex(pdf => pdf.file === `/${fileFromURL}`) || 0;

    const [currentPdfIndex, setCurrentPdfIndex] = useState(defaultPdfIndex);
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);
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

    const handleDocumentLoad = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1); // Reset to first page on new document load
    };

    return (
        <div className="pdf-container">
            <div className="title">
                <h3>{pdfFiles[currentPdfIndex].title}</h3>
                <a href={pdfFiles[currentPdfIndex].file} download>Download</a>
            </div>

            {/* PDF File Navigation */}
            <div className="pdf-nav">
                <button 
                    onClick={() => setCurrentPdfIndex((prev) => (prev - 1 + pdfFiles.length) % pdfFiles.length)} 
                    disabled={pdfFiles.length <= 1}
                >
                    &lt; Prev PDF
                </button>
                <span>PDF {currentPdfIndex + 1} / {pdfFiles.length}</span>
                <button 
                    onClick={() => setCurrentPdfIndex((prev) => (prev + 1) % pdfFiles.length)} 
                    disabled={pdfFiles.length <= 1}
                >
                    Next PDF &gt;
                </button>
            </div>

            {/* PDF Page Navigation */}
            <div className="pdf-page-nav">
                <button 
                    onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))} 
                    disabled={pageNumber <= 1}
                >
                    &lt; Prev Page
                </button>
                <span>Page {pageNumber} / {numPages || "?"}</span>
                <button 
                    onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))} 
                    disabled={pageNumber >= numPages}
                >
                    Next Page &gt;
                </button>
            </div>

            {/* PDF Viewer */}
            <div ref={containerRef} className="pdf-viewer">
                <Document file={pdfFiles[currentPdfIndex].file} onLoadSuccess={handleDocumentLoad}>
                    <Page pageNumber={pageNumber} renderTextLayer={false} width={pageWidth} />
                </Document>
            </div>
        </div>
    );
}

export default PDFViewer;
