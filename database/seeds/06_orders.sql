-- Seed: 06_orders.sql
-- Description: Insert sample order data
-- Created: 2025-12-15
-- Depends on: 01_users.sql

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

