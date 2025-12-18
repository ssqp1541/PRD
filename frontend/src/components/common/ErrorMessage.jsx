/**
 * ErrorMessage 컴포넌트
 * 에러 메시지 표시 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.message - 표시할 메시지
 * @param {string} props.type - 메시지 타입 ('error' | 'warning' | 'info')
 * @param {Function} props.onClose - 닫기 버튼 클릭 핸들러 (선택)
 * @param {Object} props.style - 인라인 스타일 객체
 * @returns {JSX.Element} ErrorMessage 컴포넌트
 * 
 * @example
 * <ErrorMessage
 *   message="오류가 발생했습니다."
 *   type="error"
 *   onClose={() => console.log('closed')}
 * />
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
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

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'warning', 'info']),
  onClose: PropTypes.func,
  style: PropTypes.object,
};

ErrorMessage.defaultProps = {
  type: 'error',
  style: {},
};

export default memo(ErrorMessage);

