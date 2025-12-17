/**
 * User 모델
 * 데이터베이스 연동 및 사용자 관련 쿼리 처리
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

class User {
  /**
   * 사용자 생성
   * @param {string} email - 이메일
   * @param {string} passwordHash - 해시된 비밀번호
   * @param {string} name - 이름
   * @param {string} role - 역할 (기본값: 'user')
   * @returns {Promise<Object>} 생성된 사용자 정보
   */
  static async createUser(email, passwordHash, name, role = 'user') {
    const query = `
      INSERT INTO users (email, password_hash, name, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, name, role, created_at, updated_at
    `;
    
    const result = await pool.query(query, [email, passwordHash, name, role]);
    return result.rows[0];
  }

  /**
   * 이메일로 사용자 조회 (비밀번호 해시 포함)
   * @param {string} email - 이메일
   * @returns {Promise<Object|null>} 사용자 정보 또는 null
   */
  static async findByEmail(email) {
    const query = `
      SELECT id, email, password_hash, name, role, created_at, updated_at
      FROM users
      WHERE email = $1
    `;
    
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  /**
   * ID로 사용자 조회
   * @param {number} id - 사용자 ID
   * @returns {Promise<Object|null>} 사용자 정보 또는 null
   */
  static async findById(id) {
    const query = `
      SELECT id, email, name, role, created_at, updated_at
      FROM users
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * 이메일 중복 확인
   * @param {string} email - 이메일
   * @returns {Promise<boolean>} 중복 여부 (true: 중복됨, false: 사용 가능)
   */
  static async isEmailExists(email) {
    const query = `
      SELECT EXISTS(SELECT 1 FROM users WHERE email = $1) as exists
    `;
    
    const result = await pool.query(query, [email]);
    return result.rows[0].exists;
  }
}

module.exports = User;

