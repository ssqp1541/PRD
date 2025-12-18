/**
 * API 설정
 * API 기본 URL 및 설정
 * 
 * 환경 변수 REACT_APP_API_BASE_URL이 설정되지 않은 경우 기본값 사용
 * .env 파일에서 REACT_APP_API_BASE_URL을 설정하세요
 * 
 * @see frontend/.env.example
 */

// 환경 변수에서 API 기본 URL 가져오기
const getApiBaseUrl = () => {
  const envUrl = process.env.REACT_APP_API_BASE_URL;
  
  if (envUrl) {
    return envUrl;
  }
  
  // 개발 환경 기본값
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // 프로덕션 환경에서는 환경 변수가 필수
  console.warn(
    'REACT_APP_API_BASE_URL이 설정되지 않았습니다. ' +
    '.env 파일에 REACT_APP_API_BASE_URL을 설정하세요.'
  );
  
  return 'http://localhost:3000';
};

const API_BASE_URL = getApiBaseUrl();

export default {
  BASE_URL: API_BASE_URL,
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
  },
  PRODUCTS: {
    TRACKING: (productId) => `${API_BASE_URL}/api/products/${productId}/tracking`,
  },
  USERS: {
    ETHICAL_IMPACT: (userId) => `${API_BASE_URL}/api/users/${userId}/ethical-impact`,
  },
};

