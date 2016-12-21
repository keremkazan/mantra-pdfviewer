import React, { Component } from 'react';
import PDF from 'react-pdfjs';

export default class PDFWrapper extends React.Component {
  render() {
    return (
      <div>
        <PDF page={2} file="/pdfs/example.pdf" />
      </div>
    );
  }
}
