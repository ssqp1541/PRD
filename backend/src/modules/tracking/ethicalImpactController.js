/**
 * Ethical Impact 컨트롤러
 * HTTP 요청/응답 처리
 */

const Purchase = require('../../../models/Purchase');
const User = require('../../../models/User');
const CarbonService = require('../../../services/carbon/carbonService');

class EthicalImpactController {
  /**
   * 사용자 윤리 영향 리포트 조회
   * GET /api/users/:userId/ethical-impact
   */
  static async getEthicalImpact(req, res, next) {
    try {
      const userId = parseInt(req.params.userId, 10);

      // 사용자 ID 유효성 검증
      if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({
          success: false,
          message: '유효하지 않은 사용자 ID입니다.',
          error: 'INVALID_USER_ID',
        });
      }

      // 사용자 존재 확인
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: '사용자를 찾을 수 없습니다.',
          error: 'USER_NOT_FOUND',
        });
      }

      // 3개월 전 날짜 계산
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 3);

      // 친환경 원두 구매 기록 조회
      const purchases = await Purchase.findEcoFriendlyByUserIdAndDateRange(
        userId,
        startDate,
        endDate
      );

      // 탄소 발자국 절감량 계산
      const carbonReduction = CarbonService.calculateCarbonReduction(purchases);

      // 총 구매량 계산
      const totalKg = purchases.reduce((sum, purchase) => {
        return sum + parseFloat(purchase.quantity || 0);
      }, 0);

      // 평균 절감량 계산
      const averageReductionPerKg = CarbonService.calculateAverageReductionPerKg(
        carbonReduction,
        totalKg
      );

      // 월별 집계 계산
      const monthlyBreakdown = CarbonService.calculateMonthlyBreakdown(purchases);

      // 긍정적인 메시지 생성
      const message = CarbonService.generatePositiveMessage(
        carbonReduction,
        monthlyBreakdown.length,
        totalKg
      );

      // 응답 데이터 구성
      const response = {
        success: true,
        carbonFootprintReduction: Math.round(carbonReduction * 10) / 10, // 소수점 첫째 자리까지
        purchasePeriod: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        ecoFriendlyPurchases: purchases.map(purchase => ({
          id: purchase.id,
          productName: purchase.product_name,
          isEcoFriendly: purchase.is_eco_friendly,
          quantity: parseFloat(purchase.quantity),
          purchaseDate: purchase.purchase_date,
        })),
        message: message,
        calculation: {
          totalPurchases: purchases.length,
          totalKg: Math.round(totalKg * 10) / 10,
          averageReductionPerKg: Math.round(averageReductionPerKg * 10) / 10,
        },
        monthlyBreakdown: monthlyBreakdown.map(item => ({
          month: item.month,
          reduction: Math.round(item.reduction * 10) / 10,
        })),
      };

      return res.status(200).json(response);
    } catch (error) {
      // 기타 에러는 next로 전달
      next(error);
    }
  }
}

module.exports = EthicalImpactController;

