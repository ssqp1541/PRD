-- Products 테이블 스키마
-- 목적: 원두 상품 정보 저장 (FR1, FR3)

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    image_url VARCHAR(500),
    partner_id INTEGER NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
    is_eco_friendly BOOLEAN NOT NULL DEFAULT false, -- FR2, FR3 필터링
    is_female_producer BOOLEAN NOT NULL DEFAULT false, -- FR3 필터링
    is_eco_packaging BOOLEAN NOT NULL DEFAULT false, -- FR3 필터링
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_products_partner_id ON products(partner_id);
CREATE INDEX IF NOT EXISTS idx_products_eco_friendly ON products(is_eco_friendly);
CREATE INDEX IF NOT EXISTS idx_products_female_producer ON products(is_female_producer);
CREATE INDEX IF NOT EXISTS idx_products_eco_packaging ON products(is_eco_packaging);

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

