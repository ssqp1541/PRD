/**
 * 입력 검증 미들웨어
 * 재사용 가능한 입력 검증 함수들
 */

/**
 * 이메일 형식 검증
 * @param {string} email - 검증할 이메일
 * @returns {boolean} 유효성 여부
 */
function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호 강도 검증
 * @param {string} password - 검증할 비밀번호
 * @param {number} minLength - 최소 길이 (기본값: 8)
 * @returns {Object} { valid: boolean, message: string }
 */
function validatePassword(password, minLength = 8) {
  if (!password || typeof password !== 'string') {
    return {
      valid: false,
      message: '비밀번호는 필수 입력 항목입니다.',
    };
  }

  if (password.length < minLength) {
    return {
      valid: false,
      message: `비밀번호는 최소 ${minLength}자 이상이어야 합니다.`,
    };
  }

  return {
    valid: true,
    message: '',
  };
}

/**
 * 필수 필드 검증
 * @param {Object} data - 검증할 데이터 객체
 * @param {Array<string>} requiredFields - 필수 필드 배열
 * @returns {Object} { valid: boolean, missingFields: Array<string> }
 */
function validateRequired(data, requiredFields) {
  const missingFields = [];

  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      missingFields.push(field);
    }
  });

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * 문자열 길이 검증
 * @param {string} value - 검증할 문자열
 * @param {number} min - 최소 길이
 * @param {number} max - 최대 길이
 * @returns {boolean} 유효성 여부
 */
function validateStringLength(value, min, max) {
  if (typeof value !== 'string') {
    return false;
  }

  const length = value.length;
  return length >= min && length <= max;
}

/**
 * 숫자 범위 검증
 * @param {number} value - 검증할 숫자
 * @param {number} min - 최소값
 * @param {number} max - 최대값
 * @returns {boolean} 유효성 여부
 */
function validateNumberRange(value, min, max) {
  const num = Number(value);
  if (isNaN(num)) {
    return false;
  }

  return num >= min && num <= max;
}

/**
 * 회원가입 입력 검증 미들웨어
 */
function validateRegisterInput(req, res, next) {
  const { email, password, name } = req.body;

  // 필수 필드 검증
  const requiredValidation = validateRequired(req.body, ['email', 'password', 'name']);
  if (!requiredValidation.valid) {
    return res.status(400).json({
      success: false,
      message: `${requiredValidation.missingFields.join(', ')}은(는) 필수 입력 항목입니다.`,
      error: 'MISSING_REQUIRED_FIELDS',
      missingFields: requiredValidation.missingFields,
    });
  }

  // 이메일 형식 검증
  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: '올바른 이메일 형식이 아닙니다.',
      error: 'INVALID_EMAIL_FORMAT',
    });
  }

  // 비밀번호 강도 검증
  const passwordValidation = validatePassword(password, 8);
  if (!passwordValidation.valid) {
    return res.status(400).json({
      success: false,
      message: passwordValidation.message,
      error: 'PASSWORD_TOO_SHORT',
    });
  }

  // 이름 길이 검증
  if (!validateStringLength(name, 1, 100)) {
    return res.status(400).json({
      success: false,
      message: '이름은 1자 이상 100자 이하여야 합니다.',
      error: 'INVALID_NAME_LENGTH',
    });
  }

  next();
}

/**
 * 로그인 입력 검증 미들웨어
 */
function validateLoginInput(req, res, next) {
  const { email, password } = req.body;

  // 필수 필드 검증
  const requiredValidation = validateRequired(req.body, ['email', 'password']);
  if (!requiredValidation.valid) {
    return res.status(400).json({
      success: false,
      message: `${requiredValidation.missingFields.join(', ')}은(는) 필수 입력 항목입니다.`,
      error: 'MISSING_REQUIRED_FIELDS',
      missingFields: requiredValidation.missingFields,
    });
  }

  // 이메일 형식 검증
  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: '올바른 이메일 형식이 아닙니다.',
      error: 'INVALID_EMAIL_FORMAT',
    });
  }

  next();
}

/**
 * 숫자 ID 검증 미들웨어
 * @param {string} paramName - 파라미터 이름 (예: 'id', 'userId')
 */
function validateNumericId(paramName = 'id') {
  return (req, res, next) => {
    const id = req.params[paramName];
    const numId = parseInt(id, 10);

    if (isNaN(numId) || numId <= 0) {
      return res.status(400).json({
        success: false,
        message: `유효하지 않은 ${paramName}입니다.`,
        error: `INVALID_${paramName.toUpperCase()}`,
      });
    }

    // 검증된 ID를 파라미터에 다시 설정
    req.params[paramName] = numId;
    next();
  };
}

module.exports = {
  validateEmail,
  validatePassword,
  validateRequired,
  validateStringLength,
  validateNumberRange,
  validateRegisterInput,
  validateLoginInput,
  validateNumericId,
};

