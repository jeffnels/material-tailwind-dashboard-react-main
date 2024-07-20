import React from 'react';

const Loader = () => {
  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   
  };

  const spinnerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80px',
    height: '80px',
  };

  const dotStyle = {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#09f',
    animation: 'bounce 1.4s infinite ease-in-out both',
  };

  const dotStyle1 = {
    ...dotStyle,
    animationDelay: '-0.32s',
  };

  const dotStyle2 = {
    ...dotStyle,
    animationDelay: '-0.16s',
  };

  const keyframes = `
    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
      }
      40% {
        transform: scale(1);
      }
    }
  `;

  return (
    <div style={loaderStyle}>
      <div style={spinnerStyle}>
        <div style={dotStyle1}></div>
        <div style={dotStyle2}></div>
        <div style={dotStyle}></div>
      </div>
      <style>{keyframes}</style>
    </div>
  );
};

export default Loader;
