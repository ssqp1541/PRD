/**
 * Product 모델
 * 데이터베이스 연동 및 상품 관련 쿼리 처리
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

class Product {
  /**
   * 모든 상품 조회
   * @returns {Promise<Array>} 상품 배열
   */
  static async findAll() {
    const query = `
      SELECT 
        id, name, description, price, image_url,
        is_eco_friendly, is_female_producer, is_eco_packaging,
        created_at, updated_at
      FROM products
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);
    return result.rows;
  }

  /**
   * 필터 조건에 따른 상품 검색
   * @param {Object} filters - 필터 조건 객체
   * @param {boolean|null} filters.is_female_producer - 여성 생산자 필터
   * @param {boolean|null} filters.is_eco_packaging - 친환경 포장재 필터
   * @param {boolean|null} filters.is_eco_friendly - 친환경 원두 필터
   * @returns {Promise<Array>} 필터링된 상품 배열
   */
  static async findByFilters(filters = {}) {
    const conditions = [];
    const values = [];
    let paramIndex = 1;

    // 여성 생산자 필터
    if (filters.is_female_producer !== undefined && filters.is_female_producer !== null) {
      conditions.push(`is_female_producer = $${paramIndex}`);
      values.push(filters.is_female_producer);
      paramIndex++;
    }

    // 친환경 포장재 필터
    if (filters.is_eco_packaging !== undefined && filters.is_eco_packaging !== null) {
      conditions.push(`is_eco_packaging = $${paramIndex}`);
      values.push(filters.is_eco_packaging);
      paramIndex++;
    }

    // 친환경 원두 필터
    if (filters.is_eco_friendly !== undefined && filters.is_eco_friendly !== null) {
      conditions.push(`is_eco_friendly = $${paramIndex}`);
      values.push(filters.is_eco_friendly);
      paramIndex++;
    }

    // WHERE 절 구성
    const whereClause = conditions.length > 0 
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    const query = `
      SELECT 
        id, name, description, price, image_url,
        is_eco_friendly, is_female_producer, is_eco_packaging,
        created_at, updated_at
      FROM products
      ${whereClause}
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query, values);
    return result.rows;
  }

  /**
   * ID로 상품 조회
   * @param {number} id - 상품 ID
   * @returns {Promise<Object|null>} 상품 정보 또는 null
   */
  static async findById(id) {
    const query = `
      SELECT 
        id, name, description, price, image_url,
        is_eco_friendly, is_female_producer, is_eco_packaging,
        created_at, updated_at
      FROM products
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}

module.exports = Product;

