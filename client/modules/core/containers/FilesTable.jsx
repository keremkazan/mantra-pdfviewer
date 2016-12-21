import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import React, { Component } from 'react';
import FileView from '../components/FileView';

class FilesTable extends Component {

  renderFiles() {
    const { files } = this.props;
    return files.map((file, index) => {
      // let link = Files.findOne({_id: aFile._id}).link();
      return (
        <div key={'file' + index}>
          <FileView
            fileName={file.name}
            fileUrl={'kerem'}
            fileId={file._id}
            fileSize={file.size}
          />
        </div>
      );
    });
  }
  render() {

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Files</h3>
        </div>
        <div className="panel-body">
          {this.renderFiles()}
        </div>
      </div>
    );
  }
}

export const composer = ({ files }, onData) => {
  if (Meteor.subscribe('files.public').ready()) {
    onData(null, {
      files: files.find().fetch(),
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
)(FilesTable);
