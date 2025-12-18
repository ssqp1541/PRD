/**
 * 인증 서비스
 * 비즈니스 로직 처리 (비밀번호 해시, 사용자 생성, 로그인)
 */

const bcrypt = require('bcrypt');
const User = require('../../models/User');
const { generateToken } = require('../../utils/jwt');

const SALT_ROUNDS = 10;

class AuthService {
  /**
   * 비밀번호 해시 생성
   * @param {string} password - 평문 비밀번호
   * @returns {Promise<string>} 해시된 비밀번호
   */
  static async hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  /**
   * 비밀번호 검증
   * @param {string} password - 평문 비밀번호
   * @param {string} hash - 해시된 비밀번호
   * @returns {Promise<boolean>} 일치 여부
   */
  static async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  /**
   * 회원가입
   * @param {string} email - 이메일
   * @param {string} password - 평문 비밀번호
   * @param {string} name - 이름
   * @returns {Promise<Object>} 사용자 정보 및 토큰
   * @throws {Error} 이메일 중복 시
   */
  static async registerUser(email, password, name) {
    // 이메일 중복 확인
    const emailExists = await User.isEmailExists(email);
    if (emailExists) {
      throw new Error('EMAIL_ALREADY_EXISTS');
    }

    // 비밀번호 해시
    const passwordHash = await this.hashPassword(password);

    // 사용자 생성
    const user = await User.createUser(email, passwordHash, name, 'user');

    // JWT 토큰 생성
    const token = generateToken(user.id, user.email, user.role);

    // 비밀번호 해시는 응답에서 제외
    const { password_hash, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * 로그인
   * @param {string} email - 이메일
   * @param {string} password - 평문 비밀번호
   * @returns {Promise<Object>} 사용자 정보 및 토큰
   * @throws {Error} 이메일 또는 비밀번호가 올바르지 않을 때
   */
  static async loginUser(email, password) {
    // 사용자 조회
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    // 비밀번호 검증
    const isPasswordValid = await this.comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error('INVALID_CREDENTIALS');
    }

    // JWT 토큰 생성
    const token = generateToken(user.id, user.email, user.role);

    // 비밀번호 해시는 응답에서 제외
    const { password_hash, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }
}

module.exports = AuthService;

