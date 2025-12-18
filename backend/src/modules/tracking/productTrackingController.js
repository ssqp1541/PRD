/**
 * Product Tracking 컨트롤러
 * HTTP 요청/응답 처리
 */

const ProductTrackingService = require('./productTrackingService');

class ProductTrackingController {
  /**
   * 상품 추적 정보 조회
   * GET /api/products/:id/tracking
   */
  static async getTracking(req, res, next) {
    try {
      const productId = parseInt(req.params.id, 10);

      // 상품 ID 유효성 검증
      if (isNaN(productId) || productId <= 0) {
        return res.status(400).json({
          success: false,
          message: '유효하지 않은 상품 ID입니다.',
          error: 'INVALID_PRODUCT_ID',
        });
      }

      // 추적 정보 조회
      const trackingData = await ProductTrackingService.getProductTracking(productId);

      return res.status(200).json({
        success: true,
        ...trackingData,
      });
    } catch (error) {
      if (error.message === 'PRODUCT_NOT_FOUND') {
        return res.status(404).json({
          success: false,
          message: '상품을 찾을 수 없습니다.',
          error: 'PRODUCT_NOT_FOUND',
        });
      }

      // 기타 에러는 next로 전달
      next(error);
    }
  }
}

module.exports = ProductTrackingController;

