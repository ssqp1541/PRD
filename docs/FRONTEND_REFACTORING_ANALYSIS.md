# 프런트엔드 코드 리팩토링 분석 보고서

## 📋 개요
프런트엔드 코드베이스를 분석하여 발견된 코드 스멜과 개선점을 정리한 문서입니다.

---

## 🔴 심각한 코드 스멜 (High Priority)

### 1. **중복된 반응형 로직 (DRY 위반)**
**위치**: `Header.jsx`, `ProductSearch.jsx`, `ProductList.jsx`, `Footer.jsx`

**문제점**:
- 동일한 반응형 감지 로직이 여러 컴포넌트에 중복됨
- `window.innerWidth <= 768` 체크가 반복됨
- 이벤트 리스너 등록/해제 로직이 중복됨

**예시 코드**:
```javascript
// Header.jsx, ProductSearch.jsx, ProductList.jsx, Footer.jsx 모두에 동일한 코드
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setIsMobileMenuOpen(false); // Header에만 있음
    }
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**개선 방안**:
- 커스텀 훅 `useMediaQuery` 또는 `useResponsive` 생성
- `hooks/useResponsive.js` 파일 생성

---

### 2. **인라인 스타일 남용**
**위치**: 모든 컴포넌트

**문제점**:
- 모든 컴포넌트가 인라인 스타일 객체를 사용
- 스타일 재사용 불가
- 테마 관리 불가
- CSS-in-JS나 별도 CSS 파일로 분리 필요

**개선 방안**:
- CSS Modules 도입
- 또는 styled-components 같은 CSS-in-JS 라이브러리 사용
- 공통 스타일을 별도 파일로 분리

---

### 3. **API 토큰 관리 불일치**
**위치**: `services/api/partnerApi.js`

**문제점**:
- `partnerApi.js`에서 `localStorage.getItem('token')` 직접 사용
- 다른 API 파일들은 `authApi`의 `getToken()` 사용
- 토큰 키가 하드코딩됨 (`'token'` vs `'honest_cup_token'`)

**예시 코드**:
```javascript
// partnerApi.js - 잘못된 방식
headers: {
  Authorization: `Bearer ${localStorage.getItem('token')}`, // ❌
}

// authApi.js - 올바른 방식
const token = getToken(); // ✅
```

**개선 방안**:
- `partnerApi.js`에서 `getToken()` 함수 사용
- 또는 axios 인터셉터가 자동으로 처리하도록 수정

---

### 4. **에러 처리 패턴 불일치**
**위치**: 여러 컴포넌트

**문제점**:
- 에러 처리 방식이 컴포넌트마다 다름
- 일부는 `ErrorMessage` 컴포넌트 사용, 일부는 인라인 스타일
- 에러 메시지 형식이 일관되지 않음

**예시**:
- `SettlementReport.jsx`: `ErrorMessage` 컴포넌트 사용 ✅
- `ProductSearch.jsx`: 인라인 스타일로 에러 표시 ❌
- `EthicalImpact.jsx`: 인라인 스타일로 에러 표시 ❌

**개선 방안**:
- 모든 에러 표시를 `ErrorMessage` 컴포넌트로 통일
- 에러 처리 로직을 커스텀 훅으로 추출 (`useErrorHandler`)

---

### 5. **ProtectedRoute 로딩 상태 처리**
**위치**: `components/common/ProtectedRoute.jsx`

**문제점**:
- 로딩 상태를 단순 텍스트로 표시
- `LoadingSpinner` 컴포넌트가 있지만 사용하지 않음

**현재 코드**:
```javascript
if (isLoading) {
  return <div>로딩 중...</div>; // ❌
}
```

**개선 방안**:
```javascript
if (isLoading) {
  return <LoadingSpinner fullScreen message="인증 확인 중..." />; // ✅
}
```

---

## 🟡 중간 우선순위 코드 스멜 (Medium Priority)

### 6. **useEffect 의존성 배열 누락 가능성**
**위치**: `EthicalImpact.jsx`, `ProductTracking.jsx`

**문제점**:
- `useEffect` 내부에서 함수를 호출하지만 의존성 배열에 포함되지 않음
- ESLint 경고 발생 가능

**예시**:
```javascript
// EthicalImpact.jsx
useEffect(() => {
  if (userId) {
    loadEthicalImpact(); // loadEthicalImpact가 의존성 배열에 없음
  }
}, [userId]); // loadEthicalImpact 누락
```

**개선 방안**:
- `useCallback`으로 함수 메모이제이션
- 또는 함수를 `useEffect` 내부로 이동

---

### 7. **커스텀 훅 미사용**
**위치**: `hooks/` 폴더가 비어있음

**문제점**:
- 공통 로직을 커스텀 훅으로 추출하지 않음
- 반복되는 패턴이 여러 컴포넌트에 중복

**추출 가능한 훅**:
- `useResponsive` - 반응형 감지
- `useErrorHandler` - 에러 처리
- `useAsync` - 비동기 데이터 로딩
- `useAuth` - 이미 있지만 추가 기능 필요

---

### 8. **하드코딩된 값들**
**위치**: 여러 컴포넌트

**문제점**:
- 매직 넘버/문자열이 하드코딩됨
- 브레이크포인트 값 (`768`, `1024`)이 여러 곳에 분산

**예시**:
```javascript
window.innerWidth <= 768 // 여러 곳에 반복
window.innerWidth <= 1024 // ProductList.jsx
```

**개선 방안**:
- 상수 파일 생성 (`constants/breakpoints.js`)
- 테마 파일 생성 (`constants/theme.js`)

---

### 9. **컴포넌트 props 타입 검증 없음**
**위치**: 모든 컴포넌트

**문제점**:
- PropTypes 또는 TypeScript 미사용
- 런타임 에러 발생 가능성 증가

**개선 방안**:
- PropTypes 도입
- 또는 TypeScript로 마이그레이션

---

### 10. **불필요한 리렌더링 가능성**
**위치**: 여러 컴포넌트

**문제점**:
- `React.memo` 미사용
- 인라인 함수/객체로 인한 리렌더링

**예시**:
```javascript
// ProductList.jsx
onClick={() => onProductClick && onProductClick(product)} // 인라인 함수
```

**개선 방안**:
- `React.memo`로 컴포넌트 메모이제이션
- `useCallback`으로 함수 메모이제이션
- `useMemo`로 객체/배열 메모이제이션

---

## 🟢 낮은 우선순위 개선점 (Low Priority)

### 11. **접근성 (A11y) 개선 필요**
**위치**: 여러 컴포넌트

**문제점**:
- 일부 버튼에 `aria-label` 누락
- 키보드 네비게이션 고려 부족
- 포커스 관리 미흡

**개선 방안**:
- 모든 인터랙티브 요소에 적절한 ARIA 속성 추가
- 키보드 네비게이션 테스트

---

### 12. **코드 주석 및 문서화**
**위치**: 일부 컴포넌트

**문제점**:
- JSDoc 주석이 일부 컴포넌트에만 있음
- 복잡한 로직에 설명 부족

**개선 방안**:
- 모든 컴포넌트와 함수에 JSDoc 주석 추가
- 복잡한 비즈니스 로직에 상세 설명

---

### 13. **환경 변수 관리**
**위치**: `config/api.js`

**문제점**:
- 환경 변수 기본값이 하드코딩됨
- `.env` 파일 사용 권장

**개선 방안**:
- `.env.example` 파일 생성
- 환경 변수 문서화

---

### 14. **테스트 커버리지**
**위치**: 일부 컴포넌트

**문제점**:
- 일부 컴포넌트에 테스트 파일 없음
- 테스트 커버리지 불충분

**개선 방안**:
- 누락된 컴포넌트 테스트 추가
- 테스트 커버리지 목표 설정 (80% 이상)

---

## 📊 우선순위별 개선 계획

### Phase 1: 긴급 수정 (1주)
1. ✅ API 토큰 관리 통일 (`partnerApi.js` 수정)
2. ✅ ProtectedRoute 로딩 상태 개선
3. ✅ 에러 처리 패턴 통일

### Phase 2: 중요 개선 (2-3주)
4. ✅ 반응형 로직 커스텀 훅 추출
5. ✅ 공통 로직 커스텀 훅화
6. ✅ 상수 파일 생성 (브레이크포인트, 테마)
7. ✅ useEffect 의존성 배열 수정

### Phase 3: 장기 개선 (1-2개월)
8. ✅ CSS-in-JS 또는 CSS Modules 도입
9. ✅ PropTypes 또는 TypeScript 도입
10. ✅ 성능 최적화 (메모이제이션)
11. ✅ 접근성 개선
12. ✅ 테스트 커버리지 향상

---

## 🛠️ 구체적인 리팩토링 예시

### 예시 1: 반응형 로직 커스텀 훅

**Before**:
```javascript
// Header.jsx
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**After**:
```javascript
// hooks/useResponsive.js
import { useState, useEffect } from 'react';

export function useResponsive(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

// Header.jsx
import { useResponsive } from '../../hooks/useResponsive';

function Header() {
  const isMobile = useResponsive(768);
  // ...
}
```

---

### 예시 2: API 토큰 관리 통일

**Before**:
```javascript
// partnerApi.js
export const getSettlement = async (startDate, endDate) => {
  const response = await axios.get(`${API_BASE_URL}/api/partner/settlement`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // ❌
    },
  });
};
```

**After**:
```javascript
// partnerApi.js
import { getToken } from './authApi';

export const getSettlement = async (startDate, endDate) => {
  // axios 인터셉터가 자동으로 처리하므로 헤더 제거 가능
  const response = await axios.get(`${API_BASE_URL}/api/partner/settlement`, {
    params: { startDate, endDate },
    // Authorization 헤더는 인터셉터가 자동 추가
  });
};
```

---

### 예시 3: 에러 처리 통일

**Before**:
```javascript
// ProductSearch.jsx
{error && (
  <div style={styles.error}>
    <p>{error}</p>
  </div>
)}
```

**After**:
```javascript
// ProductSearch.jsx
import ErrorMessage from '../../components/common/ErrorMessage';

{error && (
  <ErrorMessage
    message={error}
    type="error"
    onClose={() => setError(null)}
  />
)}
```

---

## 📝 체크리스트

### 즉시 수정 필요
- [ ] `partnerApi.js`에서 토큰 관리 방식 수정
- [ ] `ProtectedRoute.jsx`에서 `LoadingSpinner` 사용
- [ ] 모든 에러 표시를 `ErrorMessage` 컴포넌트로 통일

### 단기 개선
- [ ] `useResponsive` 커스텀 훅 생성
- [ ] `useErrorHandler` 커스텀 훅 생성
- [ ] `useAsync` 커스텀 훅 생성
- [ ] 상수 파일 생성 (`constants/breakpoints.js`, `constants/theme.js`)
- [ ] `useEffect` 의존성 배열 수정

### 장기 개선
- [ ] CSS-in-JS 또는 CSS Modules 도입
- [ ] PropTypes 또는 TypeScript 도입
- [ ] 성능 최적화 (메모이제이션)
- [ ] 접근성 개선
- [ ] 테스트 커버리지 향상

---

## 📚 참고 자료

- [React Best Practices](https://react.dev/learn)
- [Custom Hooks Guide](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Performance Optimization](https://react.dev/learn/render-and-commit)

---

**작성일**: 2024년
**분석 대상**: `frontend/src/` 디렉토리 전체
**분석 파일 수**: 30개 이상의 React 컴포넌트 및 유틸리티 파일

