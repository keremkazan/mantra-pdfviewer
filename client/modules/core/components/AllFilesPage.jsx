import React from 'react';
import UploadFileForm from '../containers/UploadFileForm';
import FilesTable from '../containers/FilesTable';

export default () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <UploadFileForm />
      </div>
      <div className="col-md-6">
        <FilesTable />
      </div>
    </div>
  );
};
