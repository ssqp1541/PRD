/**
 * Button 컴포넌트
 * 재사용 가능한 버튼 컴포넌트
 */

import React from 'react';
import { colors, fontSizes, fontWeights, spacing, borderRadius, transitions } from '../../constants/theme';

function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  children,
  type = 'button',
  style = {},
  ...props
}) {
  const baseStyle = {
    padding: size === 'small' ? `${spacing.sm} ${spacing.base}` : size === 'large' ? `${spacing.base} ${spacing.xl}` : `${spacing.md} ${spacing.lg}`,
    fontSize: size === 'small' ? fontSizes.sm : size === 'large' ? fontSizes.lg : fontSizes.base,
    fontWeight: fontWeights.medium,
    border: 'none',
    borderRadius: borderRadius.sm,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: `all ${transitions.base}`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary,
      color: colors.text.inverse,
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: colors.text.inverse,
    },
    danger: {
      backgroundColor: colors.danger,
      color: colors.text.inverse,
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `1px solid ${colors.primary}`,
    },
  };

  const combinedStyle = {
    ...baseStyle,
    ...variantStyles[variant],
  };

  return (
    <button
      type={type}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      style={combinedStyle}
      {...props}
    >
      {loading && (
        <span style={{ display: 'inline-block', width: '14px', height: '14px' }}>
          <svg
            style={{ animation: 'spin 1s linear infinite' }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" opacity="0.25" />
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </span>
      )}
      {children}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}

export default Button;

