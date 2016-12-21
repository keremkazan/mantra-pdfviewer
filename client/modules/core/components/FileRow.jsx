import React from 'react';
import filesize from 'filesize';

const FileRow = React.createClass({
  removeFile(){
    let conf = confirm('Are you sure you want to delete the file?') || false;
    if (conf == true) {
      Meteor.call('files.remove', this.props.fileId, function (err, res) {
        if (err)
          console.log(err);
      });
    }
  },

  render() {
    const { fileName, fileSize, fileId } = this.props;
    const href = `/view/${fileId}`;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
              <a href={href}>
                {fileName}
              </a>
          </div>

          <div className="col-md-3">
            {filesize(fileSize, {round: 0})}
          </div>

          <div className="col-md-3">
            <button
              onClick={this.removeFile}
              className="btn btn-outline btn-danger btn-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
});
export default FileRow;
