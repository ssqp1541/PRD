/**
 * 보안 헤더 미들웨어
 * Helmet.js를 사용한 보안 헤더 설정
 */

const helmet = require('helmet');

/**
 * 보안 헤더 설정
 * @param {Object} app - Express 앱 인스턴스
 */
function setupSecurityHeaders(app) {
  // Helmet 기본 설정 적용
  app.use(helmet());

  // 추가 보안 헤더 설정
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  }));

  // XSS 방어 헤더
  app.use(helmet.xssFilter());

  // MIME 타입 스니핑 방어
  app.use(helmet.noSniff());

  // 클릭재킹 방어
  app.use(helmet.frameguard({ action: 'deny' }));

  // HSTS (HTTP Strict Transport Security)
  app.use(helmet.hsts({
    maxAge: 31536000, // 1년
    includeSubDomains: true,
    preload: true,
  }));
}

module.exports = {
  setupSecurityHeaders,
};

