/**
 * Partner 라우트
 * 파트너 관련 API 엔드포인트 정의
 */

const express = require('express');
const router = express.Router();
const SettlementController = require('./settlementController');
// const { authenticatePartner } = require('../../middleware/auth'); // 향후 구현

/**
 * GET /api/partner/settlement
 * 정산 데이터 조회
 * 
 * 쿼리 파라미터:
 * - startDate: 시작일 (YYYY-MM-DD)
 * - endDate: 종료일 (YYYY-MM-DD)
 */
router.get('/settlement', SettlementController.getSettlement);

module.exports = router;

