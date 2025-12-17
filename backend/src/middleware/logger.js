/**
 * 로깅 미들웨어
 * HTTP 요청 로깅 및 에러 로깅
 */

const Logger = require('../utils/logger');

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
      Logger.error(logMessage, {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip,
      });
    } else if (res.statusCode >= 400) {
      Logger.warn(logMessage, {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip,
      });
    } else {
      Logger.info(logMessage, {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
      });
    }
  });

  next();
}

/**
 * 에러 로깅 미들웨어
 * 에러 정보를 상세히 로깅
 */
function errorLogger(err, req, res, next) {
  Logger.error('에러 발생', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('user-agent'),
    body: req.body,
    query: req.query,
    params: req.params,
  });

  next(err);
}

module.exports = {
  requestLogger,
  errorLogger,
};

