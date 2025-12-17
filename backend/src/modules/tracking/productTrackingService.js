/**
 * Product Tracking 서비스
 * 추적 정보 비즈니스 로직 처리
 */

const Tracking = require('../../../models/Tracking');

class ProductTrackingService {
  /**
   * 상품 추적 정보 조회
   * @param {number} productId - 상품 ID
   * @returns {Promise<Object>} 추적 정보
   * @throws {Error} 상품을 찾을 수 없을 때
   */
  static async getProductTracking(productId) {
    // 추적 정보 조회
    const tracking = await Tracking.findByProductId(productId);
    
    if (!tracking) {
      throw new Error('PRODUCT_NOT_FOUND');
    }

    // 응답 형식으로 변환
    return {
      producerRevenueRatio: parseFloat(tracking.producer_revenue_ratio),
      farmLocation: {
        latitude: parseFloat(tracking.farm_latitude),
        longitude: parseFloat(tracking.farm_longitude),
        address: tracking.farm_address || '',
      },
      origin: {
        country: tracking.origin_country,
        region: tracking.origin_region || '',
      },
    };
  }
}

module.exports = ProductTrackingService;

