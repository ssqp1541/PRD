/**
 * Input 컴포넌트
 * 재사용 가능한 입력 필드 컴포넌트
 */

import React from 'react';
import { colors, fontSizes, fontWeights, spacing, borderRadius, transitions } from '../../constants/theme';

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
    padding: spacing.md,
    fontSize: fontSizes.base,
    border: error ? `1px solid ${colors.danger}` : `1px solid ${colors.border.medium}`,
    borderRadius: borderRadius.sm,
    transition: `border-color ${transitions.base}`,
    outline: 'none',
    backgroundColor: disabled ? colors.background.light : colors.background.white,
    cursor: disabled ? 'not-allowed' : 'text',
    ...style,
  };

  const labelStyle = {
    display: 'block',
    marginBottom: spacing.sm,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
  };

  const errorStyle = {
    marginTop: spacing.xs,
    fontSize: fontSizes.sm,
    color: colors.danger,
  };

  return (
    <div style={{ marginBottom: spacing.base }}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && <span style={{ color: colors.danger, marginLeft: spacing.xs }}>*</span>}
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

