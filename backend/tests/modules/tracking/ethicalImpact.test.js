/**
 * FR2: 윤리 영향 리포트 기능 테스트
 * 
 * Given 고객이 3개월간 친환경 원두만 구매한 기록이 있을 때
 * When 고객이 마이페이지의 '나의 윤리적 영향' 섹션을 클릭하면
 * Then '누적 커피 탄소 발자국 절감량' 수치와 함께, 긍정적인 메시지가 표시되어야 한다.
 */

const request = require('supertest');
const app = require('../../../src/app'); // 앱이 아직 없으므로 실패할 것

describe('Ethical Impact API (FR2)', () => {
  const mockUserId = 1;
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  describe('GET /api/users/:userId/ethical-impact', () => {
    it('should return 200 status code', async () => {
      const response = await request(app)
        .get(`/api/users/${mockUserId}/ethical-impact`)
        .expect(200);
    });

    it('should return carbon footprint reduction amount', async () => {
      const response = await request(app)
        .get(`/api/users/${mockUserId}/ethical-impact`)
        .expect(200);
      
      expect(response.body).toHaveProperty('carbonFootprintReduction');
      expect(typeof response.body.carbonFootprintReduction).toBe('number');
      expect(response.body.carbonFootprintReduction).toBeGreaterThanOrEqual(0);
    });

    it('should aggregate purchase records for the last 3 months', async () => {
      const response = await request(app)
        .get(`/api/users/${mockUserId}/ethical-impact`)
        .expect(200);
      
      expect(response.body).toHaveProperty('purchasePeriod');
      expect(response.body.purchasePeriod).toHaveProperty('startDate');
      expect(response.body.purchasePeriod).toHaveProperty('endDate');
      
      // 3개월 기간 검증
      const startDate = new Date(response.body.purchasePeriod.startDate);
      const endDate = new Date(response.body.purchasePeriod.endDate);
      const monthsDiff = (endDate - startDate) / (1000 * 60 * 60 * 24 * 30);
      expect(monthsDiff).toBeCloseTo(3, 1);
    });

    it('should filter only eco-friendly coffee purchases', async () => {
      const response = await request(app)
        .get(`/api/users/${mockUserId}/ethical-impact`)
        .expect(200);
      
      expect(response.body).toHaveProperty('ecoFriendlyPurchases');
      expect(Array.isArray(response.body.ecoFriendlyPurchases)).toBe(true);
      
      // 모든 구매가 친환경 원두인지 검증
      if (response.body.ecoFriendlyPurchases.length > 0) {
        response.body.ecoFriendlyPurchases.forEach(purchase => {
          expect(purchase).toHaveProperty('isEcoFriendly');
          expect(purchase.isEcoFriendly).toBe(true);
        });
      }
    });

    it('should return positive message based on impact', async () => {
      const response = await request(app)
        .get(`/api/users/${mockUserId}/ethical-impact`)
        .expect(200);
      
      expect(response.body).toHaveProperty('message');
      expect(typeof response.body.message).toBe('string');
      expect(response.body.message.length).toBeGreaterThan(0);
      
      // 긍정적인 메시지 키워드 검증
      const positiveKeywords = ['감사', '환경', '기여', '절감', '좋은', '긍정'];
      const hasPositiveKeyword = positiveKeywords.some(keyword => 
        response.body.message.includes(keyword)
      );
      expect(hasPositiveKeyword).toBe(true);
    });

    it('should return 404 for non-existent user', async () => {
      await request(app)
        .get('/api/users/99999/ethical-impact')
        .expect(404);
    });

    it('should return empty impact data when user has no purchases', async () => {
      const response = await request(app)
        .get('/api/users/2/ethical-impact')
        .expect(200);
      
      expect(response.body).toHaveProperty('carbonFootprintReduction');
      expect(response.body.carbonFootprintReduction).toBe(0);
      expect(response.body).toHaveProperty('ecoFriendlyPurchases');
      expect(response.body.ecoFriendlyPurchases).toHaveLength(0);
    });
  });

  describe('Carbon Footprint Calculation', () => {
    it('should calculate carbon reduction based on purchase amount', async () => {
      const response = await request(app)
        .get(`/api/users/${mockUserId}/ethical-impact`)
        .expect(200);
      
      expect(response.body).toHaveProperty('calculation');
      expect(response.body.calculation).toHaveProperty('totalPurchases');
      expect(response.body.calculation).toHaveProperty('averageReductionPerKg');
      expect(response.body.calculation).toHaveProperty('totalKg');
    });

    it('should include breakdown of impact by month', async () => {
      const response = await request(app)
        .get(`/api/users/${mockUserId}/ethical-impact`)
        .expect(200);
      
      expect(response.body).toHaveProperty('monthlyBreakdown');
      expect(Array.isArray(response.body.monthlyBreakdown)).toBe(true);
      
      // 최대 3개월 데이터
      expect(response.body.monthlyBreakdown.length).toBeLessThanOrEqual(3);
    });
  });
});

