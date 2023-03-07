import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer() {
  const [pageNumber, setPageNumber] = useState(1);


  return (
    <div>
      <Document file="/kimball-resume.pdf">
        <Page pageNumber={pageNumber} renderTextLayer={false}/>
      </Document>
      <a href="/kimball-resume.pdf" download>Download</a>
    </div>
  );
}
