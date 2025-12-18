-- Seed: 03_products.sql
-- Description: Insert sample product data
-- Created: 2025-12-15
-- Depends on: 02_partners.sql

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

