/**
 * Settlement 서비스
 * 정산 계산 비즈니스 로직 처리
 */

const Order = require('../../../models/Order');
const Partner = require('../../../models/Partner');

class SettlementService {
  /**
   * 정산 데이터 계산
   * @param {number} partnerId - 파트너 ID
   * @param {string} startDate - 시작일 (YYYY-MM-DD)
   * @param {string} endDate - 종료일 (YYYY-MM-DD)
   * @returns {Promise<Object>} 정산 데이터
   */
  static async calculateSettlement(partnerId, startDate, endDate) {
    // 날짜 형식 검증
    if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) {
      throw new Error('유효하지 않은 날짜 형식입니다. YYYY-MM-DD 형식을 사용하세요.');
    }

    // 시작일이 종료일보다 늦으면 에러
    if (new Date(startDate) > new Date(endDate)) {
      throw new Error('시작일은 종료일보다 이전이어야 합니다.');
    }

    // 파트너 정보 조회
    const partner = await Partner.findById(partnerId);
    if (!partner) {
      throw new Error('파트너를 찾을 수 없습니다.');
    }

    // 총 판매액 계산
    const { totalSales, orderCount } = await Order.calculateTotalSales(
      partnerId,
      startDate,
      endDate
    );

    // 플랫폼 수수료 계산
    const platformFeeRate = parseFloat(partner.platform_fee_rate) || 0.1; // 기본 10%
    const platformFee = totalSales * platformFeeRate;

    // 최종 정산액 계산
    const finalAmount = totalSales - platformFee;

    return {
      partnerId: partner.id,
      partnerName: partner.company_name,
      period: {
        startDate,
        endDate,
      },
      totalSales: parseFloat(totalSales.toFixed(2)),
      platformFee: parseFloat(platformFee.toFixed(2)),
      finalAmount: parseFloat(finalAmount.toFixed(2)),
      orderCount,
      platformFeeRate: parseFloat(platformFeeRate.toFixed(4)),
    };
  }

  /**
   * 날짜 형식 검증 (YYYY-MM-DD)
   * @param {string} date - 날짜 문자열
   * @returns {boolean} 유효성 여부
   */
  static isValidDate(date) {
    if (!date || typeof date !== 'string') {
      return false;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return false;
    }

    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }
}

module.exports = SettlementService;

