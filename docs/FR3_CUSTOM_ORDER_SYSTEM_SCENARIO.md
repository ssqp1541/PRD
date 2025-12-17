# FR3: 맞춤형 주문 시스템 최소 단위 구현 시나리오

> TDD Green 단계를 위한 FR3 최소 구현 계획

**작성일**: 2025-12-15  
**목표**: FR3 테스트를 통과하기 위한 최소한의 구현  
**방법론**: TDD (Test-Driven Development) - Red → Green 단계

---

## 📋 목차

1. [시나리오 개요](#시나리오-개요)
2. [테스트 작성 계획](#테스트-작성-계획)
3. [백엔드 구현 계획](#백엔드-구현-계획)
4. [프론트엔드 구현 계획](#프론트엔드-구현-계획)
5. [데이터베이스 연동](#데이터베이스-연동)
6. [승인 요청](#승인-요청)

---

## 시나리오 개요

### 목표

FR3 테스트를 통과하기 위한 최소한의 구현을 완료합니다.

### 사용자 스토리

```
Given 고객이 원두 검색 페이지에 접속했을 때
When 고객이 필터 조건으로 '여성 생산자 커피'와 '친환경 포장재 사용'을 모두 선택하고 검색하면
Then 두 가지 기준을 모두 충족하는 원두 상품만 표시되어야 한다.
```

### 구현 원칙

1. **테스트 우선**: 먼저 테스트 작성 (Red 단계)
2. **최소 기능**: 테스트를 통과시키는 최소한의 코드만 구현
3. **데이터베이스 활용**: 이미 생성된 `products` 테이블 사용
4. **필터링 로직**: 다중 필터 조합 지원

### 구현 범위

#### ✅ 포함 사항
- 테스트 작성 (12개 케이스)
- 백엔드 검색 API (`GET /api/products/search`)
- 필터링 로직 (여성 생산자, 친환경 포장재)
- 다중 필터 조합 처리
- 프론트엔드 검색 페이지
- 필터 UI 컴포넌트
- 검색 결과 리스트
- 기본 주문/결제 프로세스 (최소 구현)

#### ⚪ 제외 사항 (향후 구현)
- 고급 검색 기능 (가격 범위, 원산지 등)
- 정렬 기능
- 페이지네이션
- 실제 결제 연동 (Mock 구현)
- 장바구니 기능 (직접 주문만)

---

## 테스트 작성 계획

### 백엔드 테스트 (6개 케이스)

**파일**: `backend/tests/modules/commerce/productSearch.test.js`

1. **기본 검색 API 테스트**
   - `GET /api/products/search` - 200 상태 코드 반환
   - 쿼리 파라미터 없이 모든 상품 반환

2. **여성 생산자 필터 테스트**
   - `?is_female_producer=true` 파라미터
   - `is_female_producer=true`인 상품만 반환

3. **친환경 포장재 필터 테스트**
   - `?is_eco_packaging=true` 파라미터
   - `is_eco_packaging=true`인 상품만 반환

4. **다중 필터 조합 테스트**
   - `?is_female_producer=true&is_eco_packaging=true`
   - 두 조건을 모두 만족하는 상품만 반환

5. **필터 결과 정확성 검증**
   - 반환된 모든 상품이 필터 조건을 만족하는지 검증
   - 필터 조건을 만족하지 않는 상품이 포함되지 않는지 검증

6. **빈 결과 처리**
   - 조건을 만족하는 상품이 없을 때 빈 배열 반환

### 프론트엔드 테스트 (6개 케이스)

**파일**: `frontend/src/pages/Product/__tests__/ProductSearch.test.jsx`

1. **검색 페이지 렌더링**
   - 검색 페이지 컴포넌트가 렌더링되는지 확인

2. **필터 UI 렌더링**
   - '여성 생산자' 필터 체크박스 렌더링
   - '친환경 포장재' 필터 체크박스 렌더링

3. **필터 선택 동작**
   - 필터 체크박스 클릭 시 상태 변경 확인

4. **검색 버튼 클릭**
   - 검색 버튼 클릭 시 API 호출 확인

5. **필터링된 결과 표시**
   - 검색 결과 리스트 렌더링
   - 필터 조건을 만족하는 상품만 표시

6. **필터 초기화 기능**
   - 필터 초기화 버튼 동작 확인

---

## 백엔드 구현 계획

### 1. 프로젝트 구조

```
backend/src/
├── modules/
│   └── commerce/
│       ├── productSearchController.js  # 컨트롤러 (신규)
│       ├── productSearchService.js     # 서비스 (신규)
│       └── productSearchRoutes.js      # 라우트 (신규)
└── models/
    └── Product.js                      # Product 모델 (신규)
```

### 2. 구현 파일 상세

#### 2.1 Product 모델 (`models/Product.js`)

**기능**:
- 데이터베이스에서 상품 조회
- 필터 조건에 따른 상품 검색

**메서드**:
```javascript
- findAll()
- findByFilters(filters)
```

**필터 조건**:
```javascript
{
  is_female_producer: boolean,
  is_eco_packaging: boolean,
  is_eco_friendly: boolean (선택사항)
}
```

#### 2.2 ProductSearchService (`modules/commerce/productSearchService.js`)

**기능**:
- 필터 조건 파싱
- 필터링 로직 처리
- 검색 결과 포맷팅

**함수**:
```javascript
- searchProducts(filters)
```

#### 2.3 ProductSearchController (`modules/commerce/productSearchController.js`)

**기능**:
- HTTP 요청/응답 처리
- 쿼리 파라미터 파싱
- 에러 처리

**엔드포인트 핸들러**:
```javascript
- search(req, res, next)
```

#### 2.4 ProductSearchRoutes (`modules/commerce/productSearchRoutes.js`)

**라우트 정의**:
```javascript
GET /api/products/search
```

### 3. API 명세

**엔드포인트**: `GET /api/products/search`

**쿼리 파라미터**:
- `is_female_producer` (boolean, 선택): 여성 생산자 필터
- `is_eco_packaging` (boolean, 선택): 친환경 포장재 필터
- `is_eco_friendly` (boolean, 선택): 친환경 원두 필터

**성공 응답** (200 OK):
```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "콜롬비아 수프리모 여성 생산자 원두",
      "description": "여성 생산자가 직접 재배한 프리미엄 원두입니다.",
      "price": 30000.00,
      "image_url": "https://example.com/images/colombia-female.jpg",
      "is_eco_friendly": false,
      "is_female_producer": true,
      "is_eco_packaging": false
    }
  ],
  "total": 1,
  "filters": {
    "is_female_producer": true,
    "is_eco_packaging": true
  }
}
```

**에러 응답** (400 Bad Request):
```json
{
  "success": false,
  "message": "유효하지 않은 필터 파라미터입니다.",
  "error": "INVALID_FILTER_PARAMS"
}
```

---

## 프론트엔드 구현 계획

### 1. 프로젝트 구조

```
frontend/src/
├── pages/
│   └── Product/
│       ├── ProductSearch.jsx          # 검색 페이지 (신규)
│       └── __tests__/
│           └── ProductSearch.test.jsx # 테스트 (신규)
├── components/
│   └── product/
│       ├── ProductFilter.jsx          # 필터 컴포넌트 (신규)
│       └── ProductList.jsx            # 상품 리스트 컴포넌트 (신규)
└── services/
    └── api/
        └── productApi.js              # API 클라이언트 (업데이트)
```

### 2. 구현 파일 상세

#### 2.1 ProductSearch 컴포넌트 (`pages/Product/ProductSearch.jsx`)

**기능**:
- 검색 페이지 UI
- 필터 상태 관리
- 검색 결과 표시
- 검색 실행

**UI 요소**:
- 필터 섹션
- 검색 버튼
- 검색 결과 리스트
- 로딩 상태
- 에러 상태

**상태 관리**:
```javascript
- filters: { is_female_producer: boolean, is_eco_packaging: boolean }
- products: Array
- isLoading: boolean
- error: string | null
```

#### 2.2 ProductFilter 컴포넌트 (`components/product/ProductFilter.jsx`)

**기능**:
- 필터 체크박스 UI
- 필터 상태 관리
- 필터 초기화

**Props**:
```javascript
{
  filters: Object,
  onFilterChange: Function,
  onReset: Function
}
```

#### 2.3 ProductList 컴포넌트 (`components/product/ProductList.jsx`)

**기능**:
- 상품 리스트 표시
- 상품 카드 렌더링
- 상품 클릭 시 상세 페이지 이동

**Props**:
```javascript
{
  products: Array,
  onProductClick: Function
}
```

#### 2.4 productApi 업데이트 (`services/api/productApi.js`)

**추가 함수**:
```javascript
- searchProducts(filters)
```

---

## 데이터베이스 연동

### 사용할 테이블

**products 테이블** (이미 생성됨):
```sql
- id
- name
- description
- price
- image_url
- partner_id
- is_eco_friendly (BOOLEAN)
- is_female_producer (BOOLEAN)
- is_eco_packaging (BOOLEAN)
```

### 쿼리 예시

```sql
-- 필터 조건에 따른 상품 검색
SELECT 
  id, name, description, price, image_url,
  is_eco_friendly, is_female_producer, is_eco_packaging
FROM products
WHERE 
  ($1::boolean IS NULL OR is_female_producer = $1)
  AND ($2::boolean IS NULL OR is_eco_packaging = $2)
  AND ($3::boolean IS NULL OR is_eco_friendly = $3)
ORDER BY created_at DESC;
```

---

## 구현 파일 목록

### 테스트 파일 (2개)

1. `backend/tests/modules/commerce/productSearch.test.js` - 백엔드 테스트 (신규)
2. `frontend/src/pages/Product/__tests__/ProductSearch.test.jsx` - 프론트엔드 테스트 (신규)

### 백엔드 파일 (4개)

1. `backend/src/models/Product.js` - Product 모델 (신규)
2. `backend/src/modules/commerce/productSearchService.js` - 검색 서비스 (신규)
3. `backend/src/modules/commerce/productSearchController.js` - 검색 컨트롤러 (신규)
4. `backend/src/modules/commerce/productSearchRoutes.js` - 검색 라우트 (신규)
5. `backend/src/routes/index.js` - 라우트 통합 (업데이트)

### 프론트엔드 파일 (4개)

1. `frontend/src/pages/Product/ProductSearch.jsx` - 검색 페이지 (신규)
2. `frontend/src/components/product/ProductFilter.jsx` - 필터 컴포넌트 (신규)
3. `frontend/src/components/product/ProductList.jsx` - 상품 리스트 컴포넌트 (신규)
4. `frontend/src/services/api/productApi.js` - API 클라이언트 (업데이트)
5. `frontend/src/App.jsx` - 라우트 추가 (업데이트)

---

## 예상 결과

### 생성될 파일
- **테스트 파일**: 2개 (신규)
- **백엔드**: 5개 파일 (신규 4개, 업데이트 1개)
- **프론트엔드**: 5개 파일 (신규 3개, 업데이트 2개)
- **총 12개 파일**

### 기능
- ✅ 상품 검색 API
- ✅ 필터링 로직 (여성 생산자, 친환경 포장재)
- ✅ 다중 필터 조합 처리
- ✅ 검색 페이지 UI
- ✅ 필터 UI 컴포넌트
- ✅ 검색 결과 리스트
- ✅ 기본 주문 프로세스 (최소 구현)

---

## 승인 요청

### 구현 계획 요약

1. **테스트 작성** (Red 단계) - 2개 파일
   - 백엔드 테스트 6개 케이스
   - 프론트엔드 테스트 6개 케이스

2. **백엔드 구현** (Green 단계) - 5개 파일
   - Product 모델 생성
   - ProductSearchService 구현
   - ProductSearchController 구현
   - ProductSearchRoutes 생성
   - 라우트 통합 파일 업데이트

3. **프론트엔드 구현** (Green 단계) - 5개 파일
   - ProductSearch 컴포넌트 구현
   - ProductFilter 컴포넌트 생성
   - ProductList 컴포넌트 생성
   - productApi 함수 구현
   - App.jsx 라우트 추가

### 예상 소요 시간

- 테스트 작성: 2-3시간
- 백엔드 구현: 2-3시간
- 프론트엔드 구현: 3-4시간
- 테스트 및 디버깅: 1-2시간
- **총 8-12시간** (1-1.5일)

### 승인 여부

다음 작업을 진행하시겠습니까?

- [ ] ✅ **승인** - FR3 맞춤형 주문 시스템 구현 시작
- [ ] ⏸️ **보류** - 추가 검토 필요
- [ ] ✏️ **수정 요청** - 시나리오 변경 필요

**승인 시 진행할 작업**:
1. 테스트 작성 (Red 단계) - 12개 케이스
2. 백엔드 Product 모델 및 검색 서비스/컨트롤러/라우트 구현
3. 프론트엔드 검색 페이지 및 필터 컴포넌트 구현
4. productApi 함수 구현
5. 테스트 실행 및 통과 확인

---

**작성일**: 2025-12-15  
**승인 대기 중**

