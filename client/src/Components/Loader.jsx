import React from 'react';
import { Spinner } from 'react-bootstrap';
import vssutLogo from '../oav_logo.png';

function Loader() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
    >
      <Spinner animation="grow" className="custom-spinner" style={{ backgroundImage: `url(${vssutLogo})` }} />
    </div>
  );
}

export default Loader;
