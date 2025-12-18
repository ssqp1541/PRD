/**
 * Partner API 서비스
 * 파트너 관련 API 호출 함수
 * 
 * 참고: 인증 토큰은 authApi.js의 axios 인터셉터를 통해 자동으로 추가됩니다.
 * localStorage에 직접 접근하지 않고, authApi의 getToken() 함수를 사용하거나
 * axios 인터셉터를 활용합니다.
 */

import axios from 'axios';
import apiConfig from '../../config/api';
// authApi를 import하여 axios 인터셉터가 활성화되도록 함
import '../../services/api/authApi';

const API_BASE_URL = apiConfig.BASE_URL;

/**
 * 정산 데이터 조회
 * @param {string} startDate - 시작일 (YYYY-MM-DD)
 * @param {string} endDate - 종료일 (YYYY-MM-DD)
 * @returns {Promise<Object>} 정산 데이터
 */
export const getSettlement = async (startDate, endDate) => {
  try {
    // axios 인터셉터가 자동으로 Authorization 헤더를 추가합니다
    // authApi.js의 인터셉터가 'honest_cup_token' 키를 사용하여 토큰을 가져옵니다
    const response = await axios.get(`${API_BASE_URL}/api/partner/settlement`, {
      params: {
        startDate,
        endDate,
      },
      // headers에 Authorization을 수동으로 추가할 필요 없음
      // axios 인터셉터가 자동으로 처리합니다
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

