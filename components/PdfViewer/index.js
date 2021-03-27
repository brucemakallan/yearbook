import React from 'react';
import { Document, Page } from 'react-pdf';

// TODO: Will Finish later
const Pdf = () => {
  const [pages, setNumPages] = React.useState();
  const [pageNumber, setPageNumber] = React.useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document
        file="somefile.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {pages}</p>
    </div>
  );
};

export default Pdf;
