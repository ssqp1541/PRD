# 공통 컴포넌트 및 최적화 최소 단위 구현 시나리오

> README.md 388-400 라인: 공통 컴포넌트, 성능 최적화, 모바일 최적화 최소 구현 계획

**작성일**: 2025-12-15  
**목표**: 공통 컴포넌트 및 최적화 기능의 최소 단위 구현  
**방법론**: 최소 기능 구현 (MVP 수준)

---

## 📋 목차

1. [시나리오 개요](#시나리오-개요)
2. [공통 컴포넌트 구현 계획](#공통-컴포넌트-구현-계획)
3. [성능 최적화 구현 계획](#성능-최적화-구현-계획)
4. [모바일 최적화 구현 계획](#모바일-최적화-구현-계획)
5. [현재 상태 확인](#현재-상태-확인)
6. [승인 요청](#승인-요청)

---

## 시나리오 개요

### 목표

공통 컴포넌트와 최적화 기능을 최소 단위로 구현하여 코드 재사용성과 사용자 경험을 개선합니다.

### 구현 범위

#### ✅ 포함 사항

**1. 공통 컴포넌트**
- Button 컴포넌트 (재사용 가능한 버튼)
- Input 컴포넌트 (재사용 가능한 입력 필드)
- Modal 컴포넌트 (다이얼로그/팝업)
- Loading Spinner 컴포넌트 (로딩 표시)
- Error Message 컴포넌트 (에러 메시지 표시)
- Header/Navigation 개선 (반응형 추가)
- Footer 개선 (반응형 추가)

**2. 성능 최적화**
- 이미지 WebP 형식 변환 (유틸리티 함수)
- 지연 로딩 (Lazy Loading) 구현 (React.lazy, Suspense)
- 데이터베이스 인덱싱 (주요 쿼리 컬럼)

**3. 모바일 최적화**
- 반응형 디자인 구현 (미디어 쿼리)
- 모바일 레이아웃 테스트 (기본 반응형 확인)

#### ⚪ 제외 사항 (향후 구현)
- 고급 모달 기능 (애니메이션, 드래그 등)
- 이미지 자동 변환 파이프라인
- 고급 캐싱 전략 (Redis 등)
- PWA 기능
- 고급 반응형 디자인 (다양한 브레이크포인트)

---

## 공통 컴포넌트 구현 계획

### 1. Button 컴포넌트

**파일**: `frontend/src/components/common/Button.jsx`

**기능**:
- 다양한 스타일 변형 (primary, secondary, danger, outline)
- 크기 변형 (small, medium, large)
- 비활성화 상태
- 로딩 상태 표시

**Props**:
```javascript
{
  variant: 'primary' | 'secondary' | 'danger' | 'outline',
  size: 'small' | 'medium' | 'large',
  disabled: boolean,
  loading: boolean,
  onClick: Function,
  children: ReactNode,
  type: 'button' | 'submit' | 'reset',
}
```

**사용 예시**:
```jsx
<Button variant="primary" onClick={handleClick}>저장</Button>
<Button variant="danger" loading={isLoading}>삭제</Button>
```

### 2. Input 컴포넌트

**파일**: `frontend/src/components/common/Input.jsx`

**기능**:
- 다양한 입력 타입 지원 (text, email, password, number 등)
- 에러 상태 표시
- 플레이스홀더 및 라벨
- 필수 필드 표시

**Props**:
```javascript
{
  type: string,
  label: string,
  placeholder: string,
  value: string,
  onChange: Function,
  error: string,
  required: boolean,
  disabled: boolean,
}
```

**사용 예시**:
```jsx
<Input
  type="email"
  label="이메일"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  required
/>
```

### 3. Modal 컴포넌트

**파일**: `frontend/src/components/common/Modal.jsx`

**기능**:
- 모달 열기/닫기
- 배경 클릭 시 닫기 (선택적)
- 제목 및 내용 영역
- 확인/취소 버튼

**Props**:
```javascript
{
  isOpen: boolean,
  onClose: Function,
  title: string,
  children: ReactNode,
  showCloseButton: boolean,
  closeOnOverlayClick: boolean,
}
```

**사용 예시**:
```jsx
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="확인"
>
  <p>정말 삭제하시겠습니까?</p>
</Modal>
```

### 4. Loading Spinner 컴포넌트

**파일**: `frontend/src/components/common/LoadingSpinner.jsx`

**기능**:
- 로딩 스피너 표시
- 크기 변형 (small, medium, large)
- 전체 화면 오버레이 옵션

**Props**:
```javascript
{
  size: 'small' | 'medium' | 'large',
  fullScreen: boolean,
  message: string,
}
```

**사용 예시**:
```jsx
<LoadingSpinner size="medium" message="로딩 중..." />
<LoadingSpinner fullScreen />
```

### 5. Error Message 컴포넌트

**파일**: `frontend/src/components/common/ErrorMessage.jsx`

**기능**:
- 에러 메시지 표시
- 다양한 스타일 (error, warning, info)
- 아이콘 표시 (선택적)

**Props**:
```javascript
{
  message: string,
  type: 'error' | 'warning' | 'info',
  onClose: Function,
}
```

**사용 예시**:
```jsx
<ErrorMessage message="로그인에 실패했습니다." type="error" />
```

### 6. Header/Navigation 개선

**파일**: `frontend/src/components/layout/Header.jsx` (업데이트)

**개선 사항**:
- 모바일 반응형 메뉴 (햄버거 메뉴)
- 모바일에서 네비게이션 접기/펼치기
- 반응형 스타일 적용

### 7. Footer 개선

**파일**: `frontend/src/components/layout/Footer.jsx` (업데이트)

**개선 사항**:
- 모바일 반응형 레이아웃
- 작은 화면에서 세로 배치
- 반응형 스타일 적용

---

## 성능 최적화 구현 계획

### 1. 이미지 WebP 형식 변환

**파일**: `frontend/src/utils/imageUtils.js`

**기능**:
- WebP 형식 지원 여부 확인
- WebP 형식으로 이미지 URL 변환
- 폴백 이미지 제공

**함수**:
```javascript
- getWebPImageUrl(imageUrl)
- isWebPSupported()
```

**사용 예시**:
```jsx
const imageUrl = getWebPImageUrl(product.image_url);
<img src={imageUrl} alt={product.name} />
```

### 2. 지연 로딩 (Lazy Loading) 구현

**파일**: `frontend/src/App.jsx` (업데이트)

**기능**:
- React.lazy를 사용한 컴포넌트 지연 로딩
- Suspense를 사용한 로딩 상태 처리
- 주요 페이지 컴포넌트 지연 로딩

**구현**:
```jsx
const ProductSearch = React.lazy(() => import('./pages/Product/ProductSearch'));
const MyPage = React.lazy(() => import('./pages/MyPage/MyPage'));

<Suspense fallback={<LoadingSpinner fullScreen />}>
  <ProductSearch />
</Suspense>
```

**추가**: 이미지 지연 로딩
- `frontend/src/components/common/LazyImage.jsx` 생성
- Intersection Observer API 사용 (선택적)

### 3. 데이터베이스 인덱싱

**파일**: `database/migrations/008_add_indexes.sql` (신규)

**인덱스 추가 대상**:
1. `products` 테이블
   - `is_female_producer` (필터링 성능)
   - `is_eco_packaging` (필터링 성능)
   - `is_eco_friendly` (필터링 성능)
   - `partner_id` (JOIN 성능)

2. `purchases` 테이블
   - `user_id` (사용자별 조회)
   - `purchase_date` (날짜 범위 조회)
   - `product_id` (상품별 조회)

3. `orders` 테이블
   - `user_id` (사용자별 조회)
   - `order_date` (날짜 범위 조회)

**인덱스 생성 SQL 예시**:
```sql
CREATE INDEX idx_products_female_producer ON products(is_female_producer);
CREATE INDEX idx_products_eco_packaging ON products(is_eco_packaging);
CREATE INDEX idx_products_eco_friendly ON products(is_eco_friendly);
CREATE INDEX idx_purchases_user_date ON purchases(user_id, purchase_date);
```

---

## 모바일 최적화 구현 계획

### 1. 반응형 디자인 구현

**방법**: CSS 미디어 쿼리 및 Flexbox/Grid 활용

**브레이크포인트**:
- 모바일: ~768px
- 태블릿: 769px ~ 1024px
- 데스크톱: 1025px+

**적용 대상**:
1. **Header 컴포넌트**
   - 모바일: 햄버거 메뉴
   - 데스크톱: 전체 메뉴 표시

2. **Footer 컴포넌트**
   - 모바일: 세로 배치
   - 데스크톱: 가로 배치

3. **ProductSearch 페이지**
   - 모바일: 필터를 상단에 배치, 세로 스크롤
   - 데스크톱: 사이드바 + 메인 영역

4. **ProductList 컴포넌트**
   - 모바일: 1열 그리드
   - 태블릿: 2열 그리드
   - 데스크톱: 3열 이상 그리드

5. **공통 스타일**
   - `frontend/src/styles/responsive.css` 생성 (선택적)
   - 또는 각 컴포넌트에 인라인 스타일로 미디어 쿼리 적용

### 2. 모바일 레이아웃 테스트

**방법**: 브라우저 개발자 도구 사용

**테스트 항목**:
1. 모바일 화면 크기에서 레이아웃 확인
2. 햄버거 메뉴 동작 확인
3. 터치 이벤트 동작 확인
4. 스크롤 동작 확인
5. 폰트 크기 및 가독성 확인

**테스트 도구**:
- Chrome DevTools (모바일 에뮬레이터)
- Firefox Responsive Design Mode

---

## 현재 상태 확인

### ✅ 이미 구현된 항목

1. **Header 컴포넌트** (`frontend/src/components/layout/Header.jsx`)
   - 기본 네비게이션 기능
   - 사용자 인증 상태 표시
   - ⚠️ 반응형 미적용 (개선 필요)

2. **Footer 컴포넌트** (`frontend/src/components/layout/Footer.jsx`)
   - 기본 푸터 정보
   - ⚠️ 반응형 미적용 (개선 필요)

### ⚪ 미구현 항목

1. **공통 컴포넌트**
   - Button, Input, Modal, LoadingSpinner, ErrorMessage

2. **성능 최적화**
   - 이미지 WebP 변환
   - 지연 로딩
   - 데이터베이스 인덱싱

3. **모바일 최적화**
   - 반응형 디자인
   - 모바일 레이아웃 테스트

---

## 구현 파일 목록

### 공통 컴포넌트 (5개 신규)

1. `frontend/src/components/common/Button.jsx` - Button 컴포넌트
2. `frontend/src/components/common/Input.jsx` - Input 컴포넌트
3. `frontend/src/components/common/Modal.jsx` - Modal 컴포넌트
4. `frontend/src/components/common/LoadingSpinner.jsx` - Loading Spinner
5. `frontend/src/components/common/ErrorMessage.jsx` - Error Message

### 레이아웃 컴포넌트 개선 (2개 업데이트)

6. `frontend/src/components/layout/Header.jsx` - 반응형 추가
7. `frontend/src/components/layout/Footer.jsx` - 반응형 추가

### 성능 최적화 (3개)

8. `frontend/src/utils/imageUtils.js` - 이미지 WebP 유틸리티
9. `frontend/src/components/common/LazyImage.jsx` - 지연 로딩 이미지 (선택적)
10. `frontend/src/App.jsx` - React.lazy 적용 (업데이트)
11. `database/migrations/008_add_indexes.sql` - 데이터베이스 인덱스

### 모바일 최적화 (기존 파일 업데이트)

12. `frontend/src/pages/Product/ProductSearch.jsx` - 반응형 스타일 추가
13. `frontend/src/components/product/ProductList.jsx` - 반응형 그리드 추가

---

## 예상 결과

### 생성될 파일
- **공통 컴포넌트**: 5개 (신규)
- **유틸리티**: 1-2개 (신규)
- **데이터베이스 마이그레이션**: 1개 (신규)
- **업데이트 파일**: 5-6개

### 기능
- ✅ 재사용 가능한 공통 컴포넌트
- ✅ 이미지 WebP 변환 지원
- ✅ 컴포넌트 지연 로딩
- ✅ 데이터베이스 쿼리 성능 개선
- ✅ 모바일 반응형 디자인
- ✅ 햄버거 메뉴 (모바일)

---

## 승인 요청

### 구현 계획 요약

1. **공통 컴포넌트 구현** (5개)
   - Button, Input, Modal, LoadingSpinner, ErrorMessage
   - 재사용 가능한 컴포넌트로 코드 중복 제거

2. **레이아웃 컴포넌트 개선** (2개)
   - Header: 모바일 햄버거 메뉴 추가
   - Footer: 반응형 레이아웃 적용

3. **성능 최적화** (3개)
   - 이미지 WebP 변환 유틸리티
   - React.lazy를 사용한 컴포넌트 지연 로딩
   - 데이터베이스 인덱스 추가

4. **모바일 최적화** (2개)
   - 반응형 디자인 적용
   - 모바일 레이아웃 테스트 가이드

### 예상 소요 시간

- 공통 컴포넌트: 3-4시간
- 레이아웃 개선: 1-2시간
- 성능 최적화: 2-3시간
- 모바일 최적화: 2-3시간
- **총 8-12시간** (1-1.5일)

### 승인 여부

다음 작업을 진행하시겠습니까?

- [ ] ✅ **승인** - 공통 컴포넌트 및 최적화 구현 시작
- [ ] ⏸️ **보류** - 추가 검토 필요
- [ ] ✏️ **수정 요청** - 시나리오 변경 필요

**승인 시 진행할 작업**:
1. 공통 컴포넌트 5개 생성 (Button, Input, Modal, LoadingSpinner, ErrorMessage)
2. Header/Footer 반응형 개선
3. 이미지 WebP 변환 유틸리티 구현
4. React.lazy를 사용한 지연 로딩 적용
5. 데이터베이스 인덱스 추가
6. 반응형 디자인 적용

---

**작성일**: 2025-12-15  
**승인 대기 중**

