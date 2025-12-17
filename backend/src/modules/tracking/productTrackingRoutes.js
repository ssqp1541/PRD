/**
 * Product Tracking 라우트
 * 추적 정보 관련 API 엔드포인트 정의
 */

const express = require('express');
const router = express.Router();
const ProductTrackingController = require('./productTrackingController');
const { validateNumericId } = require('../../middleware/validator');

/**
 * GET /api/products/:id/tracking
 * 상품 추적 정보 조회
 */
router.get('/:id/tracking', validateNumericId('id'), ProductTrackingController.getTracking);

module.exports = router;

