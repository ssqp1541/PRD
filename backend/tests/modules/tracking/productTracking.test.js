/**
 * FR1: 투명 정보 추적 기능 테스트
 * 
 * Given 고객이 특정 원두 상세 페이지에 접속했을 때
 * When 고객이 '원두 스토리 추적' 탭을 클릭하면
 * Then 생산자에게 돌아간 수익 비율 및 원산지 농장의 위치가 지도로 시각화되어 표시되어야 한다.
 */

const request = require('supertest');
const app = require('../../../src/app'); // 앱이 아직 없으므로 실패할 것

describe('Product Tracking API (FR1)', () => {
  describe('GET /api/products/:id/tracking', () => {
    it('should return 200 status code', async () => {
      const response = await request(app)
        .get('/api/products/1/tracking')
        .expect(200);
    });

    it('should return producer revenue ratio', async () => {
      const response = await request(app)
        .get('/api/products/1/tracking')
        .expect(200);
      
      expect(response.body).toHaveProperty('producerRevenueRatio');
      expect(typeof response.body.producerRevenueRatio).toBe('number');
      expect(response.body.producerRevenueRatio).toBeGreaterThan(0);
      expect(response.body.producerRevenueRatio).toBeLessThanOrEqual(100);
    });

    it('should return farm location for map visualization', async () => {
      const response = await request(app)
        .get('/api/products/1/tracking')
        .expect(200);
      
      expect(response.body).toHaveProperty('farmLocation');
      expect(response.body.farmLocation).toHaveProperty('latitude');
      expect(response.body.farmLocation).toHaveProperty('longitude');
      expect(response.body.farmLocation).toHaveProperty('address');
      
      // 좌표 유효성 검증
      expect(response.body.farmLocation.latitude).toBeGreaterThanOrEqual(-90);
      expect(response.body.farmLocation.latitude).toBeLessThanOrEqual(90);
      expect(response.body.farmLocation.longitude).toBeGreaterThanOrEqual(-180);
      expect(response.body.farmLocation.longitude).toBeLessThanOrEqual(180);
    });

    it('should return product origin information', async () => {
      const response = await request(app)
        .get('/api/products/1/tracking')
        .expect(200);
      
      expect(response.body).toHaveProperty('origin');
      expect(response.body.origin).toHaveProperty('country');
      expect(response.body.origin).toHaveProperty('region');
    });

    it('should return 404 for non-existent product', async () => {
      await request(app)
        .get('/api/products/99999/tracking')
        .expect(404);
    });
  });
});

