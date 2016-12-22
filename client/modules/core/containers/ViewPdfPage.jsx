import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import React, { Component } from 'react';
import PDF from 'react-pdfjs';
import FilesTable from './FilesTable';

class ViewPdfPage extends Component {
  renderPageButtons() {
    const { nextPage, prevPage, curPage } = this.props;
    const prevDisabled = (curPage == 1) ? 'disabled' : '';
    return (
      <div>
        <strong>Page: </strong>  {curPage} &nbsp;

        <button
          className={`btn btn-default ${prevDisabled}`}
          onClick={prevPage}
        >
          &laquo; Prev
        </button>

        &nbsp;

        <button className="btn btn-default" onClick={nextPage} >
          Next &raquo;
        </button>
      </div>
    );
  }
  render() {
    const { file, curPage } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{file.name}</h3>
            </div>
            <div className="panel-body pdf-content">
              {this.renderPageButtons()}
              <PDF page={curPage} file={file.link()} />
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <FilesTable />
        </div>
      </div>
    );
  }
}

export const composer = ({ files, fileId, viewer }, onData) => {
  const { curPage } = viewer();
  if (Meteor.subscribe('files.public').ready()) {
    onData(null, {
      curPage,
      file: files.findOne(fileId),
    });
  }
};

export const depsMapper = (context, actions) => {
  const { Collections, Meteor, LocalState } = context;
  const { files } = actions;
  const { nextPage, prevPage } = files;
  return {
    nextPage,
    prevPage,
    files: Collections.Files,
    viewer: () => {
      return LocalState.get('viewer');
    },
  };
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ViewPdfPage);
