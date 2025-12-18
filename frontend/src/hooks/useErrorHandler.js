/**
 * useErrorHandler 커스텀 훅
 * 에러 상태를 관리하는 간단한 훅
 * 
 * @returns {Object} { error, setError, clearError }
 * 
 * @example
 * const { error, setError, clearError } = useErrorHandler();
 * 
 * try {
 *   await someAsyncFunction();
 * } catch (err) {
 *   setError(err.message || '오류가 발생했습니다.');
 * }
 */
import { useState, useCallback } from 'react';

export function useErrorHandler(initialError = null) {
  const [error, setErrorState] = useState(initialError);

  /**
   * 에러 설정
   * @param {string|Error|null} errorValue - 에러 메시지 또는 Error 객체
   */
  const setError = useCallback((errorValue) => {
    if (errorValue instanceof Error) {
      setErrorState(errorValue.message);
    } else {
      setErrorState(errorValue);
    }
  }, []);

  /**
   * 에러 초기화
   */
  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  return {
    error,
    setError,
    clearError,
  };
}

