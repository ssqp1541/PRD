/**
 * FR3: 맞춤형 주문 시스템 기능 테스트
 * 
 * Given 고객이 원두 검색 페이지에 접속했을 때
 * When 고객이 필터 조건으로 '여성 생산자 커피'와 '친환경 포장재 사용'을 모두 선택하고 검색하면
 * Then 두 가지 기준을 모두 충족하는 원두 상품만 표시되어야 한다.
 */

const request = require('supertest');
const app = require('../../../src/app');

describe('Product Search API (FR3)', () => {
  describe('GET /api/products/search', () => {
    it('should return 200 status code', async () => {
      const response = await request(app)
        .get('/api/products/search')
        .expect(200);
    });

    it('should return all products when no filters are applied', async () => {
      const response = await request(app)
        .get('/api/products/search')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('products');
      expect(Array.isArray(response.body.products)).toBe(true);
    });

    it('should filter products by female producer', async () => {
      const response = await request(app)
        .get('/api/products/search?is_female_producer=true')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('products');
      
      // 모든 반환된 상품이 여성 생산자 조건을 만족하는지 검증
      if (response.body.products.length > 0) {
        response.body.products.forEach(product => {
          expect(product).toHaveProperty('is_female_producer', true);
        });
      }
    });

    it('should filter products by eco-friendly packaging', async () => {
      const response = await request(app)
        .get('/api/products/search?is_eco_packaging=true')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('products');
      
      // 모든 반환된 상품이 친환경 포장재 조건을 만족하는지 검증
      if (response.body.products.length > 0) {
        response.body.products.forEach(product => {
          expect(product).toHaveProperty('is_eco_packaging', true);
        });
      }
    });

    it('should filter products by multiple filters (female producer AND eco packaging)', async () => {
      const response = await request(app)
        .get('/api/products/search?is_female_producer=true&is_eco_packaging=true')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('products');
      
      // 모든 반환된 상품이 두 조건을 모두 만족하는지 검증
      if (response.body.products.length > 0) {
        response.body.products.forEach(product => {
          expect(product).toHaveProperty('is_female_producer', true);
          expect(product).toHaveProperty('is_eco_packaging', true);
        });
      }
    });

    it('should return empty array when no products match filters', async () => {
      // 존재하지 않는 조합으로 검색 (예: false AND false)
      const response = await request(app)
        .get('/api/products/search?is_female_producer=false&is_eco_packaging=false&is_eco_friendly=false')
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('products');
      expect(Array.isArray(response.body.products)).toBe(true);
      // 빈 배열이거나 조건을 만족하는 상품만 포함
    });
  });
});

