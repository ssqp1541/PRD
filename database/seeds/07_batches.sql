-- Seed: 07_batches.sql
-- Description: Insert sample batch data (FR4 테스트용)
-- Created: 2025-12-15
-- Depends on: 03_products.sql, 02_partners.sql, 01_users.sql

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

