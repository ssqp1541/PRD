/**
 * 인증 컨텍스트
 * 전역 인증 상태 관리
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getToken, removeToken } from '../services/api/authApi';
import * as authApi from '../services/api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 로딩 시 토큰 확인
  useEffect(() => {
    const token = getToken();
    if (token) {
      // 토큰이 있으면 인증된 상태로 설정
      // 실제로는 토큰을 검증하는 API를 호출해야 하지만, MVP에서는 토큰 존재 여부만 확인
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  /**
   * 로그인
   * @param {string} email - 이메일
   * @param {string} password - 비밀번호
   * @returns {Promise<void>}
   */
  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return response;
      } else {
        throw new Error(response.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      throw error;
    }
  };

  /**
   * 회원가입
   * @param {string} email - 이메일
   * @param {string} password - 비밀번호
   * @param {string} name - 이름
   * @returns {Promise<void>}
   */
  const register = async (email, password, name) => {
    try {
      const response = await authApi.register(email, password, name);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return response;
      } else {
        throw new Error(response.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      throw error;
    }
  };

  /**
   * 로그아웃
   */
  const logout = () => {
    authApi.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * 인증 컨텍스트 사용 훅
 * @returns {Object} 인증 컨텍스트 값
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

