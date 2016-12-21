import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import React, { Component } from 'react';

class FilesTable extends Component {
  render() {
    const { files } = this.props;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Files</h3>
        </div>
        <div className="panel-body">
          {files.length}
          {/* <table className="table table-striped">
            <tbody>
              {files.map((file) => (
                <FilesTableRow
                  key={file._id}
                  file={file}
                />
              ))}
            </tbody>
          </table> */}
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
