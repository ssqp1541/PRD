/**
 * 서버 실행 파일
 * Express 앱을 시작하고 포트에서 리스닝
 */

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// 서버 시작
const server = app.listen(PORT, () => {
  console.log(`
  ============================================
  서버가 시작되었습니다!
  ============================================
  환경: ${NODE_ENV}
  포트: ${PORT}
  URL: http://localhost:${PORT}
  ============================================
  `);
});

// Graceful shutdown 처리
process.on('SIGTERM', () => {
  console.log('SIGTERM 신호를 받았습니다. 서버를 종료합니다...');
  server.close(() => {
    console.log('서버가 종료되었습니다.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT 신호를 받았습니다. 서버를 종료합니다...');
  server.close(() => {
    console.log('서버가 종료되었습니다.');
    process.exit(0);
  });
});

// 처리되지 않은 에러 처리
process.on('unhandledRejection', (err) => {
  console.error('처리되지 않은 Promise 거부:', err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error('처리되지 않은 예외:', err);
  process.exit(1);
});

module.exports = server;

