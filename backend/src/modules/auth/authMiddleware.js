/**
 * 인증 미들웨어
 * JWT 토큰 검증 및 사용자 정보 추출
 */

const { verifyToken, extractTokenFromHeader } = require('../../utils/jwt');
const User = require('../../models/User');

/**
 * JWT 토큰 인증 미들웨어
 * 보호된 라우트에서 사용
 */
async function authenticateToken(req, res, next) {
  try {
    // 헤더에서 토큰 추출
    const token = extractTokenFromHeader(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: '인증 토큰이 제공되지 않았습니다.',
        error: 'NO_TOKEN_PROVIDED',
      });
    }

    // 토큰 검증
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: '유효하지 않거나 만료된 토큰입니다.',
        error: 'INVALID_TOKEN',
      });
    }

    // 사용자 정보 조회
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '사용자를 찾을 수 없습니다.',
        error: 'USER_NOT_FOUND',
      });
    }

    // 요청 객체에 사용자 정보 추가
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: '인증에 실패했습니다.',
      error: 'AUTHENTICATION_FAILED',
    });
  }
}

module.exports = {
  authenticateToken,
};

