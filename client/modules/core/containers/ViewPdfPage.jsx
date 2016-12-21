import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import React, { Component } from 'react';
import PDF from 'react-pdfjs';

class ViewPdfPage extends Component {
  render() {
    const { file } = this.props;
    console.log(file);
    return (
      <div>
      <h1>{file.name}</h1>
        <PDF page={1} file={file.link()} />
      </div>
    );
  }
}

export const composer = ({ files, fileId }, onData) => {
  if (Meteor.subscribe('files.public').ready()) {
    onData(null, {
      file: files.findOne(fileId),
    });
  }
};

export const depsMapper = (context, actions) => {
  const { Collections, Meteor } = context;
  return {
    files: Collections.Files,
  };
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ViewPdfPage);
