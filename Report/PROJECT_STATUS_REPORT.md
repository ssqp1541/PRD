# 솔직한 한 잔 (Honest Cup) 프로젝트 진행 리포트

> 프로젝트 초기 설정 및 TDD 워크플로우 적용 현황

**작성일**: 2025-12-15  
**프로젝트 버전**: 1.0 (MVP)  
**현재 단계**: 초기 설정 완료, TDD Red 단계

---

## 📋 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [완료된 작업](#완료된-작업)
3. [프로젝트 구조](#프로젝트-구조)
4. [문서화 현황](#문서화-현황)
5. [테스트 현황](#테스트-현황)
6. [다음 단계](#다음-단계)

---

## 프로젝트 개요

### 프로젝트 정보

| 항목 | 내용 |
|------|------|
| **제품명** | 솔직한 한 잔 (Honest Cup) |
| **버전** | 1.0 (MVP) |
| **목표** | 투명하고 윤리적인 커피 소비를 위한 웹 애플리케이션 |
| **개발 방법론** | TDD (Test-Driven Development) |
| **현재 단계** | Red 단계 (실패하는 테스트 작성 완료) |

### 핵심 기능 (FR1-FR5)

1. **FR1**: 원두 투명 정보 추적 및 시각화 제공
2. **FR2**: 개인별 윤리 소비 지표 및 영향 리포트
3. **FR3**: 통합 원두 검색 및 맞춤형 주문 시스템
4. **FR4**: 공급망 데이터 검증 및 블록체인 연동 모듈
5. **FR5**: 파트너 관리 및 자동 정산 대시보드

---

## 완료된 작업

### 1. 프로젝트 초기 설정 ✅

- [x] Git 저장소 초기화
- [x] GitHub 브랜치 생성 (Coffee, TC)
- [x] 프로젝트 디렉토리 구조 생성
- [x] 기본 설정 파일 생성 (.gitignore, docker-compose.yml)

### 2. 문서화 작업 ✅

- [x] README.md 작성 (프로젝트 개요, 기능 명세, 프로젝트 구조)
- [x] 설치 및 실행 가이드 (docs/INSTALLATION.md)
- [x] TDD 워크플로우 가이드 (docs/TDD_WORKFLOW.md)
- [x] 테스트 실행 가이드 (docs/TEST_EXECUTION.md)
- [x] 테스트 커버리지 리포트 (docs/TEST_COVERAGE.md)

### 3. 프로젝트 구조 생성 ✅

#### 백엔드 구조
```
backend/
├── src/
│   ├── modules/          # 기능별 모듈
│   │   ├── auth/
│   │   ├── commerce/
│   │   ├── tracking/     # FR1 모듈
│   │   ├── partner/
│   │   └── admin/
│   ├── services/         # 비즈니스 로직 서비스
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   └── config/
└── tests/                # 테스트 코드
```

#### 프론트엔드 구조
```
frontend/
├── src/
│   ├── components/       # UI 컴포넌트
│   ├── pages/            # 페이지 컴포넌트
│   │   └── Product/      # FR1 페이지
│   ├── services/         # API 서비스
│   ├── hooks/
│   ├── store/
│   ├── utils/
│   └── styles/
└── public/
```

### 4. 테스트 환경 설정 ✅

#### 백엔드
- [x] Jest + Supertest 설치 설정
- [x] package.json 테스트 스크립트 추가
- [x] Jest 설정 파일 구성

#### 프론트엔드
- [x] Jest + React Testing Library 설치 설정
- [x] package.json 테스트 스크립트 추가
- [x] setupTests.js 파일 생성

### 5. TDD 워크플로우 적용 ✅

#### Red 단계 완료 (실패하는 테스트 작성)

**백엔드 테스트**:
- 파일: `backend/tests/modules/tracking/productTracking.test.js`
- 테스트 케이스: 5개
  - API 엔드포인트 테스트
  - 생산자 수익 비율 반환 검증
  - 농장 위치 정보 검증
  - 원산지 정보 검증
  - 404 에러 처리

**프론트엔드 테스트**:
- 파일: `frontend/src/pages/Product/__tests__/ProductTracking.test.jsx`
- 테스트 케이스: 5개
  - 컴포넌트 렌더링 테스트
  - 탭 클릭 동작 테스트
  - 지도 컴포넌트 테스트
  - 농장 위치 표시 테스트
  - 원산지 정보 표시 테스트

---

## 프로젝트 구조

### 전체 디렉토리 구조

```
Coffee/
├── frontend/                 # 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── components/       # 재사용 가능한 UI 컴포넌트
│   │   ├── pages/            # 페이지 컴포넌트
│   │   ├── services/         # API 서비스 레이어
│   │   ├── hooks/            # 커스텀 React Hooks
│   │   ├── utils/            # 유틸리티 함수
│   │   ├── store/            # 상태 관리
│   │   └── styles/           # 전역 스타일
│   └── package.json
│
├── backend/                  # 백엔드 애플리케이션
│   ├── src/
│   │   ├── modules/          # 기능별 모듈
│   │   ├── services/         # 비즈니스 로직 서비스
│   │   ├── controllers/      # 컨트롤러
│   │   ├── models/            # 데이터 모델
│   │   ├── middleware/       # 미들웨어
│   │   └── config/           # 설정 파일
│   ├── tests/                # 테스트 코드
│   └── package.json
│
├── database/                 # 데이터베이스 관련
│   ├── migrations/           # DB 마이그레이션 스크립트
│   ├── seeds/                # 시드 데이터
│   └── schemas/              # DB 스키마 정의
│
├── blockchain/               # 블록체인 관련
│   ├── contracts/            # 스마트 컨트랙트
│   └── integration/         # 블록체인 연동 코드
│
├── docs/                     # 문서
│   ├── api/                  # API 명세서
│   ├── design/               # 디자인 문서
│   ├── architecture/         # 아키텍처 문서
│   ├── INSTALLATION.md       # 설치 가이드
│   ├── TDD_WORKFLOW.md       # TDD 워크플로우
│   ├── TEST_EXECUTION.md     # 테스트 실행 가이드
│   └── TEST_COVERAGE.md      # 테스트 커버리지 리포트
│
├── Report/                   # 프로젝트 리포트
│   └── PROJECT_STATUS_REPORT.md
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## 문서화 현황

### 작성된 문서

| 문서명 | 위치 | 상태 | 설명 |
|--------|------|------|------|
| **README.md** | 루트 | ✅ 완료 | 프로젝트 개요, 기능 명세, 프로젝트 구조 |
| **INSTALLATION.md** | docs/ | ✅ 완료 | 설치 및 실행 가이드 |
| **TDD_WORKFLOW.md** | docs/ | ✅ 완료 | TDD 워크플로우 가이드 |
| **TEST_EXECUTION.md** | docs/ | ✅ 완료 | 테스트 실행 방법 |
| **TEST_COVERAGE.md** | docs/ | ✅ 완료 | 테스트 커버리지 현황 |
| **PRD.md** | docs/ | ✅ 완료 | 제품 요구사항 정의서 |

### 문서 커버리지

- ✅ 프로젝트 개요 및 비전
- ✅ 기능 명세 (FR1-FR5)
- ✅ 프로젝트 구조
- ✅ 설치 및 실행 방법
- ✅ 테스트 가이드
- ⚪ API 명세서 (예정)
- ⚪ 아키텍처 문서 (예정)
- ⚪ 디자인 문서 (예정)

---

## 테스트 현황

### 테스트 환경

#### 백엔드
- **프레임워크**: Jest + Supertest
- **설정 파일**: `backend/package.json` (Jest 설정 포함)
- **테스트 디렉토리**: `backend/tests/`

#### 프론트엔드
- **프레임워크**: Jest + React Testing Library
- **설정 파일**: `frontend/package.json` (Jest 설정 포함)
- **테스트 디렉토리**: `frontend/src/**/__tests__/`

### 작성된 테스트

#### FR1: 투명 정보 추적 기능

**백엔드 테스트** (`backend/tests/modules/tracking/productTracking.test.js`)
- ✅ `GET /api/products/:id/tracking` - 200 상태 코드
- ✅ 생산자 수익 비율 반환 검증
- ✅ 농장 위치 정보 반환 검증
- ✅ 원산지 정보 반환 검증
- ✅ 404 에러 처리

**프론트엔드 테스트** (`frontend/src/pages/Product/__tests__/ProductTracking.test.jsx`)
- ✅ '원두 스토리 추적' 탭 버튼 렌더링
- ✅ 탭 클릭 시 추적 정보 표시
- ✅ 지도 컴포넌트 렌더링
- ✅ 농장 위치 좌표 표시
- ✅ 원산지 정보 표시

### 테스트 커버리지

| 모듈 | 테스트 작성 | 구현 상태 | 커버리지 |
|------|------------|----------|----------|
| **FR1: 투명 정보 추적** | ✅ 완료 | ⚪ 미구현 | 0% (의도적) |
| **FR2: 윤리 영향 리포트** | ⚪ 미작성 | ⚪ 미구현 | - |
| **FR3: 맞춤형 주문 시스템** | ⚪ 미작성 | ⚪ 미구현 | - |
| **FR4: 데이터 검증** | ⚪ 미작성 | ⚪ 미구현 | - |
| **FR5: 파트너 관리** | ⚪ 미작성 | ⚪ 미구현 | - |

**현재 상태**: Red 단계 (TDD) - 실패하는 테스트 작성 완료

---

## Git 저장소 현황

### 브랜치

- **Coffee**: 메인 개발 브랜치
- **TC**: 테스트 관련 브랜치

### 주요 커밋

1. `readme 파일생성` - README.md 초기 작성
2. `프로젝트 구조 추가` - 프로젝트 디렉토리 구조 생성
3. `프로젝트 구조 생성` - 전체 프로젝트 구조 생성
4. `Install 방법` - 설치 가이드 문서 추가

---

## 다음 단계

### 즉시 진행 가능한 작업

1. **의존성 설치**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **테스트 실행 및 실패 확인** (Red 단계 완료 확인)
   ```bash
   cd backend && npm test
   cd ../frontend && npm test
   ```

3. **Green 단계: 최소한의 구현**
   - 백엔드: Express 앱 및 API 엔드포인트 구현
   - 프론트엔드: ProductTracking 컴포넌트 구현
   - 테스트 통과 확인

4. **Refactor 단계: 코드 개선**
   - 코드 품질 개선
   - 중복 제거
   - 성능 최적화

### 중기 작업 (1-2주)

1. **FR2 테스트 작성 및 구현**
   - 윤리 영향 리포트 기능
   - 탄소 발자국 계산 로직

2. **FR3 테스트 작성 및 구현**
   - 원두 검색 및 필터링
   - 주문/결제 프로세스

3. **데이터베이스 스키마 설계**
   - 마이그레이션 파일 작성
   - 시드 데이터 생성

### 장기 작업 (1-3개월)

1. **FR4, FR5 구현**
2. **블록체인 연동** (FR4)
3. **파트너 대시보드** (FR5)
4. **E2E 테스트 작성**
5. **CI/CD 파이프라인 구축**

---

## 리스크 및 이슈

### 현재 리스크

1. **의존성 설치 필요**
   - npm install 실행 필요
   - PowerShell 실행 정책 이슈 가능성

2. **구현 코드 부재**
   - 현재 테스트만 작성됨
   - Green 단계 진행 필요

3. **데이터베이스 미설정**
   - PostgreSQL 스키마 미정의
   - 마이그레이션 파일 미작성

### 완화 전략

- 단계별 구현으로 리스크 최소화
- TDD 워크플로우로 안정적인 개발
- 문서화를 통한 명확한 가이드 제공

---

## 성과 요약

### 완료된 작업

- ✅ 프로젝트 초기 설정 완료
- ✅ 전체 프로젝트 구조 생성
- ✅ 문서화 완료 (6개 문서)
- ✅ 테스트 환경 설정 완료
- ✅ FR1 기능 테스트 작성 완료 (10개 테스트 케이스)

### 통계

- **작성된 문서**: 6개
- **생성된 디렉토리**: 30+ 개
- **작성된 테스트 파일**: 2개
- **테스트 케이스**: 10개
- **Git 커밋**: 4개

---

## 결론

프로젝트 초기 설정 및 TDD 워크플로우 적용이 성공적으로 완료되었습니다. 현재 Red 단계에서 실패하는 테스트가 작성되었으며, 다음 단계인 Green 단계(최소 구현)로 진행할 준비가 되었습니다.

프로젝트는 체계적인 구조와 명확한 문서화를 바탕으로 안정적으로 진행되고 있으며, TDD 방법론을 통해 품질 높은 코드 개발이 가능한 환경이 구축되었습니다.

---

**리포트 작성일**: 2025-12-15  
**다음 리뷰 예정일**: Green 단계 완료 후


