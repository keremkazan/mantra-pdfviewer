import React from 'react';
// import NewFileForm from '../containers/NewFileForm';
import FilesTable from '../containers/FilesTable';

export default () => {
  return (
    <div className="row">
      <div className="col-md-6">
        {/* <NewFileForm /> */}
      </div>
      <div className="col-md-6">
        <FilesTable />
      </div>
    </div>
  );
};
