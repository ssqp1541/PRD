/**
 * JWT 유틸리티
 * JWT 토큰 생성 및 검증
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * JWT 토큰 생성
 * @param {number} userId - 사용자 ID
 * @param {string} email - 이메일
 * @param {string} role - 역할
 * @returns {string} JWT 토큰
 */
function generateToken(userId, email, role) {
  const payload = {
    userId,
    email,
    role,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * JWT 토큰 검증
 * @param {string} token - JWT 토큰
 * @returns {Object|null} 디코딩된 토큰 정보 또는 null
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * 요청 헤더에서 토큰 추출
 * @param {Object} req - Express 요청 객체
 * @returns {string|null} 토큰 또는 null
 */
function extractTokenFromHeader(req) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return null;
  }

  // "Bearer <token>" 형식에서 토큰 추출
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}

module.exports = {
  generateToken,
  verifyToken,
  extractTokenFromHeader,
};

