import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import React, { Component } from 'react';
import FileRow from '../components/FileRow';

class FilesTable extends Component {
  renderFiles() {
    const { files } = this.props;
    return (
      <ul className="list-group">
        {files.map((file, index) => {
          // let link = Files.findOne({_id: aFile._id}).link();
          return (
            <li className="list-group-item" key={'file' + index}>
              <FileRow
                fileName={file.name}
                fileId={file._id}
                fileSize={file.size}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  renderUploadPrompt() {
    const { files } = this.props;
    if (files.length == 0) {
      return (
        <div className="panel-body">
          You have not uploaded any files.
        </div>
      );
    } else {
      return (<div></div>)
    }
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Files</h3>
        </div>
        {this.renderUploadPrompt()}
        {this.renderFiles()}
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
