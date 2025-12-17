/**
 * Partner API 서비스
 * 파트너 관련 API 호출 함수
 */

import axios from 'axios';
import apiConfig from '../../config/api';

const API_BASE_URL = apiConfig.BASE_URL;

/**
 * 정산 데이터 조회
 * @param {string} startDate - 시작일 (YYYY-MM-DD)
 * @param {string} endDate - 종료일 (YYYY-MM-DD)
 * @returns {Promise<Object>} 정산 데이터
 */
export const getSettlement = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/partner/settlement`, {
      params: {
        startDate,
        endDate,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (response.data.success) {
      return {
        settlement: response.data.settlement,
      };
    }
    
    throw new Error(response.data.message || '정산 데이터를 가져오는데 실패했습니다.');
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('파트너 권한이 필요합니다.');
    }
    if (error.response?.status === 400) {
      throw new Error(error.response.data.message || '유효하지 않은 요청입니다.');
    }
    
    throw error.response?.data || {
      message: '정산 데이터를 가져오는데 실패했습니다.',
      error: 'FETCH_SETTLEMENT_FAILED',
    };
  }
};

