/**
 * Input 컴포넌트
 * 재사용 가능한 입력 필드 컴포넌트
 */

import React from 'react';

function Input({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  style = {},
  ...props
}) {
  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: error ? '1px solid #dc3545' : '1px solid #ced4da',
    borderRadius: '4px',
    transition: 'border-color 0.2s',
    outline: 'none',
    backgroundColor: disabled ? '#e9ecef' : 'white',
    cursor: disabled ? 'not-allowed' : 'text',
    ...style,
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#333',
  };

  const errorStyle = {
    marginTop: '0.25rem',
    fontSize: '0.875rem',
    color: '#dc3545',
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && <span style={{ color: '#dc3545', marginLeft: '0.25rem' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        style={inputStyle}
        {...props}
      />
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
}

export default Input;

