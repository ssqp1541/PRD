/**
 * ErrorMessage 컴포넌트
 * 에러 메시지 표시 컴포넌트
 */

import React from 'react';

function ErrorMessage({
  message,
  type = 'error',
  onClose,
  style = {},
}) {
  const typeStyles = {
    error: {
      backgroundColor: '#fee',
      borderColor: '#dc3545',
      color: '#721c24',
    },
    warning: {
      backgroundColor: '#fff3cd',
      borderColor: '#ffc107',
      color: '#856404',
    },
    info: {
      backgroundColor: '#d1ecf1',
      borderColor: '#17a2b8',
      color: '#0c5460',
    },
  };

  const containerStyle = {
    padding: '0.75rem 1rem',
    border: '1px solid',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...typeStyles[type],
    ...style,
  };

  const messageStyle = {
    flex: 1,
    margin: 0,
    fontSize: '0.9rem',
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: 0,
    marginLeft: '1rem',
    color: 'inherit',
    opacity: 0.7,
  };

  return (
    <div style={containerStyle} role="alert">
      <p style={messageStyle}>{message}</p>
      {onClose && (
        <button onClick={onClose} style={closeButtonStyle} aria-label="닫기">
          ×
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;

