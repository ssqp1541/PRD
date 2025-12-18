/**
 * Input 컴포넌트
 * 재사용 가능한 입력 필드 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.type - 입력 필드 타입 (기본값: 'text')
 * @param {string} props.label - 레이블 텍스트
 * @param {string} props.placeholder - 플레이스홀더 텍스트
 * @param {string} props.value - 입력 값
 * @param {Function} props.onChange - 변경 이벤트 핸들러
 * @param {string} props.error - 에러 메시지
 * @param {boolean} props.required - 필수 입력 여부
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {Object} props.style - 인라인 스타일 객체
 * @returns {JSX.Element} Input 컴포넌트
 * 
 * @example
 * <Input
 *   label="이메일"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   required
 * />
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
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

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

Input.defaultProps = {
  type: 'text',
  required: false,
  disabled: false,
  style: {},
};

export default memo(Input);

