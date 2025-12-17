/**
 * 라우트 통합 파일
 * 모든 모듈 라우트를 통합하여 관리
 */

const express = require('express');
const router = express.Router();

// 모듈별 라우트 import
const authRoutes = require('../modules/auth/authRoutes');

// API 버전 관리
// 향후 API 버전이 변경될 때를 대비하여 /api/v1 구조 사용

/**
 * 인증 관련 라우트
 * /api/auth/*
 */
router.use('/auth', authRoutes);

// 향후 추가될 라우트들
// router.use('/products', productRoutes);
// router.use('/orders', orderRoutes);
// router.use('/users', userRoutes);
// router.use('/partners', partnerRoutes);
// router.use('/admin', adminRoutes);

module.exports = router;

