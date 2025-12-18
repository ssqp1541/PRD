# 데이터베이스 스키마 설계 시나리오

> 최소 단위 구현을 위한 데이터베이스 스키마 설계 계획

**작성일**: 2025-12-15  
**목표**: MVP에 필요한 최소한의 스키마 설계  
**데이터베이스**: PostgreSQL

---

## 📋 목차

1. [시나리오 개요](#시나리오-개요)
2. [테이블 설계](#테이블-설계)
3. [테이블 관계도](#테이블-관계도)
4. [마이그레이션 계획](#마이그레이션-계획)
5. [시드 데이터 계획](#시드-데이터-계획)
6. [승인 요청](#승인-요청)

---

## 시나리오 개요

### 목표

FR1, FR2 테스트를 통과하기 위한 최소한의 데이터베이스 스키마를 설계합니다.

### 설계 원칙

1. **최소 필수 필드만 포함**: MVP에 필요한 최소한의 컬럼만 정의
2. **확장 가능한 구조**: 향후 필드 추가가 용이하도록 설계
3. **테스트 지원**: 작성된 테스트 케이스를 통과할 수 있는 데이터 구조
4. **정규화**: 기본적인 정규화 적용 (1NF, 2NF)

### 구현 범위

- ✅ 7개 테이블 스키마 정의
- ✅ 마이그레이션 파일 작성
- ✅ 최소 시드 데이터 생성 (테스트용)
- ⚪ 인덱스 최적화 (후속 작업)
- ⚪ 트리거 및 함수 (후속 작업)

---

## 테이블 설계

### 1. users 테이블

**목적**: 사용자 정보 저장 (인증, FR2 윤리 영향 리포트)

**최소 필수 필드**:
```sql
- id (PRIMARY KEY, SERIAL)
- email (UNIQUE, NOT NULL)
- password_hash (NOT NULL) -- bcrypt 해시
- name (VARCHAR)
- role (ENUM: 'user', 'partner', 'admin')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**확장 가능 필드** (향후 추가):
- phone, address, profile_image 등

---

### 2. products 테이블

**목적**: 원두 상품 정보 저장 (FR1, FR3)

**최소 필수 필드**:
```sql
- id (PRIMARY KEY, SERIAL)
- name (VARCHAR, NOT NULL)
- description (TEXT)
- price (DECIMAL, NOT NULL)
- image_url (VARCHAR)
- partner_id (FOREIGN KEY -> partners.id)
- is_eco_friendly (BOOLEAN, DEFAULT false) -- FR2, FR3 필터링
- is_female_producer (BOOLEAN, DEFAULT false) -- FR3 필터링
- is_eco_packaging (BOOLEAN, DEFAULT false) -- FR3 필터링
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**확장 가능 필드**:
- stock_quantity, category, roast_level 등

---

### 3. tracking 테이블

**목적**: 원두 추적 정보 저장 (FR1)

**최소 필수 필드**:
```sql
- id (PRIMARY KEY, SERIAL)
- product_id (FOREIGN KEY -> products.id, UNIQUE)
- producer_revenue_ratio (DECIMAL, NOT NULL) -- 생산자 수익 비율 (0-100)
- farm_latitude (DECIMAL, NOT NULL) -- 농장 위도
- farm_longitude (DECIMAL, NOT NULL) -- 농장 경도
- farm_address (VARCHAR) -- 농장 주소
- origin_country (VARCHAR, NOT NULL) -- 원산지 국가
- origin_region (VARCHAR) -- 원산지 지역
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**제약 조건**:
- producer_revenue_ratio: 0 <= 값 <= 100
- farm_latitude: -90 <= 값 <= 90
- farm_longitude: -180 <= 값 <= 180

---

### 4. purchases 테이블

**목적**: 사용자 구매 기록 저장 (FR2 윤리 영향 리포트)

**최소 필수 필드**:
```sql
- id (PRIMARY KEY, SERIAL)
- user_id (FOREIGN KEY -> users.id, NOT NULL)
- product_id (FOREIGN KEY -> products.id, NOT NULL)
- quantity (DECIMAL, NOT NULL) -- 구매 수량 (kg)
- purchase_date (TIMESTAMP, NOT NULL) -- 구매 일시
- created_at (TIMESTAMP)
```

**확장 가능 필드**:
- order_id (주문과 연결), payment_method 등

---

### 5. orders 테이블

**목적**: 주문 정보 저장 (FR3, FR5)

**최소 필수 필드**:
```sql
- id (PRIMARY KEY, SERIAL)
- user_id (FOREIGN KEY -> users.id, NOT NULL)
- total_amount (DECIMAL, NOT NULL) -- 총 주문 금액
- status (ENUM: 'pending', 'completed', 'cancelled')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**확장 가능 필드**:
- shipping_address, payment_status, order_items (별도 테이블) 등

---

### 6. partners 테이블

**목적**: 파트너(로스터리) 정보 저장 (FR4, FR5)

**최소 필수 필드**:
```sql
- id (PRIMARY KEY, SERIAL)
- user_id (FOREIGN KEY -> users.id, UNIQUE) -- 파트너 계정
- company_name (VARCHAR, NOT NULL)
- business_number (VARCHAR, UNIQUE) -- 사업자 등록번호
- platform_fee_rate (DECIMAL, DEFAULT 0.1) -- 플랫폼 수수료율 (10%)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**확장 가능 필드**:
- contact_info, address, bank_account 등

---

### 7. batches 테이블

**목적**: 원두 배치 정보 저장 (FR4 데이터 검증)

**최소 필수 필드**:
```sql
- id (PRIMARY KEY, SERIAL)
- product_id (FOREIGN KEY -> products.id, NOT NULL)
- partner_id (FOREIGN KEY -> partners.id, NOT NULL)
- batch_number (VARCHAR, UNIQUE, NOT NULL) -- 배치 번호
- producer_revenue_ratio (DECIMAL) -- 생산자 수익 비율
- farm_location_data (JSONB) -- 농장 위치 정보
- origin_data (JSONB) -- 원산지 정보
- status (ENUM: 'pending', 'approved', 'rejected', 'blockchain_recorded')
- approved_by (FOREIGN KEY -> users.id) -- 승인한 관리자
- blockchain_hash (VARCHAR) -- 블록체인 해시 (FR4)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**확장 가능 필드**:
- harvest_date, processing_method 등

---

## 테이블 관계도

```
users (1) ──< (N) purchases
users (1) ──< (N) orders
users (1) ──< (1) partners
users (1) ──< (N) batches (approved_by)

products (1) ──< (1) tracking
products (1) ──< (N) purchases
products (1) ──< (N) batches

partners (1) ──< (N) products
partners (1) ──< (N) batches
```

### 관계 설명

- **users ↔ purchases**: 1:N (한 사용자가 여러 구매 기록)
- **users ↔ orders**: 1:N (한 사용자가 여러 주문)
- **users ↔ partners**: 1:1 (파트너는 사용자 계정 필요)
- **products ↔ tracking**: 1:1 (각 상품당 하나의 추적 정보)
- **products ↔ purchases**: 1:N (한 상품이 여러 구매에 포함)
- **partners ↔ products**: 1:N (한 파트너가 여러 상품 판매)
- **partners ↔ batches**: 1:N (한 파트너가 여러 배치 등록)

---

## 마이그레이션 계획

### 마이그레이션 파일 구조

```
database/migrations/
├── 001_create_users_table.sql
├── 002_create_partners_table.sql
├── 003_create_products_table.sql
├── 004_create_tracking_table.sql
├── 005_create_orders_table.sql
├── 006_create_purchases_table.sql
└── 007_create_batches_table.sql
```

### 마이그레이션 실행 순서

1. **users** (기본 테이블, 다른 테이블의 FK 참조)
2. **partners** (users 참조)
3. **products** (partners 참조)
4. **tracking** (products 참조)
5. **orders** (users 참조)
6. **purchases** (users, products 참조)
7. **batches** (products, partners, users 참조)

---

## 시드 데이터 계획

### 최소 시드 데이터

**목적**: 테스트 실행 및 개발을 위한 샘플 데이터

#### users (3명)
- 일반 사용자 1명
- 파트너 계정 1명
- 관리자 계정 1명

#### partners (1개)
- 테스트용 로스터리 1개

#### products (3개)
- 친환경 원두 1개
- 여성 생산자 원두 1개
- 일반 원두 1개

#### tracking (3개)
- 각 상품별 추적 정보

#### purchases (5-10개)
- 테스트 사용자의 3개월간 구매 기록
- 친환경 원두 구매 포함

#### orders (2-3개)
- 테스트 주문 데이터

#### batches (2-3개)
- 승인 대기, 승인 완료 상태의 배치

---

## 구현 파일 목록

### 스키마 정의 파일

1. `database/schemas/users.sql` - users 테이블 스키마
2. `database/schemas/partners.sql` - partners 테이블 스키마
3. `database/schemas/products.sql` - products 테이블 스키마
4. `database/schemas/tracking.sql` - tracking 테이블 스키마
5. `database/schemas/orders.sql` - orders 테이블 스키마
6. `database/schemas/purchases.sql` - purchases 테이블 스키마
7. `database/schemas/batches.sql` - batches 테이블 스키마

### 마이그레이션 파일

1. `database/migrations/001_create_users_table.sql`
2. `database/migrations/002_create_partners_table.sql`
3. `database/migrations/003_create_products_table.sql`
4. `database/migrations/004_create_tracking_table.sql`
5. `database/migrations/005_create_orders_table.sql`
6. `database/migrations/006_create_purchases_table.sql`
7. `database/migrations/007_create_batches_table.sql`

### 시드 데이터 파일

1. `database/seeds/01_users.sql`
2. `database/seeds/02_partners.sql`
3. `database/seeds/03_products.sql`
4. `database/seeds/04_tracking.sql`
5. `database/seeds/05_purchases.sql`
6. `database/seeds/06_orders.sql`
7. `database/seeds/07_batches.sql`

### 유틸리티 파일

1. `database/schemas/schema.sql` - 전체 스키마 통합 파일
2. `database/seeds/seed_all.sql` - 전체 시드 데이터 실행 파일

---

## 테스트 요구사항 충족

### FR1 테스트 요구사항

✅ **생산자 수익 비율**: `tracking.producer_revenue_ratio`
✅ **농장 위치**: `tracking.farm_latitude`, `tracking.farm_longitude`, `tracking.farm_address`
✅ **원산지 정보**: `tracking.origin_country`, `tracking.origin_region`

### FR2 테스트 요구사항

✅ **구매 기록**: `purchases` 테이블
✅ **3개월간 집계**: `purchases.purchase_date` 기반 쿼리
✅ **친환경 원두 필터링**: `products.is_eco_friendly` 조인
✅ **탄소 발자국 계산**: `purchases.quantity` 기반 계산

---

## 예상 결과

### 생성될 파일

- **스키마 파일**: 7개
- **마이그레이션 파일**: 7개
- **시드 데이터 파일**: 7개
- **통합 파일**: 2개
- **총 23개 파일**

### 데이터베이스 구조

- **테이블**: 7개
- **외래키 관계**: 8개
- **제약 조건**: 10+ 개
- **시드 데이터**: 약 20-30개 레코드

---

## 승인 요청

### 구현 계획 요약

1. **7개 테이블 스키마 정의** (최소 필수 필드만)
2. **7개 마이그레이션 파일 작성** (순차 실행)
3. **7개 시드 데이터 파일 작성** (테스트용 샘플 데이터)
4. **통합 실행 파일** (스키마 + 시드 데이터)

### 예상 소요 시간

- 스키마 정의: 1-2시간
- 마이그레이션 파일: 1-2시간
- 시드 데이터: 1시간
- **총 3-5시간**

### 승인 여부

다음 작업을 진행하시겠습니까?

- [ ] ✅ **승인** - 스키마 설계 및 마이그레이션 파일 생성 시작
- [ ] ⏸️ **보류** - 추가 검토 필요
- [ ] ✏️ **수정 요청** - 스키마 설계 변경 필요

**승인 시 진행할 작업**:
1. 각 테이블 스키마 SQL 파일 생성
2. 마이그레이션 파일 생성 (순차 실행 가능)
3. 시드 데이터 파일 생성 (FR1, FR2 테스트 통과 가능한 데이터)
4. 통합 실행 스크립트 생성

---

**작성일**: 2025-12-15  
**승인 대기 중**

