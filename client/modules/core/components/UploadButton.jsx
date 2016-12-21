import React from 'react';

export default ({ uploadFile, disabled }) => {
  const btnDisabled = disabled ? 'disabled' : '';
  const btnClass = `btn btn-success btn-file ${btnDisabled}`;
  return (
    <label className={btnClass}>
      Browse
      <input
        type="file"
        id="fileinput"
        style={{display: 'none'}}
        disabled={disabled}
        onChange={uploadFile}
      />
    </label>
  );
};
