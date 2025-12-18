/**
 * 보호된 라우트 컴포넌트
 * 인증되지 않은 사용자의 접근을 차단
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 보호할 자식 컴포넌트
 * @returns {JSX.Element} ProtectedRoute 컴포넌트
 * 
 * @example
 * <ProtectedRoute>
 *   <MyComponent />
 * </ProtectedRoute>
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  // 로딩 중일 때는 LoadingSpinner 컴포넌트 표시
  if (isLoading) {
    return (
      <LoadingSpinner 
        fullScreen 
        message="인증 상태를 확인하는 중..." 
      />
    );
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return children;
}

export default ProtectedRoute;

