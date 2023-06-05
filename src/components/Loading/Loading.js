import React from 'react';
import HashLoader  from 'react-spinners/HashLoader';
import './Loading.css'

const Loading = () => {
  return (
    <div className="bg-loading">
      <HashLoader 
        color={'#912a31'}
        size={100}
        loading={true}
        speedMultiplier={1}
        cssOverride={{
          background: 'none',
          zIndex: '10000',
          width: '100%',
          height: '100%',
          margin: 'auto',
        }}
      />
    </div>
  );
};

export default Loading;
