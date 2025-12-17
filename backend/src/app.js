/**
 * Express 앱 설정 파일
 */

const express = require('express');
const cors = require('cors');
const authRoutes = require('./modules/auth/authRoutes');

const app = express();

// 미들웨어 설정
app.use(cors()); // CORS 활성화
app.use(express.json()); // JSON 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터 파싱

// 라우트 설정
app.use('/api/auth', authRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({
    message: '솔직한 한 잔 (Honest Cup) API',
    version: '1.0.0',
  });
});

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '요청한 리소스를 찾을 수 없습니다.',
    error: 'NOT_FOUND',
  });
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || '서버 오류가 발생했습니다.',
    error: err.name || 'INTERNAL_SERVER_ERROR',
  });
});

module.exports = app;
