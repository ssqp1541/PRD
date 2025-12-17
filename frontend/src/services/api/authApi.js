/**
 * 인증 API 클라이언트
 * 백엔드 인증 API 호출 함수
 */

import axios from 'axios';
import apiConfig from '../../config/api';

const TOKEN_KEY = 'honest_cup_token';

/**
 * 토큰 저장
 * @param {string} token - JWT 토큰
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * 토큰 조회
 * @returns {string|null} JWT 토큰 또는 null
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * 토큰 제거
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * 회원가입
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @param {string} name - 이름
 * @returns {Promise<Object>} 사용자 정보 및 토큰
 */
export async function register(email, password, name) {
  try {
    const response = await axios.post(apiConfig.AUTH.REGISTER, {
      email,
      password,
      name,
    });

    if (response.data.success && response.data.data.token) {
      setToken(response.data.data.token);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      success: false,
      message: '회원가입 중 오류가 발생했습니다.',
      error: 'REGISTRATION_FAILED',
    };
  }
}

/**
 * 로그인
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise<Object>} 사용자 정보 및 토큰
 */
export async function login(email, password) {
  try {
    const response = await axios.post(apiConfig.AUTH.LOGIN, {
      email,
      password,
    });

    if (response.data.success && response.data.data.token) {
      setToken(response.data.data.token);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      success: false,
      message: '로그인 중 오류가 발생했습니다.',
      error: 'LOGIN_FAILED',
    };
  }
}

/**
 * 로그아웃
 */
export function logout() {
  removeToken();
}

/**
 * Axios 인터셉터 설정 (요청 시 토큰 자동 추가)
 */
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

