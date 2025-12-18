/**
 * Purchase 모델
 * 데이터베이스 연동 및 구매 기록 관련 쿼리 처리
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

class Purchase {
  /**
   * 사용자 ID와 기간으로 구매 기록 조회 (친환경 원두만)
   * @param {number} userId - 사용자 ID
   * @param {Date} startDate - 시작 날짜
   * @param {Date} endDate - 종료 날짜
   * @returns {Promise<Array>} 구매 기록 배열
   */
  static async findEcoFriendlyByUserIdAndDateRange(userId, startDate, endDate) {
    const query = `
      SELECT 
        p.id,
        p.user_id,
        p.product_id,
        p.quantity,
        p.purchase_date,
        pr.name as product_name,
        pr.is_eco_friendly
      FROM purchases p
      INNER JOIN products pr ON p.product_id = pr.id
      WHERE p.user_id = $1
        AND p.purchase_date >= $2
        AND p.purchase_date <= $3
        AND pr.is_eco_friendly = true
      ORDER BY p.purchase_date DESC
    `;
    
    const result = await pool.query(query, [userId, startDate, endDate]);
    return result.rows;
  }

  /**
   * 사용자 ID와 기간으로 모든 구매 기록 조회
   * @param {number} userId - 사용자 ID
   * @param {Date} startDate - 시작 날짜
   * @param {Date} endDate - 종료 날짜
   * @returns {Promise<Array>} 구매 기록 배열
   */
  static async findByUserIdAndDateRange(userId, startDate, endDate) {
    const query = `
      SELECT 
        p.id,
        p.user_id,
        p.product_id,
        p.quantity,
        p.purchase_date,
        pr.name as product_name,
        pr.is_eco_friendly
      FROM purchases p
      INNER JOIN products pr ON p.product_id = pr.id
      WHERE p.user_id = $1
        AND p.purchase_date >= $2
        AND p.purchase_date <= $3
      ORDER BY p.purchase_date DESC
    `;
    
    const result = await pool.query(query, [userId, startDate, endDate]);
    return result.rows;
  }
}

module.exports = Purchase;

