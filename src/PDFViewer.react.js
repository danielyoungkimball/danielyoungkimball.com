import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';

const pdfFiles = [
    { file: "/kimball-resume.pdf", title: "Resume" },
    { file: "/kimball-meta-performance-rating.pdf", title: "Meta Performance Rating" },
    { file: "/kimball-meta-verification.pdf", title: "Meta Verification Letter" },
];

function PDFViewer() {
    const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
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

    const nextPdf = () => {
        setCurrentPdfIndex((prevIndex) => (prevIndex + 1) % pdfFiles.length);
    };

    const prevPdf = () => {
        setCurrentPdfIndex((prevIndex) => (prevIndex - 1 + pdfFiles.length) % pdfFiles.length);
    };

    const pageStyle = {
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
    };

    return (
        <>
            <div className="title">
                <h3>{pdfFiles[currentPdfIndex].title}</h3>
                <a href={pdfFiles[currentPdfIndex].file} download>Download</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div style={{ marginBottom: '10px' }}>
                    <button onClick={prevPdf} disabled={pdfFiles.length <= 1}>&lt; Prev</button>
                    <span style={{ margin: '0 10px' }}>PDF {currentPdfIndex + 1} / {pdfFiles.length}</span>
                    <button onClick={nextPdf} disabled={pdfFiles.length <= 1}>Next &gt;</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }} ref={containerRef}>
                    <Document file={pdfFiles[currentPdfIndex].file} style={{ width: '100%' }}>
                        <Page pageNumber={pageNumber} renderTextLayer={false} width={pageWidth} style={pageStyle} />
                    </Document>
                </div>
            </div>
        </>
    );
}

export default PDFViewer;
