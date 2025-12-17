/**
 * LoadingSpinner 컴포넌트
 * 로딩 상태 표시 컴포넌트
 */

import React from 'react';

function LoadingSpinner({
  size = 'medium',
  fullScreen = false,
  message = '로딩 중...',
}) {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px',
  };

  const spinnerSize = sizeMap[size];

  const spinnerStyle = {
    width: spinnerSize,
    height: spinnerSize,
    border: `3px solid #f3f3f3`,
    borderTop: `3px solid #007bff`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const containerStyle = fullScreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      };

  const messageStyle = {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#666',
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle} />
      {message && <div style={messageStyle}>{message}</div>}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoadingSpinner;

