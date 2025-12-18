/**
 * Product Search 컨트롤러
 * HTTP 요청/응답 처리
 */

const ProductSearchService = require('./productSearchService');

class ProductSearchController {
  /**
   * 상품 검색
   * GET /api/products/search
   */
  static async search(req, res, next) {
    try {
      // 쿼리 파라미터에서 필터 추출
      const filters = {
        is_female_producer: req.query.is_female_producer,
        is_eco_packaging: req.query.is_eco_packaging,
        is_eco_friendly: req.query.is_eco_friendly,
      };

      // 상품 검색
      const result = await ProductSearchService.searchProducts(filters);

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      // 기타 에러는 next로 전달
      next(error);
    }
  }
}

module.exports = ProductSearchController;

