/**
 * 입력 Sanitization 미들웨어
 * XSS 방어를 위한 입력 정리
 */

const { sanitizeObject, sanitizeInput } = require('../utils/security');

/**
 * 요청 본문(Body) sanitization 미들웨어
 * req.body의 모든 문자열 필드를 정리
 */
function sanitizeBody(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  next();
}

/**
 * 요청 쿼리(Query) sanitization 미들웨어
 * req.query의 모든 문자열 필드를 정리
 */
function sanitizeQuery(req, res, next) {
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }
  next();
}

/**
 * 요청 파라미터(Params) sanitization 미들웨어
 * req.params의 모든 문자열 필드를 정리
 */
function sanitizeParams(req, res, next) {
  if (req.params && typeof req.params === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(req.params)) {
      if (typeof value === 'string') {
        sanitized[key] = sanitizeInput(value);
      } else {
        sanitized[key] = value;
      }
    }
    req.params = sanitized;
  }
  next();
}

/**
 * 모든 요청 데이터 sanitization 미들웨어
 * body, query, params 모두 정리
 */
function sanitizeAll(req, res, next) {
  sanitizeBody(req, res, () => {
    sanitizeQuery(req, res, () => {
      sanitizeParams(req, res, next);
    });
  });
}

module.exports = {
  sanitizeBody,
  sanitizeQuery,
  sanitizeParams,
  sanitizeAll,
};

