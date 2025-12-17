-- Seed: 04_tracking.sql
-- Description: Insert sample tracking data (FR1 테스트용)
-- Created: 2025-12-15
-- Depends on: 03_products.sql

-- 에티오피아 예가체프 추적 정보
INSERT INTO tracking (product_id, producer_revenue_ratio, farm_latitude, farm_longitude, farm_address, origin_country, origin_region)
SELECT 
    p.id,
    45.50, -- 생산자 수익 비율 45.5%
    8.9806, -- 에티오피아 예가체프 지역 위도
    38.7578, -- 에티오피아 예가체프 지역 경도
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
    50.00, -- 생산자 수익 비율 50%
    4.7110, -- 콜롬비아 위도
    -74.0721, -- 콜롬비아 경도
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
    35.00, -- 생산자 수익 비율 35%
    -23.5505, -- 브라질 산토스 지역 위도
    -46.6333, -- 브라질 산토스 지역 경도
    '산토스, 상파울루 주, 브라질',
    '브라질',
    '산토스'
FROM products p
WHERE p.name = '브라질 산토스 원두'
LIMIT 1
ON CONFLICT (product_id) DO NOTHING;

