import React from 'react';
import Navbar from '../components/Navbar';

export default ({ content }) => {
  return (
    <div>
      <Navbar />
      <div className="container">
        {content()}
      </div>
    </div>
  );
}
