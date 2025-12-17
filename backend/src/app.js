/**
 * Express 앱 설정 파일
 */

const express = require('express');
const cors = require('cors');
const config = require('./config');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { setupSecurityHeaders } = require('./middleware/security');
const { sanitizeAll } = require('./middleware/sanitizer');
const apiRoutes = require('./routes');

const app = express();

// 보안 헤더 설정 (가장 먼저 적용)
setupSecurityHeaders(app);

// 미들웨어 설정
app.use(cors(config.cors)); // CORS 활성화
app.use(express.json()); // JSON 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터 파싱

// 입력 sanitization (XSS 방어)
app.use(sanitizeAll);

// 로깅 미들웨어 (라우트 처리 전에 위치)
app.use(requestLogger);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({
    message: '솔직한 한 잔 (Honest Cup) API',
    version: '1.0.0',
    environment: config.server.env,
  });
});

// API 라우트 설정
app.use('/api', apiRoutes);

// 헬스 체크 엔드포인트
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 핸들러 (모든 라우트 처리 후)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '요청한 리소스를 찾을 수 없습니다.',
    error: 'NOT_FOUND',
    path: req.originalUrl,
  });
});

// 에러 로깅 미들웨어 (에러 핸들러 전에 위치)
app.use(errorLogger);

// 에러 핸들러
app.use((err, req, res, next) => {
  // 개발 환경에서는 상세한 에러 정보 제공
  const isDevelopment = config.server.env === 'development';
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || '서버 오류가 발생했습니다.',
    error: err.name || 'INTERNAL_SERVER_ERROR',
    ...(isDevelopment && { stack: err.stack }), // 개발 환경에서만 스택 트레이스 제공
  });
});

module.exports = app;
