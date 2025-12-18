# 테스트 커버리지 리포트

> 현재 프로젝트의 테스트 커버리지 현황

## 📊 현재 상태

**현재 단계**: 🔴 **Red (TDD)** - 실패하는 테스트 작성 완료

### 테스트 커버리지 실행 방법

```bash
# 백엔드 테스트 커버리지
cd backend
npm install  # 의존성 설치 (최초 1회)
npm run test:coverage

# 프론트엔드 테스트 커버리지
cd frontend
npm install  # 의존성 설치 (최초 1회)
npm run test:coverage
```

## 📈 작성된 테스트 현황

### 백엔드 테스트

#### FR1: 투명 정보 추적 기능 ✅
**파일**: `backend/tests/modules/tracking/productTracking.test.js`

**테스트 케이스**: 5개
- ✅ `GET /api/products/:id/tracking` - 200 상태 코드 반환
- ✅ 생산자 수익 비율 반환 검증
- ✅ 농장 위치 정보 반환 검증 (좌표 유효성 포함)
- ✅ 원산지 정보 반환 검증
- ✅ 존재하지 않는 상품에 대한 404 에러 처리

**예상 커버리지 대상**:
- `src/modules/tracking/` 모듈
- `src/controllers/` (ProductTrackingController)
- `src/models/` (Product, Tracking 모델)

#### FR2: 윤리 영향 리포트 기능 ✅
**파일**: `backend/tests/modules/tracking/ethicalImpact.test.js`

**테스트 케이스**: 9개
- ✅ `GET /api/users/:userId/ethical-impact` - 200 상태 코드
- ✅ 탄소 발자국 절감량 반환 검증
- ✅ 3개월간 구매 기록 집계 검증
- ✅ 친환경 원두 필터링 검증
- ✅ 긍정적인 메시지 생성 검증
- ✅ 존재하지 않는 사용자 404 처리
- ✅ 구매 기록 없는 경우 처리
- ✅ 탄소 발자국 계산 로직 검증
- ✅ 월별 집계 데이터 검증

**예상 커버리지 대상**:
- `src/modules/tracking/` 모듈 (윤리 영향)
- `src/services/carbon/` (탄소 발자국 계산)
- `src/controllers/` (EthicalImpactController)
- `src/models/` (Purchase, User 모델)

### 프론트엔드 테스트

#### FR1: 투명 정보 추적 기능 ✅
**파일**: `frontend/src/pages/Product/__tests__/ProductTracking.test.jsx`

**테스트 케이스**: 5개
- ✅ '원두 스토리 추적' 탭 버튼 렌더링
- ✅ 탭 클릭 시 추적 정보 표시
- ✅ 지도 컴포넌트 렌더링
- ✅ 농장 위치 좌표 표시
- ✅ 원산지 정보 표시

**예상 커버리지 대상**:
- `src/pages/Product/ProductTracking.jsx`
- `src/services/api/productApi.js`
- `src/components/tracking/` (지도 컴포넌트)

#### FR2: 윤리 영향 리포트 기능 ✅
**파일**: `frontend/src/pages/MyPage/__tests__/EthicalImpact.test.jsx`

**테스트 케이스**: 8개
- ✅ 윤리 영향 섹션 렌더링
- ✅ 탄소 발자국 절감량 수치 표시
- ✅ 긍정적인 메시지 표시
- ✅ 구매 기간 정보 표시
- ✅ 로딩 상태 처리
- ✅ 에러 상태 처리
- ✅ 월별 집계 표시
- ✅ 구매 기록 없는 경우 빈 상태 표시

**예상 커버리지 대상**:
- `src/pages/MyPage/EthicalImpact.jsx`
- `src/services/api/userApi.js`
- `src/components/` (통계, 메시지 컴포넌트)

## 📋 테스트 커버리지 목표

### MVP 목표 (Phase 0)

| 모듈 | 목표 커버리지 | 현재 상태 | 테스트 케이스 |
|------|-------------|----------|-------------|
| **FR1: 투명 정보 추적** | 80% 이상 | 🔴 테스트 작성 완료 (구현 전) | 10개 (백엔드 5 + 프론트 5) |
| **FR2: 윤리 영향 리포트** | 70% 이상 | 🔴 테스트 작성 완료 (구현 전) | 17개 (백엔드 9 + 프론트 8) |
| **FR3: 맞춤형 주문 시스템** | 75% 이상 | ⚪ 미작성 | - |
| **FR4: 데이터 검증** | 60% 이상 | ⚪ 미작성 | - |
| **FR5: 파트너 관리** | 70% 이상 | ⚪ 미작성 | - |

### 전체 프로젝트 목표

- **단위 테스트 커버리지**: 70% 이상
- **통합 테스트 커버리지**: 50% 이상
- **E2E 테스트**: 핵심 사용자 플로우 100% 커버

## 🔍 커버리지 분석 항목

Jest 커버리지 리포트는 다음 항목을 포함합니다:

- **Statements**: 코드 문장 실행 비율
- **Branches**: 조건문 분기 실행 비율
- **Functions**: 함수 실행 비율
- **Lines**: 코드 라인 실행 비율

### 커버리지 리포트 예시

```
-------------------|---------|----------|---------|---------|
File               | % Stmts | % Branch | % Funcs | % Lines |
-------------------|---------|----------|---------|---------|
All files          |    0.00 |     0.00 |    0.00 |    0.00 |
 tracking/         |    0.00 |     0.00 |    0.00 |    0.00 |
  productTracking  |    0.00 |     0.00 |    0.00 |    0.00 |
-------------------|---------|----------|---------|---------|
```

> **참고**: 현재는 구현이 없어 커버리지가 0%입니다. 이는 TDD의 Red 단계로 정상입니다.

## 📝 다음 단계

1. **Green 단계**: 최소한의 구현으로 테스트 통과
   - 예상 커버리지: 60-70%
   
2. **Refactor 단계**: 코드 개선 및 추가 테스트
   - 목표 커버리지: 80% 이상

3. **다음 기능 테스트 작성**: FR2, FR3 순서로 진행

## 🛠️ 커버리지 리포트 확인

테스트 실행 후 다음 위치에서 리포트를 확인할 수 있습니다:

- **백엔드**: `backend/coverage/index.html`
- **프론트엔드**: `frontend/coverage/index.html`

브라우저에서 HTML 파일을 열어 시각적인 커버리지 리포트를 확인할 수 있습니다.

## 📚 참고

- [Jest Coverage Documentation](https://jestjs.io/docs/cli#--coverage)
- [Istanbul Coverage Tool](https://istanbul.js.org/)

---

**마지막 업데이트**: 2025-12-15  
**현재 단계**: Red (실패하는 테스트 작성 완료)

