/**
 * 인증 라우트
 * 인증 관련 API 엔드포인트 정의
 */

const express = require('express');
const router = express.Router();
const AuthController = require('./authController');
const { validateRegisterInput, validateLoginInput } = require('../../middleware/validator');

/**
 * POST /api/auth/register
 * 회원가입
 */
router.post('/register', validateRegisterInput, AuthController.register);

/**
 * POST /api/auth/login
 * 로그인
 */
router.post('/login', validateLoginInput, AuthController.login);

module.exports = router;

