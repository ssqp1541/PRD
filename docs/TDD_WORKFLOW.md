# TDD (Test-Driven Development) 워크플로우

> 실패하는 테스트부터 시작하는 개발 방법론

## 📋 TDD 사이클 (Red-Green-Refactor)

TDD는 다음 3단계를 반복합니다:

```
┌─────────┐
│   1.    │  🔴 RED: 실패하는 테스트 작성
│  Write  │     → 테스트가 실패하는지 확인
│   Test  │
└────┬────┘
     │
     ▼
┌─────────┐
│   2.    │  🟢 GREEN: 테스트를 통과시키는 최소한의 코드 작성
│  Write  │     → 테스트가 통과하는지 확인
│   Code  │
└────┬────┘
     │
     ▼
┌─────────┐
│   3.    │  🔵 REFACTOR: 코드 리팩토링
│ Refactor│     → 테스트가 여전히 통과하는지 확인
└────┬────┘
     │
     └─────▶ 다음 기능으로 반복
```

## 🎯 작업 순서

### Phase 1: 테스트 환경 설정

1. **테스트 프레임워크 설치**
   - 백엔드: Jest + Supertest (API 테스트)
   - 프론트엔드: Jest + React Testing Library
   - E2E: Playwright 또는 Cypress (선택사항)

2. **테스트 스크립트 설정**
   - `package.json`에 테스트 스크립트 추가
   - CI/CD 파이프라인 설정 (선택사항)

### Phase 2: 첫 번째 실패하는 테스트 작성 (FR1)

**FR1: 투명 정보 추적** 기능부터 시작

#### 백엔드 테스트 작성
- `backend/tests/modules/tracking/productTracking.test.js`
- API 엔드포인트: `GET /api/products/:id/tracking`
- 예상 동작:
  - 상품 ID로 조회 시 생산자 수익 비율 반환
  - 농장 위치 정보 반환
  - 지도 시각화를 위한 좌표 데이터 반환

#### 프론트엔드 테스트 작성
- `frontend/src/pages/Product/ProductTracking.test.jsx`
- 컴포넌트 테스트:
  - '원두 스토리 추적' 탭 클릭 시 추적 정보 표시
  - 지도 컴포넌트 렌더링 확인

### Phase 3: 테스트 실행 및 실패 확인

```bash
# 백엔드 테스트 실행
cd backend
npm test

# 프론트엔드 테스트 실행
cd frontend
npm test
```

**예상 결과**: 모든 테스트가 실패 (아직 구현이 없으므로)

### Phase 4: 최소한의 구현으로 테스트 통과

1. **백엔드 구현**
   - 라우트 추가
   - 컨트롤러 생성
   - 모델 정의 (최소한)
   - 더미 데이터 반환

2. **프론트엔드 구현**
   - 컴포넌트 생성
   - API 호출 함수
   - 기본 UI 렌더링

### Phase 5: 리팩토링

- 코드 품질 개선
- 중복 제거
- 성능 최적화
- 테스트가 여전히 통과하는지 확인

## 📝 구현 우선순위

MVP 목표에 따라 다음 순서로 진행:

1. **FR1: 투명 정보 추적** (최우선)
   - 핵심 가치 제안의 기반
   - 상대적으로 단순한 기능

2. **FR3: 맞춤형 주문 시스템**
   - 검색 및 필터링 로직
   - 주문/결제 프로세스

3. **FR2: 윤리 영향 리포트**
   - 데이터 집계 및 계산
   - 리포트 생성

4. **FR5: 파트너 관리** (관리자 기능)
   - 정산 로직
   - 대시보드

5. **FR4: 블록체인 연동** (최후)
   - 기술 복잡도 높음
   - MVP에서는 최소 구현 또는 모의(Mock) 구현

## 🛠️ 테스트 작성 가이드

### 백엔드 테스트 예시

```javascript
// backend/tests/modules/tracking/productTracking.test.js
describe('Product Tracking API', () => {
  describe('GET /api/products/:id/tracking', () => {
    it('should return producer revenue ratio', async () => {
      const response = await request(app)
        .get('/api/products/1/tracking')
        .expect(200);
      
      expect(response.body).toHaveProperty('producerRevenueRatio');
      expect(response.body.producerRevenueRatio).toBeGreaterThan(0);
    });

    it('should return farm location for map visualization', async () => {
      const response = await request(app)
        .get('/api/products/1/tracking')
        .expect(200);
      
      expect(response.body).toHaveProperty('farmLocation');
      expect(response.body.farmLocation).toHaveProperty('latitude');
      expect(response.body.farmLocation).toHaveProperty('longitude');
    });
  });
});
```

### 프론트엔드 테스트 예시

```javascript
// frontend/src/pages/Product/ProductTracking.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ProductTracking from './ProductTracking';

describe('ProductTracking Component', () => {
  it('should display tracking information when tab is clicked', async () => {
    render(<ProductTracking productId={1} />);
    
    const tab = screen.getByText('원두 스토리 추적');
    fireEvent.click(tab);
    
    expect(await screen.findByText(/생산자 수익 비율/)).toBeInTheDocument();
  });

  it('should render map component with farm location', async () => {
    render(<ProductTracking productId={1} />);
    
    const tab = screen.getByText('원두 스토리 추적');
    fireEvent.click(tab);
    
    expect(await screen.findByTestId('farm-map')).toBeInTheDocument();
  });
});
```

## ✅ 체크리스트

각 기능 개발 시 다음을 확인:

- [ ] 실패하는 테스트 작성 완료
- [ ] 테스트 실행하여 실패 확인
- [ ] 최소한의 코드로 테스트 통과
- [ ] 리팩토링 완료
- [ ] 모든 테스트 통과 확인
- [ ] 코드 리뷰 (선택사항)

## 📚 참고 자료

- [Jest 공식 문서](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [TDD Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**작성일**: 2025-12-15

