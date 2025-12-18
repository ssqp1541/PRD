/**
 * 테마 상수
 * 색상, 폰트, 간격 등 디자인 시스템 값들을 통합 관리
 */

// 색상 팔레트
export const colors = {
  // Primary (메인 브랜드 색상)
  primary: '#007bff',
  primaryDark: '#0056b3',
  primaryLight: '#66b3ff',

  // Secondary (보조 색상)
  secondary: '#6c757d',
  secondaryDark: '#545b62',
  secondaryLight: '#adb5bd',

  // 상태 색상
  success: '#28a745',
  successDark: '#1e7e34',
  successLight: '#71dd8a',
  successBg: '#e8f5e9',

  danger: '#dc3545',
  dangerDark: '#c82333',
  dangerLight: '#f5c6cb',
  dangerBg: '#fee',

  warning: '#ffc107',
  warningDark: '#e0a800',
  warningLight: '#fff3cd',
  warningBg: '#fff3cd',

  info: '#17a2b8',
  infoDark: '#117a8b',
  infoLight: '#d1ecf1',
  infoBg: '#d1ecf1',

  // 텍스트 색상
  text: {
    primary: '#333',
    secondary: '#666',
    tertiary: '#999',
    disabled: '#ccc',
    inverse: '#fff',
  },

  // 배경 색상
  background: {
    white: '#fff',
    light: '#f8f9fa',
    lighter: '#f5f5f5',
    dark: '#333',
    darker: '#000',
  },

  // 테두리 색상
  border: {
    light: '#dee2e6',
    medium: '#ced4da',
    dark: '#ddd',
    darker: '#555',
  },

  // 투명도
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(255, 255, 255, 0.9)',
};

// 폰트 크기
export const fontSizes = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '2rem',      // 32px
  '4xl': '3rem',      // 48px
};

// 폰트 두께
export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

// 간격 (Spacing)
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  base: '1rem',    // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '4rem',   // 64px
};

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px',
};

// 그림자
export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 2px 4px rgba(0,0,0,0.1)',
  lg: '0 4px 6px rgba(0,0,0,0.1)',
  xl: '0 10px 15px rgba(0,0,0,0.1)',
};

// Z-Index 레이어
export const zIndex = {
  base: 1,
  dropdown: 100,
  sticky: 200,
  overlay: 1000,
  modal: 10000,
};

// 전환 효과 (Transitions)
export const transitions = {
  fast: '0.15s',
  base: '0.2s',
  slow: '0.3s',
};

// 최대 너비
export const maxWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
};

// 기본 테마 객체 (편의를 위해)
export const theme = {
  colors,
  fontSizes,
  fontWeights,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  transitions,
  maxWidth,
};

export default theme;

