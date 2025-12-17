/**
 * API 설정
 * API 기본 URL 및 설정
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export default {
  BASE_URL: API_BASE_URL,
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
  },
  PRODUCTS: {
    TRACKING: (productId) => `${API_BASE_URL}/api/products/${productId}/tracking`,
  },
};

