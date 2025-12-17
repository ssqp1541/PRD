/**
 * Tracking 모델
 * 데이터베이스 연동 및 추적 정보 관련 쿼리 처리
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

class Tracking {
  /**
   * 상품 ID로 추적 정보 조회
   * @param {number} productId - 상품 ID
   * @returns {Promise<Object|null>} 추적 정보 또는 null
   */
  static async findByProductId(productId) {
    const query = `
      SELECT 
        id,
        product_id,
        producer_revenue_ratio,
        farm_latitude,
        farm_longitude,
        farm_address,
        origin_country,
        origin_region,
        created_at,
        updated_at
      FROM tracking
      WHERE product_id = $1
    `;
    
    const result = await pool.query(query, [productId]);
    return result.rows[0] || null;
  }

  /**
   * 상품 ID로 추적 정보 존재 여부 확인
   * @param {number} productId - 상품 ID
   * @returns {Promise<boolean>} 존재 여부
   */
  static async existsByProductId(productId) {
    const query = `
      SELECT EXISTS(SELECT 1 FROM tracking WHERE product_id = $1) as exists
    `;
    
    const result = await pool.query(query, [productId]);
    return result.rows[0].exists;
  }
}

module.exports = Tracking;

