/**
 * Order 모델
 * 데이터베이스 연동 및 주문 관련 쿼리 처리
 */

const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL 연결 풀 생성
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'honest_cup',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

class Order {
  /**
   * 파트너별 기간별 총 판매액 계산
   * 
   * 주의: 현재 스키마에는 order_items 테이블이 없으므로,
   * 최소 구현을 위해 orders 테이블의 모든 완료된 주문을 집계합니다.
   * 향후 order_items 테이블이 추가되면 파트너별로 정확하게 필터링하도록 수정해야 합니다.
   * 
   * @param {number} partnerId - 파트너 ID
   * @param {string} startDate - 시작일 (YYYY-MM-DD)
   * @param {string} endDate - 종료일 (YYYY-MM-DD)
   * @returns {Promise<Object>} 총 판매액 및 주문 수
   */
  static async calculateTotalSales(partnerId, startDate, endDate) {
    // 최소 구현: 모든 완료된 주문을 집계
    // 실제 프로덕션에서는 order_items를 통해 파트너별로 정확하게 필터링해야 함
    const query = `
      SELECT 
        COALESCE(SUM(total_amount), 0) as total_sales,
        COUNT(id) as order_count
      FROM orders
      WHERE status = 'completed'
        AND DATE(created_at) >= $1
        AND DATE(created_at) <= $2
    `;
    
    const result = await pool.query(query, [startDate, endDate]);
    return {
      totalSales: parseFloat(result.rows[0].total_sales) || 0,
      orderCount: parseInt(result.rows[0].order_count) || 0,
    };
  }

  /**
   * ID로 주문 조회
   * @param {number} id - 주문 ID
   * @returns {Promise<Object|null>} 주문 정보 또는 null
   */
  static async findById(id) {
    const query = `
      SELECT 
        id, user_id, total_amount, status,
        created_at, updated_at
      FROM orders
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}

module.exports = Order;

