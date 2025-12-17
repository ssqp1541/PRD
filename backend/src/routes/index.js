/**
 * 라우트 통합 파일
 * 모든 모듈 라우트를 통합하여 관리
 */

const express = require('express');
const router = express.Router();

// 모듈별 라우트 import
const authRoutes = require('../modules/auth/authRoutes');
const productTrackingRoutes = require('../modules/tracking/productTrackingRoutes');
const ethicalImpactRoutes = require('../modules/tracking/ethicalImpactRoutes');
const partnerRoutes = require('../modules/partner/partnerRoutes');

// API 버전 관리
// 향후 API 버전이 변경될 때를 대비하여 /api/v1 구조 사용

/**
 * 인증 관련 라우트
 * /api/auth/*
 */
router.use('/auth', authRoutes);

/**
 * 상품 추적 관련 라우트
 * /api/products/*
 */
router.use('/products', productTrackingRoutes);

/**
 * 사용자 윤리 영향 관련 라우트
 * /api/users/*
 */
router.use('/users', ethicalImpactRoutes);

/**
 * 파트너 관련 라우트
 * /api/partner/*
 */
router.use('/partner', partnerRoutes);

// 향후 추가될 라우트들
// router.use('/orders', orderRoutes);
// router.use('/admin', adminRoutes);

module.exports = router;

