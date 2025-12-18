/**
 * 데이터베이스 인덱스 추가 마이그레이션
 * 성능 최적화를 위한 인덱스 생성
 * 
 * 실행 순서: 008
 * 의존성: 모든 테이블 생성 완료 후 실행
 */

-- products 테이블 인덱스
-- 필터링 성능 향상
CREATE INDEX IF NOT EXISTS idx_products_female_producer ON products(is_female_producer);
CREATE INDEX IF NOT EXISTS idx_products_eco_packaging ON products(is_eco_packaging);
CREATE INDEX IF NOT EXISTS idx_products_eco_friendly ON products(is_eco_friendly);

-- JOIN 성능 향상
CREATE INDEX IF NOT EXISTS idx_products_partner_id ON products(partner_id);

-- purchases 테이블 인덱스
-- 사용자별 조회 성능 향상
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);

-- 날짜 범위 조회 성능 향상
CREATE INDEX IF NOT EXISTS idx_purchases_purchase_date ON purchases(purchase_date);

-- 복합 인덱스 (사용자별 날짜 범위 조회)
CREATE INDEX IF NOT EXISTS idx_purchases_user_date ON purchases(user_id, purchase_date);

-- 상품별 조회 성능 향상
CREATE INDEX IF NOT EXISTS idx_purchases_product_id ON purchases(product_id);

-- orders 테이블 인덱스
-- 사용자별 조회 성능 향상
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- 날짜 범위 조회 성능 향상
CREATE INDEX IF NOT EXISTS idx_orders_order_date ON orders(order_date);

-- 복합 인덱스 (사용자별 날짜 범위 조회)
CREATE INDEX IF NOT EXISTS idx_orders_user_date ON orders(user_id, order_date);

-- users 테이블 인덱스
-- 이메일 조회 성능 향상 (로그인 시 사용)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- tracking 테이블 인덱스
-- 상품별 추적 정보 조회 성능 향상
CREATE INDEX IF NOT EXISTS idx_tracking_product_id ON tracking(product_id);

-- batches 테이블 인덱스
-- 파트너별 배치 조회 성능 향상
CREATE INDEX IF NOT EXISTS idx_batches_partner_id ON batches(partner_id);

-- 승인 상태별 조회 성능 향상
CREATE INDEX IF NOT EXISTS idx_batches_approval_status ON batches(approval_status);

-- 인덱스 생성 완료 메시지
DO $$
BEGIN
    RAISE NOTICE '인덱스 생성이 완료되었습니다.';
END $$;

