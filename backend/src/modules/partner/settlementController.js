/**
 * Settlement 컨트롤러
 * HTTP 요청/응답 처리
 */

const SettlementService = require('./settlementService');

class SettlementController {
  /**
   * 정산 데이터 조회
   * GET /api/partner/settlement
   */
  static async getSettlement(req, res, next) {
    try {
      // 파트너 ID 추출 (인증 미들웨어에서 설정된 것으로 가정)
      // 실제 구현 시 req.user 또는 req.partner에서 가져옴
      const partnerId = req.partner?.id || req.user?.partnerId || req.query.partnerId;
      
      if (!partnerId) {
        return res.status(403).json({
          success: false,
          message: '파트너 권한이 필요합니다.',
          error: 'FORBIDDEN',
        });
      }

      // 쿼리 파라미터에서 날짜 추출
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: '시작일과 종료일을 모두 입력해주세요.',
          error: 'MISSING_DATE_PARAMS',
        });
      }

      // 정산 데이터 계산
      const settlement = await SettlementService.calculateSettlement(
        parseInt(partnerId),
        startDate,
        endDate
      );

      return res.status(200).json({
        success: true,
        settlement,
      });
    } catch (error) {
      // 날짜 형식 오류
      if (error.message.includes('날짜 형식') || error.message.includes('시작일')) {
        return res.status(400).json({
          success: false,
          message: error.message,
          error: 'INVALID_DATE_FORMAT',
        });
      }

      // 파트너를 찾을 수 없는 경우
      if (error.message.includes('파트너를 찾을 수 없습니다')) {
        return res.status(404).json({
          success: false,
          message: error.message,
          error: 'PARTNER_NOT_FOUND',
        });
      }

      // 기타 에러는 next로 전달
      next(error);
    }
  }
}

module.exports = SettlementController;

