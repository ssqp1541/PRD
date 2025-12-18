/**
 * 보안 유틸리티 함수
 * XSS 방어 및 입력 정리 함수
 */

/**
 * HTML 이스케이프
 * XSS 공격 방어를 위한 HTML 특수 문자 이스케이프
 * @param {string} text - 이스케이프할 텍스트
 * @returns {string} 이스케이프된 텍스트
 */
function escapeHtml(text) {
  if (typeof text !== 'string') {
    return text;
  }

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * 입력 정리 (Sanitization)
 * HTML 태그 제거 및 특수 문자 정리
 * @param {string} input - 정리할 입력값
 * @returns {string} 정리된 입력값
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return input;
  }

  // HTML 태그 제거
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // 연속된 공백을 하나로 정리
  sanitized = sanitized.replace(/\s+/g, ' ').trim();
  
  return sanitized;
}

/**
 * SQL 키워드 필터링
 * 기본적인 SQL Injection 방어 (추가 보안)
 * @param {string} input - 필터링할 입력값
 * @returns {string} 필터링된 입력값
 */
function filterSqlKeywords(input) {
  if (typeof input !== 'string') {
    return input;
  }

  // 위험한 SQL 키워드 제거 (기본적인 방어)
  const dangerousKeywords = [
    'DROP', 'DELETE', 'INSERT', 'UPDATE', 'ALTER', 'CREATE',
    'EXEC', 'EXECUTE', 'UNION', 'SELECT', 'SCRIPT',
  ];

  let filtered = input;
  dangerousKeywords.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    filtered = filtered.replace(regex, '');
  });

  return filtered;
}

/**
 * 객체의 모든 문자열 필드 정리
 * @param {Object} obj - 정리할 객체
 * @returns {Object} 정리된 객체
 */
function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

module.exports = {
  escapeHtml,
  sanitizeInput,
  filterSqlKeywords,
  sanitizeObject,
};

