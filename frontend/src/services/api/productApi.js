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

/**
 * 상품 검색
 * @param {Object} filters - 필터 조건
 * @param {boolean} filters.is_female_producer - 여성 생산자 필터
 * @param {boolean} filters.is_eco_packaging - 친환경 포장재 필터
 * @param {boolean} filters.is_eco_friendly - 친환경 원두 필터
 * @returns {Promise<Object>} 검색 결과
 */
export const searchProducts = async (filters = {}) => {
  try {
    // 쿼리 파라미터 구성
    const params = new URLSearchParams();
    
    if (filters.is_female_producer !== undefined && filters.is_female_producer !== null) {
      params.append('is_female_producer', filters.is_female_producer);
    }
    if (filters.is_eco_packaging !== undefined && filters.is_eco_packaging !== null) {
      params.append('is_eco_packaging', filters.is_eco_packaging);
    }
    if (filters.is_eco_friendly !== undefined && filters.is_eco_friendly !== null) {
      params.append('is_eco_friendly', filters.is_eco_friendly);
    }

    const queryString = params.toString();
    const url = `${API_BASE_URL}/api/products/search${queryString ? `?${queryString}` : ''}`;
    
    const response = await axios.get(url);
    
    if (response.data.success) {
      return {
        products: response.data.products,
        total: response.data.total,
        filters: response.data.filters,
      };
    }
    
    throw new Error(response.data.message || '상품 검색에 실패했습니다.');
  } catch (error) {
    throw error.response?.data || {
      message: '상품 검색에 실패했습니다.',
      error: 'SEARCH_PRODUCTS_FAILED',
    };
  }
};
