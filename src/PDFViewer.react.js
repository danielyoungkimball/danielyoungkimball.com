import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';

function PDFViewer() {
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

    const pageStyle = {
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }} ref={containerRef}>
            <Document file="/kimball-resume.pdf" style={{ width: '1000%' }}>
                <Page pageNumber={pageNumber} renderTextLayer={false} width={pageWidth} style={pageStyle} />
            </Document>
        </div>
    );
}

export default PDFViewer;