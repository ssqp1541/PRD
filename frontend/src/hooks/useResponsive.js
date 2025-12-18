/**
 * useResponsive 커스텀 훅
 * 화면 크기에 따른 반응형 상태를 관리하는 훅
 * 
 * @param {number} breakpoint - 모바일로 간주할 최대 너비 (기본값: 768)
 * @returns {boolean} isMobile - 현재 화면이 모바일 크기인지 여부
 * 
 * @example
 * const isMobile = useResponsive(768);
 * const isTablet = useResponsive(1024);
 */
import { useState, useEffect } from 'react';
import { DEFAULT_MOBILE_BREAKPOINT } from '../constants/breakpoints';

export function useResponsive(breakpoint = DEFAULT_MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(() => {
    // SSR 안전성을 위해 window 객체 체크
    if (typeof window === 'undefined') {
      return false;
    }
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // 초기값 설정 (useState의 초기값만으로는 부족할 수 있음)
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

