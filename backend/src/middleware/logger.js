/**
 * 로깅 미들웨어
 * HTTP 요청 로깅
 */

/**
 * HTTP 요청 로깅 미들웨어
 * 요청 메서드, URL, 상태 코드, 응답 시간을 로깅
 */
function requestLogger(req, res, next) {
  const startTime = Date.now();

  // 응답이 완료되면 로깅
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

    // 상태 코드에 따라 로그 레벨 결정
    if (res.statusCode >= 500) {
      console.error(`❌ ${logMessage}`);
    } else if (res.statusCode >= 400) {
      console.warn(`⚠️  ${logMessage}`);
    } else {
      console.log(`✅ ${logMessage}`);
    }
  });

  next();
}

/**
 * 에러 로깅 미들웨어
 * 에러 정보를 상세히 로깅
 */
function errorLogger(err, req, res, next) {
  console.error('에러 발생:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  next(err);
}

module.exports = {
  requestLogger,
  errorLogger,
};

