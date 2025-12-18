-- Seed: 01_users.sql
-- Description: Insert sample user data
-- Created: 2025-12-15

-- 일반 사용자 (FR2 테스트용)
-- 비밀번호: "password123" (bcrypt 해시)
INSERT INTO users (email, password_hash, name, role) VALUES
('user@example.com', '$2b$10$rOzJqJqJqJqJqJqJqJqJqOeJqJqJqJqJqJqJqJqJqJqJqJqJqJq', '테스트 사용자', 'user')
ON CONFLICT (email) DO NOTHING;

-- 파트너 계정
-- 비밀번호: "password123" (bcrypt 해시)
INSERT INTO users (email, password_hash, name, role) VALUES
('partner@example.com', '$2b$10$rOzJqJqJqJqJqJqJqJqJqOeJqJqJqJqJqJqJqJqJqJqJqJqJqJq', '테스트 파트너', 'partner')
ON CONFLICT (email) DO NOTHING;

-- 관리자 계정
-- 비밀번호: "password123" (bcrypt 해시)
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@example.com', '$2b$10$rOzJqJqJqJqJqJqJqJqJqOeJqJqJqJqJqJqJqJqJqJqJqJqJqJq', '테스트 관리자', 'admin')
ON CONFLICT (email) DO NOTHING;

