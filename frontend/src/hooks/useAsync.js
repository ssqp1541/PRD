/**
 * useAsync 커스텀 훅
 * 비동기 데이터 로딩 패턴을 통합하는 훅
 * 
 * @param {Function} asyncFunction - 실행할 비동기 함수
 * @param {boolean} immediate - 마운트 시 즉시 실행할지 여부 (기본값: false)
 * @returns {Object} { data, loading, error, execute, reset }
 * 
 * @example
 * const { data, loading, error, execute } = useAsync(
 *   () => getEthicalImpact(userId),
 *   false
 * );
 * 
 * useEffect(() => {
 *   if (userId) {
 *     execute();
 *   }
 * }, [userId]);
 */
import { useState, useCallback, useRef, useEffect } from 'react';

export function useAsync(asyncFunction, immediate = false) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  // 컴포넌트 언마운트 체크를 위한 ref
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  /**
   * 비동기 함수 실행
   * @param {...any} args - asyncFunction에 전달할 인자들
   */
  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const result = await asyncFunction(...args);
        if (mountedRef.current) {
          setData(result);
          setError(null);
        }
        return result;
      } catch (err) {
        if (mountedRef.current) {
          setError(err.message || err || '오류가 발생했습니다.');
          setData(null);
        }
        throw err;
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    [asyncFunction]
  );

  /**
   * 상태 초기화
   */
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // immediate가 true일 때 마운트 시 실행
  useEffect(() => {
    if (immediate) {
      execute();
    }
    // execute는 asyncFunction에 의존하므로 의도적으로 한 번만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

