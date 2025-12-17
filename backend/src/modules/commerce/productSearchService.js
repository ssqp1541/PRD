/**
 * Product Search 서비스
 * 상품 검색 비즈니스 로직 처리
 */

const Product = require('../../../models/Product');

class ProductSearchService {
  /**
   * 상품 검색
   * @param {Object} filters - 필터 조건
   * @param {boolean|null} filters.is_female_producer - 여성 생산자 필터
   * @param {boolean|null} filters.is_eco_packaging - 친환경 포장재 필터
   * @param {boolean|null} filters.is_eco_friendly - 친환경 원두 필터
   * @returns {Promise<Object>} 검색 결과
   */
  static async searchProducts(filters = {}) {
    // 필터 조건 정리
    const cleanFilters = {};

    // boolean 필터 파싱
    if (filters.is_female_producer !== undefined) {
      cleanFilters.is_female_producer = filters.is_female_producer === 'true' || filters.is_female_producer === true;
    }

    if (filters.is_eco_packaging !== undefined) {
      cleanFilters.is_eco_packaging = filters.is_eco_packaging === 'true' || filters.is_eco_packaging === true;
    }

    if (filters.is_eco_friendly !== undefined) {
      cleanFilters.is_eco_friendly = filters.is_eco_friendly === 'true' || filters.is_eco_friendly === true;
    }

    // 상품 검색
    const products = await Product.findByFilters(cleanFilters);

    // 응답 형식으로 변환
    return {
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        image_url: product.image_url,
        is_eco_friendly: product.is_eco_friendly,
        is_female_producer: product.is_female_producer,
        is_eco_packaging: product.is_eco_packaging,
      })),
      total: products.length,
      filters: cleanFilters,
    };
  }
}

module.exports = ProductSearchService;

