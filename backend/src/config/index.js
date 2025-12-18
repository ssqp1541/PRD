/**
 * 환경 설정 파일
 * 환경별 설정 관리
 */

require('dotenv').config();

const config = {
  // 서버 설정
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
  },

  // 데이터베이스 설정
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'honest_cup',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
  },

  // JWT 설정
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },

  // CORS 설정
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  },
};

// 프로덕션 환경 검증
if (config.server.env === 'production') {
  if (config.jwt.secret === 'your-secret-key-change-in-production') {
    console.warn('⚠️  경고: 프로덕션 환경에서 기본 JWT 시크릿 키를 사용하고 있습니다!');
  }
}

module.exports = config;

