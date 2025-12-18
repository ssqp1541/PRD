/**
 * 인증 컨트롤러
 * HTTP 요청/응답 처리
 */

const AuthService = require('./authService');

class AuthController {
  /**
   * 회원가입
   * POST /api/auth/register
   */
  static async register(req, res, next) {
    try {
      const { email, password, name } = req.body;

      // 입력 검증
      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          message: '이메일, 비밀번호, 이름은 필수 입력 항목입니다.',
          error: 'MISSING_REQUIRED_FIELDS',
        });
      }

      // 이메일 형식 검증 (간단한 검증)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: '올바른 이메일 형식이 아닙니다.',
          error: 'INVALID_EMAIL_FORMAT',
        });
      }

      // 비밀번호 최소 길이 검증
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: '비밀번호는 최소 8자 이상이어야 합니다.',
          error: 'PASSWORD_TOO_SHORT',
        });
      }

      // 회원가입 처리
      const result = await AuthService.registerUser(email, password, name);

      return res.status(201).json({
        success: true,
        message: '회원가입이 완료되었습니다.',
        data: result,
      });
    } catch (error) {
      if (error.message === 'EMAIL_ALREADY_EXISTS') {
        return res.status(400).json({
          success: false,
          message: '이미 등록된 이메일입니다.',
          error: 'EMAIL_ALREADY_EXISTS',
        });
      }

      // 기타 에러는 next로 전달
      next(error);
    }
  }

  /**
   * 로그인
   * POST /api/auth/login
   */
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // 입력 검증
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: '이메일과 비밀번호는 필수 입력 항목입니다.',
          error: 'MISSING_REQUIRED_FIELDS',
        });
      }

      // 로그인 처리
      const result = await AuthService.loginUser(email, password);

      return res.status(200).json({
        success: true,
        message: '로그인 성공',
        data: result,
      });
    } catch (error) {
      if (error.message === 'INVALID_CREDENTIALS') {
        return res.status(401).json({
          success: false,
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          error: 'INVALID_CREDENTIALS',
        });
      }

      // 기타 에러는 next로 전달
      next(error);
    }
  }
}

module.exports = AuthController;

