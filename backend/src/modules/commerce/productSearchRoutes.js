/**
 * Product Search 라우트
 * 상품 검색 관련 API 엔드포인트 정의
 */

const express = require('express');
const router = express.Router();
const ProductSearchController = require('./productSearchController');

/**
 * GET /api/products/search
 * 상품 검색 (필터링 지원)
 */
router.get('/search', ProductSearchController.search);

module.exports = router;

