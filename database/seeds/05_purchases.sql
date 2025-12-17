-- Seed: 05_purchases.sql
-- Description: Insert sample purchase data (FR2 테스트용 - 3개월간 구매 기록)
-- Created: 2025-12-15
-- Depends on: 01_users.sql, 03_products.sql

-- 3개월 전 구매 기록 (친환경 원두)
INSERT INTO purchases (user_id, product_id, quantity, purchase_date)
SELECT 
    u.id,
    p.id,
    0.5, -- 0.5kg
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
    1.0, -- 1.0kg
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
    0.75, -- 0.75kg
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
    0.5, -- 0.5kg
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
    1.0, -- 1.0kg
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
    0.5, -- 0.5kg
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
    0.5, -- 0.5kg
    CURRENT_TIMESTAMP - INTERVAL '3 months' + INTERVAL '1 day'
FROM users u, products p
WHERE u.email = 'user@example.com' AND p.name = '브라질 산토스 원두'
LIMIT 1
ON CONFLICT DO NOTHING;

