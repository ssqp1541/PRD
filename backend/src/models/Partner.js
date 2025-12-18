/**
 * Partner 모델
 * 데이터베이스 연동 및 파트너 관련 쿼리 처리
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

class Partner {
  /**
   * ID로 파트너 조회
   * @param {number} id - 파트너 ID
   * @returns {Promise<Object|null>} 파트너 정보 또는 null
   */
  static async findById(id) {
    const query = `
      SELECT 
        id, user_id, company_name, business_number,
        platform_fee_rate, created_at, updated_at
      FROM partners
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * 사용자 ID로 파트너 조회
   * @param {number} userId - 사용자 ID
   * @returns {Promise<Object|null>} 파트너 정보 또는 null
   */
  static async findByUserId(userId) {
    const query = `
      SELECT 
        id, user_id, company_name, business_number,
        platform_fee_rate, created_at, updated_at
      FROM partners
      WHERE user_id = $1
    `;
    
    const result = await pool.query(query, [userId]);
    return result.rows[0] || null;
  }
}

module.exports = Partner;

