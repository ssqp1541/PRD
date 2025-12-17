/**
 * User API 서비스
 * 사용자 관련 API 호출 함수
 */

import axios from 'axios';
import apiConfig from '../../config/api';

const API_BASE_URL = apiConfig.BASE_URL;

/**
 * 사용자 윤리 영향 리포트 조회
 * @param {number} userId - 사용자 ID
 * @returns {Promise<Object>} 윤리 영향 리포트 데이터
 */
export const getEthicalImpact = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/${userId}/ethical-impact`);
    
    if (response.data.success) {
      return {
        carbonFootprintReduction: response.data.carbonFootprintReduction,
        purchasePeriod: response.data.purchasePeriod,
        ecoFriendlyPurchases: response.data.ecoFriendlyPurchases,
        message: response.data.message,
        calculation: response.data.calculation,
        monthlyBreakdown: response.data.monthlyBreakdown,
      };
    }
    
    throw new Error(response.data.message || '윤리 영향 리포트를 가져오는데 실패했습니다.');
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }
    
    throw error.response?.data || {
      message: '윤리 영향 리포트를 가져오는데 실패했습니다.',
      error: 'FETCH_ETHICAL_IMPACT_FAILED',
    };
  }
};
