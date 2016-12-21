import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {_} from 'meteor/underscore';
import { Files } from '/imports/collections';
import UploadButton from '../components/UploadButton';

class UploadFileForm extends Component {

  constructor() {
    super();
    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false
    };
  }

  showUploadStatus() {
    const { uploadInstance, progress } = this.props;
    if (!_.isEmpty(uploadInstance)) {
      return (
        <div className="progress">
          <div
            className="progress-bar progress-bar-success progress-bar-striped active"
            role="progressbar"
            aria-valuenow={progress || 0}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{width: progress + '%'}}
          >
            <span>{progress}%</span>
          </div>
        </div>
      );
    }
  }

  render() {
    const { uploadFile, inProgress } = this.props;
    const uploadMessage = inProgress ?
      'Uploading...' :
      'Click to upload a file.' ;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Upload File</h3>
        </div>
        <div className="panel-body">
          <div className="upload-btn-wrapper">
            <UploadButton
              uploadFile={uploadFile}
              disabled={inProgress}
            /> {uploadMessage}
          </div>

          {this.showUploadStatus()}
        </div>
      </div>
    );
  }
}


export const composer = ({ files, fileId, uploader }, onData) => {
  const { inProgress, progress, uploadInstance } = uploader();
  if (Meteor.subscribe('files.public').ready()) {
    onData(null, {
      inProgress,
      progress,
      uploadInstance,
      file: files.findOne(fileId),
    });
  }
};

export const depsMapper = (context, actions) => {
  const { Collections, Meteor, LocalState } = context;
  const { files } = actions;
  return {
    files: Collections.Files,
    uploadFile: files.uploadFile,
    uploader: () => {
      return LocalState.get('uploader');
    }
  };
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UploadFileForm);
