/**
 * 로깅 유틸리티
 * 파일 로깅 및 로그 레벨 관리
 */

const fs = require('fs');
const path = require('path');

// 로그 디렉토리 경로
const LOG_DIR = path.join(__dirname, '../../logs');

// 로그 디렉토리 생성 (없으면)
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// 로그 레벨
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

// 현재 로그 레벨 (환경 변수에서 설정 가능, 기본값: INFO)
const CURRENT_LOG_LEVEL = LOG_LEVELS[process.env.LOG_LEVEL?.toUpperCase()] ?? LOG_LEVELS.INFO;

/**
 * 오늘 날짜의 로그 파일명 생성
 * @param {string} type - 로그 타입 (error, combined)
 * @returns {string} 로그 파일 경로
 */
function getLogFileName(type = 'combined') {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return path.join(LOG_DIR, `${type}-${today}.log`);
}

/**
 * 로그 포맷팅
 * @param {string} level - 로그 레벨
 * @param {string} message - 로그 메시지
 * @param {Object} meta - 추가 메타데이터
 * @returns {string} 포맷팅된 로그 문자열
 */
function formatLog(level, message, meta = {}) {
  const timestamp = new Date().toISOString();
  const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level}] ${message}${metaStr}\n`;
}

/**
 * 로그 파일에 쓰기
 * @param {string} filePath - 로그 파일 경로
 * @param {string} content - 로그 내용
 */
function writeToFile(filePath, content) {
  try {
    fs.appendFileSync(filePath, content, 'utf8');
  } catch (error) {
    // 로그 파일 쓰기 실패 시 콘솔에 출력
    console.error('로그 파일 쓰기 실패:', error.message);
    console.log(content);
  }
}

/**
 * 로그 레벨 확인
 * @param {string} level - 확인할 로그 레벨
 * @returns {boolean} 로그를 출력할지 여부
 */
function shouldLog(level) {
  return LOG_LEVELS[level] <= CURRENT_LOG_LEVEL;
}

/**
 * 로거 클래스
 */
class Logger {
  /**
   * 에러 로그
   * @param {string} message - 로그 메시지
   * @param {Object} meta - 추가 메타데이터
   */
  static error(message, meta = {}) {
    if (!shouldLog('ERROR')) return;

    const logContent = formatLog('ERROR', message, meta);
    const errorLogFile = getLogFileName('error');
    const combinedLogFile = getLogFileName('combined');

    writeToFile(errorLogFile, logContent);
    writeToFile(combinedLogFile, logContent);
    console.error(`❌ [ERROR] ${message}`, meta);
  }

  /**
   * 경고 로그
   * @param {string} message - 로그 메시지
   * @param {Object} meta - 추가 메타데이터
   */
  static warn(message, meta = {}) {
    if (!shouldLog('WARN')) return;

    const logContent = formatLog('WARN', message, meta);
    const combinedLogFile = getLogFileName('combined');

    writeToFile(combinedLogFile, logContent);
    console.warn(`⚠️  [WARN] ${message}`, meta);
  }

  /**
   * 정보 로그
   * @param {string} message - 로그 메시지
   * @param {Object} meta - 추가 메타데이터
   */
  static info(message, meta = {}) {
    if (!shouldLog('INFO')) return;

    const logContent = formatLog('INFO', message, meta);
    const combinedLogFile = getLogFileName('combined');

    writeToFile(combinedLogFile, logContent);
    console.log(`✅ [INFO] ${message}`, meta);
  }

  /**
   * 디버그 로그
   * @param {string} message - 로그 메시지
   * @param {Object} meta - 추가 메타데이터
   */
  static debug(message, meta = {}) {
    if (!shouldLog('DEBUG')) return;

    const logContent = formatLog('DEBUG', message, meta);
    const combinedLogFile = getLogFileName('combined');

    writeToFile(combinedLogFile, logContent);
    console.debug(`🔍 [DEBUG] ${message}`, meta);
  }
}

module.exports = Logger;

