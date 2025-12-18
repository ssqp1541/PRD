/**
 * ErrorMessage 컴포넌트
 * 에러 메시지 표시 컴포넌트
 */

import React from 'react';
import { colors, fontSizes, spacing, borderRadius } from '../../constants/theme';

function ErrorMessage({
  message,
  type = 'error',
  onClose,
  style = {},
}) {
  const typeStyles = {
    error: {
      backgroundColor: colors.dangerBg,
      borderColor: colors.danger,
      color: colors.dangerDark,
    },
    warning: {
      backgroundColor: colors.warningBg,
      borderColor: colors.warning,
      color: colors.warningDark,
    },
    info: {
      backgroundColor: colors.infoBg,
      borderColor: colors.info,
      color: colors.infoDark,
    },
  };

  const containerStyle = {
    padding: `${spacing.md} ${spacing.base}`,
    border: '1px solid',
    borderRadius: borderRadius.sm,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...typeStyles[type],
    ...style,
  };

  const messageStyle = {
    flex: 1,
    margin: 0,
    fontSize: fontSizes.sm,
  };

  const containerStyle = {
    padding: `${spacing.md} ${spacing.base}`,
    border: '1px solid',
    borderRadius: borderRadius.sm,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...typeStyles[type],
    ...style,
  };

  const messageStyle = {
    flex: 1,
    margin: 0,
    fontSize: fontSizes.sm,
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: fontSizes.xl,
    cursor: 'pointer',
    padding: 0,
    marginLeft: spacing.base,
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

