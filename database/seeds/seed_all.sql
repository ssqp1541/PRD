-- Seed: seed_all.sql
-- Description: Execute all seed data files in order
-- Created: 2025-12-15
-- Usage: Execute this file to insert all sample data

-- ============================================
-- 1. Users
-- ============================================
-- 일반 사용자 (FR2 테스트용)
-- 비밀번호: "password123" (bcrypt 해시)
INSERT INTO users (email, password_hash, name, role) VALUES
('user@example.com', '$2b$10$rOzJqJqJqJqJqJqJqJqJqOeJqJqJqJqJqJqJqJqJqJqJqJqJqJq', '테스트 사용자', 'user')
ON CONFLICT (email) DO NOTHING;

-- 파트너 계정
INSERT INTO users (email, password_hash, name, role) VALUES
('partner@example.com', '$2b$10$rOzJqJqJqJqJqJqJqJqJqOeJqJqJqJqJqJqJqJqJqJqJqJqJqJq', '테스트 파트너', 'partner')
ON CONFLICT (email) DO NOTHING;

-- 관리자 계정
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@example.com', '$2b$10$rOzJqJqJqJqJqJqJqJqJqOeJqJqJqJqJqJqJqJqJqJqJqJqJqJq', '테스트 관리자', 'admin')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- 2. Partners
-- ============================================
INSERT INTO partners (user_id, company_name, business_number, platform_fee_rate)
SELECT 
    u.id,
    'Honest Roastery',
    '123-45-67890',
    0.1000
FROM users u
WHERE u.email = 'partner@example.com' AND u.role = 'partner'
ON CONFLICT (user_id) DO NOTHING;

-- ============================================
-- 3. Products
-- ============================================
-- 친환경 원두 (FR2 테스트용)
INSERT INTO products (name, description, price, image_url, partner_id, is_eco_friendly, is_female_producer, is_eco_packaging)
SELECT 
    '에티오피아 예가체프 친환경 원두',
    '유기농 인증을 받은 친환경 원두입니다. 지속 가능한 농업 방식으로 재배되었습니다.',
    25000.00,
    'https://example.com/images/ethiopia-eco.jpg',
    p.id,
    true,
    false,
    true
FROM partners p
LIMIT 1
ON CONFLICT DO NOTHING;

-- 여성 생산자 원두 (FR3 테스트용)
INSERT INTO products (name, description, price, image_url, partner_id, is_eco_friendly, is_female_producer, is_eco_packaging)
SELECT 
    '콜롬비아 수프리모 여성 생산자 원두',
    '여성 생산자가 직접 재배한 프리미엄 원두입니다.',
    30000.00,
    'https://example.com/images/colombia-female.jpg',
    p.id,
    false,
    true,
    false
FROM partners p
LIMIT 1
ON CONFLICT DO NOTHING;

-- 일반 원두
INSERT INTO products (name, description, price, image_url, partner_id, is_eco_friendly, is_female_producer, is_eco_packaging)
SELECT 
    '브라질 산토스 원두',
    '클래식한 맛의 브라질 원두입니다.',
    20000.00,
    'https://example.com/images/brazil-santos.jpg',
    p.id,
    false,
    false,
    false
FROM partners p
LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- 4. Tracking
-- ============================================
-- 에티오피아 예가체프 추적 정보
INSERT INTO tracking (product_id, producer_revenue_ratio, farm_latitude, farm_longitude, farm_address, origin_country, origin_region)
SELECT 
    p.id,
    45.50,
    8.9806,
    38.7578,
    '예가체프, 시다마 주, 에티오피아',
    '에티오피아',
    '예가체프'
FROM products p
WHERE p.name = '에티오피아 예가체프 친환경 원두'
LIMIT 1
ON CONFLICT (product_id) DO NOTHING;

-- 콜롬비아 수프리모 추적 정보
INSERT INTO tracking (product_id, producer_revenue_ratio, farm_latitude, farm_longitude, farm_address, origin_country, origin_region)
SELECT 
    p.id,
    50.00,
    4.7110,
    -74.0721,
    '수프리모 지역, 콜롬비아',
    '콜롬비아',
    '수프리모'
FROM products p
WHERE p.name = '콜롬비아 수프리모 여성 생산자 원두'
LIMIT 1
ON CONFLICT (product_id) DO NOTHING;

-- 브라질 산토스 추적 정보
INSERT INTO tracking (product_id, producer_revenue_ratio, farm_latitude, farm_longitude, farm_address, origin_country, origin_region)
SELECT 
    p.id,
    35.00,
    -23.5505,
    -46.6333,
    '산토스, 상파울루 주, 브라질',
    '브라질',
    '산토스'
FROM products p
WHERE p.name = '브라질 산토스 원두'
LIMIT 1
ON CONFLICT (product_id) DO NOTHING;

-- ============================================
-- 5. Purchases (FR2 테스트용 - 3개월간 구매 기록)
-- ============================================
-- 3개월 전 구매 기록 (친환경 원두)
INSERT INTO purchases (user_id, product_id, quantity, purchase_date)
SELECT 
    u.id,
    p.id,
    0.5,
    CURRENT_TIMESTAMP - INTERVAL '3 months' + INTERVAL '5 days'
FROM users u, products p
WHERE u.email = 'user@example.com' AND p.name = '에티오피아 예가체프 친환경 원두'
LIMIT 1
ON CONFLICT DO NOTHING;

-- 2개월 전 구매 기록 (친환경 원두)
INSERT INTO purchases (user_id, product_id, quantity, purchase_date)
SELECT 
    u.id,
    p.id,
    1.0,
    CURRENT_TIMESTAMP - INTERVAL '2 months' + INTERVAL '10 days'
FROM users u, products p
WHERE u.email = 'user@example.com' AND p.name = '에티오피아 예가체프 친환경 원두'
LIMIT 1
ON CONFLICT DO NOTHING;

-- 1개월 전 구매 기록 (친환경 원두)
INSERT INTO purchases (user_id, product_id, quantity, purchase_date)
SELECT 
    u.id,
    p.id,
    0.75,
    CURRENT_TIMESTAMP - INTERVAL '1 month' + INTERVAL '15 days'
FROM users u, products p
WHERE u.email = 'user@example.com' AND p.name = '에티오피아 예가체프 친환경 원두'
LIMIT 1
ON CONFLICT DO NOTHING;

-- 3주 전 구매 기록 (친환경 원두)
INSERT INTO purchases (user_id, product_id, quantity, purchase_date)
SELECT 
    u.id,
    p.id,
    0.5,
    CURRENT_TIMESTAMP - INTERVAL '3 weeks'
FROM users u, products p
WHERE u.email = 'user@example.com' AND p.name = '에티오피아 예가체프 친환경 원두'
LIMIT 1
ON CONFLICT DO NOTHING;

-- 2주 전 구매 기록 (친환경 원두)
INSERT INTO purchases (user_id, product_id, quantity, purchase_date)
SELECT 
    u.id,
    p.id,
    1.0,
    CURRENT_TIMESTAMP - INTERVAL '2 weeks'
FROM users u, products p
WHERE u.email = 'user@example.com' AND p.name = '에티오피아 예가체프 친환경 원두'
LIMIT 1
ON CONFLICT DO NOTHING;

-- 1주 전 구매 기록 (친환경 원두)
INSERT INTO purchases (user_id, product_id, quantity, purchase_date)
SELECT 
    u.id,
    p.id,
    0.5,
    CURRENT_TIMESTAMP - INTERVAL '1 week'
FROM users u, products p
WHERE u.email = 'user@example.com' AND p.name = '에티오피아 예가체프 친환경 원두'
LIMIT 1
ON CONFLICT DO NOTHING;

-- 3개월 전 구매 기록 (일반 원두 - 비교용)
INSERT INTO purchases (user_id, product_id, quantity, purchase_date)
SELECT 
    u.id,
    p.id,
    0.5,
    CURRENT_TIMESTAMP - INTERVAL '3 months' + INTERVAL '1 day'
FROM users u, products p
WHERE u.email = 'user@example.com' AND p.name = '브라질 산토스 원두'
LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- 6. Orders
-- ============================================
-- 완료된 주문
INSERT INTO orders (user_id, total_amount, status, created_at)
SELECT 
    u.id,
    50000.00,
    'completed',
    CURRENT_TIMESTAMP - INTERVAL '1 month'
FROM users u
WHERE u.email = 'user@example.com'
LIMIT 1
ON CONFLICT DO NOTHING;

-- 대기 중인 주문
INSERT INTO orders (user_id, total_amount, status, created_at)
SELECT 
    u.id,
    30000.00,
    'pending',
    CURRENT_TIMESTAMP - INTERVAL '1 day'
FROM users u
WHERE u.email = 'user@example.com'
LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- 7. Batches (FR4 테스트용)
-- ============================================
-- 승인 대기 중인 배치
INSERT INTO batches (product_id, partner_id, batch_number, producer_revenue_ratio, farm_location_data, origin_data, status)
SELECT 
    p.id,
    pt.id,
    'BATCH-2025-001',
    45.50,
    '{"latitude": 8.9806, "longitude": 38.7578, "address": "예가체프, 시다마 주, 에티오피아"}'::jsonb,
    '{"country": "에티오피아", "region": "예가체프"}'::jsonb,
    'pending'
FROM products p, partners pt
WHERE p.name = '에티오피아 예가체프 친환경 원두'
LIMIT 1
ON CONFLICT (batch_number) DO NOTHING;

-- 승인 완료된 배치
INSERT INTO batches (product_id, partner_id, batch_number, producer_revenue_ratio, farm_location_data, origin_data, status, approved_by)
SELECT 
    p.id,
    pt.id,
    'BATCH-2025-002',
    50.00,
    '{"latitude": 4.7110, "longitude": -74.0721, "address": "수프리모 지역, 콜롬비아"}'::jsonb,
    '{"country": "콜롬비아", "region": "수프리모"}'::jsonb,
    'approved',
    u.id
FROM products p, partners pt, users u
WHERE p.name = '콜롬비아 수프리모 여성 생산자 원두' AND u.email = 'admin@example.com'
LIMIT 1
ON CONFLICT (batch_number) DO NOTHING;

-- 블록체인에 기록된 배치
INSERT INTO batches (product_id, partner_id, batch_number, producer_revenue_ratio, farm_location_data, origin_data, status, approved_by, blockchain_hash)
SELECT 
    p.id,
    pt.id,
    'BATCH-2025-003',
    35.00,
    '{"latitude": -23.5505, "longitude": -46.6333, "address": "산토스, 상파울루 주, 브라질"}'::jsonb,
    '{"country": "브라질", "region": "산토스"}'::jsonb,
    'blockchain_recorded',
    u.id,
    '0x1234567890abcdef1234567890abcdef12345678'
FROM products p, partners pt, users u
WHERE p.name = '브라질 산토스 원두' AND u.email = 'admin@example.com'
LIMIT 1
ON CONFLICT (batch_number) DO NOTHING;

