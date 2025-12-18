# Express/React 기본 구조 최소 단위 구현 시나리오

> 애플리케이션 실행을 위한 최소한의 기본 구조 구현 계획

**작성일**: 2025-12-15  
**목표**: 애플리케이션 실행 및 확장을 위한 기본 구조 구축  
**현재 상태**: 인증 시스템 구현으로 일부 구조는 이미 존재

---

## 📋 목차

1. [시나리오 개요](#시나리오-개요)
2. [현재 상태 분석](#현재-상태-분석)
3. [백엔드 구현 계획](#백엔드-구현-계획)
4. [프론트엔드 구현 계획](#프론트엔드-구현-계획)
5. [서버 실행 설정](#서버-실행-설정)
6. [승인 요청](#승인-요청)

---

## 시나리오 개요

### 목표

애플리케이션을 실행하고 확장 가능한 기본 구조를 구축합니다.

### 구현 원칙

1. **최소 기능만 구현**: 애플리케이션 실행에 필요한 최소한의 구조만
2. **확장 가능한 구조**: 향후 기능 추가가 용이하도록 모듈화
3. **표준 패턴 준수**: Express와 React의 표준 패턴 사용
4. **환경 설정**: 개발/프로덕션 환경 분리

### 구현 범위

#### ✅ 포함 사항
- Express 서버 설정 완성 (서버 실행 파일 추가)
- 라우팅 구조 정리 (모듈별 라우트 분리)
- 미들웨어 설정 강화 (로깅, 에러 처리)
- React 앱 초기화 (index.js, index.html)
- 라우팅 설정 완성 (모든 페이지 라우트)
- 상태 관리 기본 구조 (Context API)

#### ⚪ 제외 사항 (향후 구현)
- Redux/Zustand 등 고급 상태 관리
- 서버 사이드 렌더링 (SSR)
- 웹소켓 통신
- 실시간 업데이트

---

## 현재 상태 분석

### 백엔드 현재 상태

✅ **이미 구현됨**:
- `backend/src/app.js` - Express 앱 기본 설정
- `backend/src/modules/auth/authRoutes.js` - 인증 라우트
- 기본 미들웨어 (CORS, JSON 파싱)
- 에러 핸들러

❌ **추가 필요**:
- 서버 실행 파일 (`server.js` 또는 `index.js`)
- 라우팅 구조 정리 (모듈별 라우트 통합)
- 로깅 미들웨어
- 환경별 설정 분리

### 프론트엔드 현재 상태

✅ **이미 구현됨**:
- `frontend/src/App.jsx` - 메인 App 컴포넌트
- React Router 설정
- 인증 컨텍스트 (상태 관리)
- 기본 라우트 (로그인, 회원가입, 홈)

❌ **추가 필요**:
- React 앱 진입점 (`index.js`)
- HTML 템플릿 (`index.html`)
- 모든 페이지 라우트 추가 (홈, 상품, 주문, 마이페이지 등)
- 공통 레이아웃 컴포넌트

---

## 백엔드 구현 계획

### 1. 프로젝트 구조

```
backend/
├── src/
│   ├── app.js                 # Express 앱 설정 (이미 존재)
│   ├── server.js              # 서버 실행 파일 (신규)
│   ├── config/
│   │   └── index.js          # 환경 설정 (신규)
│   ├── middleware/
│   │   ├── logger.js         # 로깅 미들웨어 (신규)
│   │   └── errorHandler.js   # 에러 핸들러 (개선)
│   └── routes/
│       └── index.js          # 라우트 통합 파일 (신규)
```

### 2. 구현 파일 상세

#### 2.1 서버 실행 파일 (`src/server.js`)

**기능**:
- Express 앱 실행
- 포트 설정
- 환경 변수 로드
- 데이터베이스 연결 확인

**구현 내용**:
```javascript
- dotenv 설정
- app.js import
- 포트 설정 (환경 변수 또는 기본값 3000)
- 서버 시작
- 에러 핸들링
```

#### 2.2 환경 설정 (`src/config/index.js`)

**기능**:
- 환경별 설정 관리
- 데이터베이스 설정
- 서버 설정

**구현 내용**:
```javascript
- 개발/프로덕션 환경 분리
- 데이터베이스 연결 정보
- 서버 포트 설정
- JWT 설정
```

#### 2.3 로깅 미들웨어 (`src/middleware/logger.js`)

**기능**:
- HTTP 요청 로깅
- 에러 로깅
- 개발 환경에서 상세 로그

**구현 내용**:
```javascript
- 요청 메서드, URL, 상태 코드 로깅
- 응답 시간 측정
- 에러 로깅
```

#### 2.4 라우트 통합 파일 (`src/routes/index.js`)

**기능**:
- 모든 모듈 라우트 통합
- API 버전 관리
- 라우트 그룹화

**구현 내용**:
```javascript
- 인증 라우트 통합
- 향후 추가될 라우트를 위한 구조
- API 버전 관리 (/api/v1)
```

#### 2.5 app.js 개선

**개선 사항**:
- 로깅 미들웨어 추가
- 라우트 통합 파일 사용
- 환경별 설정 적용

---

## 프론트엔드 구현 계획

### 1. 프로젝트 구조

```
frontend/
├── public/
│   └── index.html            # HTML 템플릿 (신규)
├── src/
│   ├── index.js              # React 진입점 (신규)
│   ├── App.jsx               # 메인 App (이미 존재, 개선)
│   ├── components/
│   │   └── layout/
│   │       ├── Header.jsx    # 헤더 컴포넌트 (신규)
│   │       ├── Footer.jsx   # 푸터 컴포넌트 (신규)
│   │       └── Layout.jsx    # 레이아웃 컴포넌트 (신규)
│   └── pages/
│       ├── Home/
│       │   └── Home.jsx      # 홈 페이지 (개선)
│       ├── Product/
│       │   └── ProductList.jsx # 상품 목록 페이지 (신규)
│       ├── Order/
│       │   └── Order.jsx     # 주문 페이지 (신규)
│       └── MyPage/
│           └── MyPage.jsx    # 마이페이지 (신규)
```

### 2. 구현 파일 상세

#### 2.1 React 진입점 (`src/index.js`)

**기능**:
- React 앱 초기화
- ReactDOM 렌더링
- App 컴포넌트 마운트

**구현 내용**:
```javascript
- React, ReactDOM import
- App 컴포넌트 import
- ReactDOM.render 또는 createRoot
- 기본 에러 바운더리 (선택사항)
```

#### 2.2 HTML 템플릿 (`public/index.html`)

**기능**:
- React 앱 마운트 지점
- 메타 태그 설정
- 기본 스타일

**구현 내용**:
```html
- 기본 HTML 구조
- React 앱 마운트 div (#root)
- 메타 태그 (charset, viewport)
- 타이틀 설정
```

#### 2.3 레이아웃 컴포넌트 (`components/layout/`)

**Header.jsx**:
- 네비게이션 메뉴
- 로그인/로그아웃 버튼
- 사용자 정보 표시

**Footer.jsx**:
- 푸터 정보
- 저작권 표시

**Layout.jsx**:
- Header, Footer 포함
- 자식 컴포넌트 렌더링

#### 2.4 페이지 컴포넌트

**Home.jsx** (개선):
- 기본 홈 페이지
- 레이아웃 적용

**ProductList.jsx** (신규):
- 상품 목록 표시 (임시)
- 향후 FR1, FR3 구현을 위한 구조

**Order.jsx** (신규):
- 주문 페이지 (임시)
- 향후 FR3 구현을 위한 구조

**MyPage.jsx** (신규):
- 마이페이지 (임시)
- 향후 FR2 구현을 위한 구조

#### 2.5 App.jsx 개선

**개선 사항**:
- 모든 페이지 라우트 추가
- 레이아웃 적용
- 공통 라우트 구조

---

## 서버 실행 설정

### 백엔드 실행

**package.json 스크립트 추가**:
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest"
  }
}
```

**실행 방법**:
```bash
# 개발 환경
npm run dev

# 프로덕션 환경
npm start
```

### 프론트엔드 실행

**package.json 스크립트 추가**:
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "jest"
  }
}
```

**실행 방법**:
```bash
# 개발 환경
npm start

# 빌드
npm run build
```

---

## 구현 파일 목록

### 백엔드 파일 (5개)

1. `backend/src/server.js` - 서버 실행 파일 (신규)
2. `backend/src/config/index.js` - 환경 설정 (신규)
3. `backend/src/middleware/logger.js` - 로깅 미들웨어 (신규)
4. `backend/src/routes/index.js` - 라우트 통합 파일 (신규)
5. `backend/src/app.js` - Express 앱 설정 (개선)

### 프론트엔드 파일 (8개)

1. `frontend/public/index.html` - HTML 템플릿 (신규)
2. `frontend/src/index.js` - React 진입점 (신규)
3. `frontend/src/components/layout/Header.jsx` - 헤더 컴포넌트 (신규)
4. `frontend/src/components/layout/Footer.jsx` - 푸터 컴포넌트 (신규)
5. `frontend/src/components/layout/Layout.jsx` - 레이아웃 컴포넌트 (신규)
6. `frontend/src/pages/Home/Home.jsx` - 홈 페이지 (개선)
7. `frontend/src/pages/Product/ProductList.jsx` - 상품 목록 페이지 (신규)
8. `frontend/src/pages/Order/Order.jsx` - 주문 페이지 (신규)
9. `frontend/src/pages/MyPage/MyPage.jsx` - 마이페이지 (신규)
10. `frontend/src/App.jsx` - 메인 App 컴포넌트 (개선)

### 설정 파일 (2개)

1. `backend/package.json` - 스크립트 추가
2. `frontend/package.json` - 스크립트 추가

---

## 예상 결과

### 생성될 파일
- **백엔드**: 5개 파일 (신규 4개, 개선 1개)
- **프론트엔드**: 10개 파일 (신규 9개, 개선 1개)
- **설정 파일**: 2개
- **총 17개 파일**

### 기능
- ✅ Express 서버 실행 가능
- ✅ React 앱 실행 가능
- ✅ 모든 페이지 라우트 설정
- ✅ 공통 레이아웃 적용
- ✅ 로깅 및 에러 처리
- ✅ 환경별 설정 분리

---

## 승인 요청

### 구현 계획 요약

1. **백엔드 기본 구조** (5개 파일)
   - 서버 실행 파일 생성
   - 환경 설정 파일 생성
   - 로깅 미들웨어 추가
   - 라우트 통합 파일 생성
   - app.js 개선

2. **프론트엔드 기본 구조** (10개 파일)
   - React 진입점 및 HTML 템플릿 생성
   - 레이아웃 컴포넌트 생성 (Header, Footer, Layout)
   - 모든 페이지 컴포넌트 생성
   - App.jsx 개선 (모든 라우트 추가)

3. **서버 실행 설정**
   - package.json 스크립트 추가

### 예상 소요 시간

- 백엔드 구현: 1-2시간
- 프론트엔드 구현: 2-3시간
- 테스트 및 디버깅: 1시간
- **총 4-6시간** (0.5-1일)

### 승인 여부

다음 작업을 진행하시겠습니까?

- [ ] ✅ **승인** - Express/React 기본 구조 구현 시작
- [ ] ⏸️ **보류** - 추가 검토 필요
- [ ] ✏️ **수정 요청** - 시나리오 변경 필요

**승인 시 진행할 작업**:
1. 백엔드 서버 실행 파일 및 설정 파일 생성
2. 백엔드 로깅 미들웨어 및 라우트 통합 파일 생성
3. 프론트엔드 React 진입점 및 HTML 템플릿 생성
4. 프론트엔드 레이아웃 컴포넌트 생성
5. 프론트엔드 모든 페이지 컴포넌트 생성
6. App.jsx 개선 (모든 라우트 추가)
7. package.json 스크립트 추가

---

**작성일**: 2025-12-15  
**승인 대기 중**

