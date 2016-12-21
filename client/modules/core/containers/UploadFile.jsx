import {ReactMeteorData} from 'meteor/react-meteor-data';
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/underscore';
import { Files } from '/imports/collections';

const FileUploadComponent = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState(){
    return {
      uploading: [],
      progress: 0,
      inProgress: false
    }
  },

  getMeteorData() {
    var handle = Meteor.subscribe('files.public');
    return {
      docsReadyYet: handle.ready(),
      docs: Files.find().fetch() // Collection is Files
    };
  },

  uploadFile(e){
    e.preventDefault();
    let self = this;
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      var file = e.currentTarget.files[0];
      if (file) {
        let uploadInstance = Files.insert({
          file: file,
          meta: {
            locator: self.props.fileLocator,
            // userId: Meteor.userId() // Optional, used to check on server for file tampering
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true // If you see issues with uploads, change this to false
        }, false);

        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true // Show the progress bar now
        });

        uploadInstance.on('uploaded', function (error, fileObj) {
          console.log('uploaded: ', fileObj);

          // Remove the filename from the upload box
          self.refs['fileinput'].value = '';

          // Reset our state for the next file
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false
          });
        });

        uploadInstance.on('progress', function (progress, fileObj) {
          self.setState({
            progress: progress
          })
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  },

  showUploadStatus() {
    const { uploading, progress } = this.state;
    if (!_.isEmpty(uploading)) {
      return (
        <div>
          {uploading.file.name}
          <div className="progress progress-bar-default">
            <div
              style={{width: progress + '%'}}
              aria-valuemax="100"
              aria-valuemin="0"
              aria-valuenow={progress || 0}
              role="progressbar"
              className="progress-bar"
            >
              <span className="sr-only">{progress}% Complete (success)</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>
      );
    }
  },

  render() {

    const { inProgress } = this.state

    if (this.data.docsReadyYet) {
      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <p>Upload New File:</p>
              <input
                type="file"
                id="fileinput"
                disabled={inProgress}
                ref="fileinput"
                onChange={this.uploadFile}
              />
            </div>
          </div>

          <div className="row">
            {this.showUploadStatus()}
          </div>

        </div>
      );
    } else {
      return <div></div>
    }
  }
});

export default FileUploadComponent;
