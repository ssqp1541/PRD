/**
 * Product 라우트
 * 상품 관련 API 엔드포인트 정의 (추적 정보 + 검색)
 */

const express = require('express');
const router = express.Router();
const ProductTrackingController = require('./productTrackingController');
const productSearchRoutes = require('../commerce/productSearchRoutes');
const { validateNumericId } = require('../../middleware/validator');

/**
 * 상품 검색 라우트
 * /api/products/search
 */
router.use('/', productSearchRoutes);

/**
 * GET /api/products/:id/tracking
 * 상품 추적 정보 조회
 */
router.get('/:id/tracking', validateNumericId('id'), ProductTrackingController.getTracking);

module.exports = router;

