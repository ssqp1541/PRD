-- Seed: 02_partners.sql
-- Description: Insert sample partner data
-- Created: 2025-12-15
-- Depends on: 01_users.sql

-- 파트너 정보 (파트너 계정과 연결)
INSERT INTO partners (user_id, company_name, business_number, platform_fee_rate)
SELECT 
    u.id,
    'Honest Roastery',
    '123-45-67890',
    0.1000
FROM users u
WHERE u.email = 'partner@example.com' AND u.role = 'partner'
ON CONFLICT (user_id) DO NOTHING;

