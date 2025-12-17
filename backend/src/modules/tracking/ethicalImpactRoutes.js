/**
 * Ethical Impact 라우트
 * 윤리 영향 리포트 관련 API 엔드포인트 정의
 */

const express = require('express');
const router = express.Router();
const EthicalImpactController = require('./ethicalImpactController');

/**
 * GET /api/users/:userId/ethical-impact
 * 사용자 윤리 영향 리포트 조회
 */
router.get('/:userId/ethical-impact', EthicalImpactController.getEthicalImpact);

module.exports = router;

