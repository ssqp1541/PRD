/**
 * Carbon Service
 * 탄소 발자국 계산 및 관련 비즈니스 로직
 */

// 친환경 원두 1kg당 평균 탄소 절감량 (kg CO2)
const CARBON_REDUCTION_PER_KG = 12.5;

class CarbonService {
  /**
   * 탄소 발자국 절감량 계산
   * @param {Array} purchases - 구매 기록 배열
   * @returns {number} 총 탄소 절감량 (kg CO2)
   */
  static calculateCarbonReduction(purchases) {
    if (!purchases || purchases.length === 0) {
      return 0;
    }

    const totalKg = purchases.reduce((sum, purchase) => {
      return sum + parseFloat(purchase.quantity || 0);
    }, 0);

    return totalKg * CARBON_REDUCTION_PER_KG;
  }

  /**
   * 월별 집계 데이터 생성
   * @param {Array} purchases - 구매 기록 배열
   * @returns {Array} 월별 집계 배열
   */
  static calculateMonthlyBreakdown(purchases) {
    if (!purchases || purchases.length === 0) {
      return [];
    }

    // 월별로 그룹화
    const monthlyData = {};
    
    purchases.forEach(purchase => {
      const purchaseDate = new Date(purchase.purchase_date);
      const monthKey = `${purchaseDate.getFullYear()}-${String(purchaseDate.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          totalKg: 0,
        };
      }
      
      monthlyData[monthKey].totalKg += parseFloat(purchase.quantity || 0);
    });

    // 월별 절감량 계산 및 정렬
    const breakdown = Object.values(monthlyData)
      .map(monthData => ({
        month: monthData.month,
        reduction: monthData.totalKg * CARBON_REDUCTION_PER_KG,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return breakdown;
  }

  /**
   * 긍정적인 메시지 생성
   * @param {number} carbonReduction - 탄소 절감량 (kg)
   * @param {number} totalPurchases - 총 구매 횟수
   * @param {number} totalKg - 총 구매량 (kg)
   * @returns {string} 긍정적인 메시지
   */
  static generatePositiveMessage(carbonReduction, totalPurchases, totalKg) {
    if (totalPurchases === 0 || carbonReduction === 0) {
      return '아직 구매 기록이 없습니다. 친환경 원두를 구매하여 환경 보호에 기여해보세요!';
    }

    // 소수점 첫째 자리까지 반올림
    const roundedReduction = Math.round(carbonReduction * 10) / 10;
    
    return `${totalPurchases}개월간 친환경 원두 구매로 ${roundedReduction}kg의 탄소를 절감했습니다. 환경 보호에 기여해주셔서 감사합니다!`;
  }

  /**
   * 평균 절감량 계산
   * @param {number} totalReduction - 총 절감량
   * @param {number} totalKg - 총 구매량 (kg)
   * @returns {number} 평균 절감량/kg
   */
  static calculateAverageReductionPerKg(totalReduction, totalKg) {
    if (totalKg === 0) {
      return 0;
    }
    return totalReduction / totalKg;
  }
}

module.exports = CarbonService;

