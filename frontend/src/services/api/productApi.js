/**
 * Product API 서비스
 * 상품 관련 API 호출 함수
 */

import axios from 'axios';
import apiConfig from '../../config/api';

const API_BASE_URL = apiConfig.BASE_URL;

/**
 * 상품 추적 정보 조회
 * @param {number} productId - 상품 ID
 * @returns {Promise<Object>} 추적 정보
 */
export const getProductTracking = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/${productId}/tracking`);
    
    if (response.data.success) {
      return {
        producerRevenueRatio: response.data.producerRevenueRatio,
        farmLocation: response.data.farmLocation,
        origin: response.data.origin,
      };
    }
    
    throw new Error(response.data.message || '추적 정보를 가져오는데 실패했습니다.');
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('상품을 찾을 수 없습니다.');
    }
    
    throw error.response?.data || {
      message: '추적 정보를 가져오는데 실패했습니다.',
      error: 'FETCH_TRACKING_FAILED',
    };
  }
};
