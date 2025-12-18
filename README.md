# 솔직한 한 잔 (Honest Cup)

> 투명하고 윤리적인 커피 소비를 위한 웹 애플리케이션

## 📋 프로젝트 정보

| 항목 | 내용 |
|------|------|
| **제품명** | 솔직한 한 잔 (Honest Cup) |
| **버전** | 1.0 (MVP) |
| **작성일** | 2025-12-15 |
| **상태** | Draft |
| **릴리즈 범위** | MVP (3개월) |

## 🎯 Executive Summary

'솔직한 한 잔'은 윤리적 소비에 관심 있는 일반 소비자를 위한 투명한 커피 주문 웹 앱입니다. 소비자가 구매하는 원두가 어떤 농장에서, 어떤 방식으로 재배되었는지, 그리고 공정한 대가가 생산자에게 돌아갔는지에 대한 솔직하고 쉬운 정보를 바로 확인할 수 없는 문제를 해결합니다.

**핵심 가치:**
- 블록체인 기반의 투명한 유통 정보 추적
- 개인의 윤리적 기여도 정량화
- 소비자의 '착한 소비' 신념 충족

## 🎯 목표 및 성공 지표

### 비전 및 미션

- **비전**: 커피 시장에서 투명하고 윤리적인 소비의 표준을 제시합니다.
- **MVP 목표**: 핵심 기능을 구현하고, 윤리적 가치 제공에 대한 사용자 만족도(PMF)를 검증합니다.

### 핵심 성공 지표 (KPI)

| 지표 (KPI) | 목표치 | 측정 이유 |
|-----------|--------|----------|
| **NPS (Net Promoter Score)** | 30 이상 | 서비스의 핵심 가치(투명성)에 대한 고객 만족도 확인 |
| **주 3회 이상 사용률** | 60% 이상 | 서비스가 습관적인 소비 루틴에 통합되었는지 확인 |
| **윤리 정보 조회율** | 상품 페이지 방문자의 80% 이상 | 서비스의 핵심 기능(FR1) 사용률 및 가치 증명 |
| **Payback Period** | 2개월 이내 | (향후) 고객 획득 비용 대비 수익성 확보 가능성 검증 |

## 👥 사용자 & 페르소나

### 타깃 사용자

**Primary Persona**: 착한 소비를 하고 싶은 일반 소비자 (윤리적 소비에 높은 지불 의사를 가진 사용자)

**해결하는 문제 (Pain Point)**: 
내가 마시는 커피 원두가 윤리적인지 확인하기 위한 솔직하고 쉬운 정보를 바로 찾기 어려워, 내 신념에 맞는 커피를 선택하는 데 어려움을 겪음

### 핵심 가치 제안 (Value Proposition)

1. **투명성**: QR 코드/블록체인 기반의 생산자 수익 비율, 환경 영향 정보를 손쉽게 제공합니다
2. **보상**: 개인의 커피 소비가 환경에 미치는 긍정적 영향을 **'탄소 발자국 절감량'**으로 정량화하여 보여줍니다

## 📖 사용자 스토리 (Gherkin Format)

### FR1: 투명 정보 추적

```
Given 고객이 특정 원두 상세 페이지에 접속했을 때
When 고객이 '원두 스토리 추적' 탭을 클릭하면
Then 생산자에게 돌아간 수익 비율 및 원산지 농장의 위치가 지도로 시각화되어 표시되어야 한다.
```

### FR2: 윤리 영향 리포트

```
Given 고객이 3개월간 친환경 원두만 구매한 기록이 있을 때
When 고객이 마이페이지의 '나의 윤리적 영향' 섹션을 클릭하면
Then '누적 커피 탄소 발자국 절감량' 수치와 함께, 긍정적인 메시지가 표시되어야 한다.
```

### FR3: 맞춤형 주문 시스템

```
Given 고객이 원두 검색 페이지에 접속했을 때
When 고객이 필터 조건으로 '여성 생산자 커피'와 '친환경 포장재 사용'을 모두 선택하고 검색하면
Then 두 가지 기준을 모두 충족하는 원두 상품만 표시되어야 한다.
```

### FR4: 데이터 검증 (관리)

```
Given 파트너가 원두 배치(Batch)의 핵심 데이터를 등록하고 관리자에게 승인 요청했을 때
When 관리자가 관리자 대시보드에서 데이터를 검토하고 '승인' 버튼을 클릭하면
Then 해당 데이터는 즉시 변조 불가능한 분산원장(블록체인)에 기록되어야 한다.
```

### FR5: 파트너 관리 (관리)

```
Given 입점 로스터리 관리자가 파트너 전용 대시보드에 접속했을 때
When 관리자가 '정산 보고서' 탭을 선택하고 기간을 설정하면
Then 총 판매액, 플랫폼 수수료, 최종 정산 예정 금액이 명확하게 표시되어야 한다.
```

## ⚙️ 기능 명세

위에 정의된 사용자 스토리를 지원하는 5가지 핵심 기능입니다.

1. **원두 투명 정보 추적 및 시각화 제공 (FR1)**: 생산자 수익률, 농장 위치 등 핵심 윤리 정보를 시각적으로 제공합니다.
2. **개인별 윤리 소비 지표 및 영향 리포트 (FR2)**: 개인의 탄소 발자국 및 윤리적 기여도를 측정하고 리포트합니다.
3. **통합 원두 검색 및 맞춤형 주문 시스템 (FR3)**: 윤리적 필터(여성 생산자, 친환경 등)를 포함한 검색 및 주문/결제 프로세스를 제공합니다.
4. **공급망 데이터 검증 및 블록체인 연동 모듈 (FR4)**: 파트너 데이터의 신뢰성을 확보하고 블록체인에 기록하는 관리 시스템입니다.
5. **파트너 관리 및 자동 정산 대시보드 (FR5)**: 입점 파트너를 위한 상품/재고 관리 및 판매/정산 보고서 기능을 제공합니다.

## 📁 프로젝트 구조

```
Coffee/
├── frontend/                 # 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── components/       # 재사용 가능한 UI 컴포넌트
│   │   │   ├── common/       # 공통 컴포넌트 (Button, Input 등)
│   │   │   ├── product/      # 상품 관련 컴포넌트
│   │   │   └── tracking/     # 추적 정보 시각화 컴포넌트
│   │   ├── pages/            # 페이지 컴포넌트
│   │   │   ├── Home/         # 메인 페이지
│   │   │   ├── Product/      # 상품 목록/상세 페이지
│   │   │   ├── Order/        # 주문/결제 페이지
│   │   │   ├── MyPage/       # 마이페이지 (윤리 영향 리포트 포함)
│   │   │   ├── Partner/      # 파트너 대시보드
│   │   │   └── Admin/        # 관리자 대시보드
│   │   ├── services/         # API 서비스 레이어
│   │   │   ├── api/          # API 클라이언트
│   │   │   ├── auth/         # 인증 서비스
│   │   │   └── blockchain/   # 블록체인 연동 서비스
│   │   ├── hooks/            # 커스텀 React Hooks
│   │   ├── utils/            # 유틸리티 함수
│   │   ├── store/            # 상태 관리 (Redux/Zustand 등)
│   │   └── styles/           # 전역 스타일
│   ├── public/               # 정적 파일
│   └── package.json
│
├── backend/                  # 백엔드 애플리케이션
│   ├── src/
│   │   ├── modules/          # 기능별 모듈 (확장성 고려)
│   │   │   ├── auth/         # 인증 모듈
│   │   │   ├── commerce/     # 커머스 모듈 (주문/결제)
│   │   │   ├── tracking/     # 윤리 정보 추적 모듈
│   │   │   ├── partner/      # 파트너 관리 모듈
│   │   │   └── admin/        # 관리자 모듈
│   │   ├── services/         # 비즈니스 로직 서비스
│   │   │   ├── blockchain/   # 블록체인 연동 서비스
│   │   │   ├── carbon/       # 탄소 발자국 계산 서비스
│   │   │   └── payment/      # 결제 서비스
│   │   ├── models/           # 데이터 모델
│   │   ├── controllers/      # 컨트롤러
│   │   ├── middleware/       # 미들웨어 (인증, 검증 등)
│   │   ├── utils/            # 유틸리티 함수
│   │   └── config/           # 설정 파일
│   ├── tests/                # 테스트 코드
│   └── package.json
│
├── database/                 # 데이터베이스 관련
│   ├── migrations/           # DB 마이그레이션 스크립트
│   ├── seeds/                # 시드 데이터
│   └── schemas/              # DB 스키마 정의
│
├── blockchain/               # 블록체인 관련 (선택적)
│   ├── contracts/            # 스마트 컨트랙트
│   └── integration/          # 블록체인 연동 코드
│
├── docs/                     # 문서
│   ├── api/                  # API 명세서
│   ├── design/               # 디자인 문서
│   └── architecture/         # 아키텍처 문서
│
├── .gitignore
├── README.md
└── docker-compose.yml        # 개발 환경 설정 (선택적)
```

### 주요 디렉토리 설명

- **frontend/**: 사용자 인터페이스 및 프론트엔드 로직
- **backend/**: 서버 사이드 로직 및 API
- **database/**: 데이터베이스 스키마 및 마이그레이션
- **blockchain/**: 블록체인 연동 모듈 (FR4)
- **docs/**: 프로젝트 문서

### 모듈 분리 전략

확장성 고려사항에 따라 핵심 기능 모듈은 독립적인 서비스 계층으로 분리되어 있어, 향후 마이크로서비스 전환에 용이합니다:

- **커머스 모듈**: 주문/결제 처리
- **인증 모듈**: 사용자 인증 및 권한 관리
- **윤리 정보 추적 모듈**: 투명성 정보 제공 및 탄소 발자국 계산

## 🔧 비기능 요구사항 (Non-Functional Requirements)

### 성능 기대치 (Performance)

- **응답 시간**: 메인 페이지 로딩 및 원두 검색 결과 조회는 2초 이내여야 한다.
- **동시 사용자 처리**: 동시 접속 50명 수준에서 서비스 응답 시간 지연이 없어야 한다.
- **이미지 최적화**: 모든 상품 이미지는 WebP 형식 및 지연 로딩(Lazy Loading)을 적용해야 한다.

### 보안 요구사항 (Security)

- **데이터 암호화**: 사용자 비밀번호는 **해시 함수(bcrypt)**를 사용하여 단방향 암호화되어야 한다.
- **통신 보안**: 주문/결제 및 개인 정보 전송을 위해 웹 앱의 모든 통신은 HTTPS/TLS를 사용해야 한다.
- **인젝션 방어**: 모든 사용자 입력 값에 대해 SQL Injection 및 XSS 방어를 위한 입력 값 검증을 구현해야 한다.

### 확장성 고려사항 (Scalability)

- **모듈 분리**: 핵심 기능 모듈(커머스, 인증, 윤리 정보 추적)은 향후 마이크로서비스 전환에 용이하도록 독립적인 서비스 계층으로 분리하여 설계해야 한다.

### 사용성 표준 (Usability)

- **모바일 최적화**: 웹 앱은 모든 주요 모바일 디바이스에서 레이아웃이 깨지지 않고 정상적으로 작동해야 한다.
- **직관적 내비게이션**: '장바구니', '결제', '마이페이지' 등 핵심 액션은 최대 3클릭 이내로 접근 가능해야 한다.

## 🚀 실행 방법

### 사전 요구사항

다음 소프트웨어가 설치되어 있어야 합니다:

- **Node.js**: v16 이상
- **npm**: v8 이상 (또는 yarn)
- **PostgreSQL**: v12 이상
- **Git**: 최신 버전

### 1. 프로젝트 클론 및 설치

```bash
# 저장소 클론
git clone <repository-url>
cd Coffee

# 백엔드 의존성 설치
cd backend
npm install

# 프론트엔드 의존성 설치
cd ../frontend
npm install
```

> **중요**: 프론트엔드 의존성 설치가 완료되지 않으면 `react-scripts` 오류가 발생할 수 있습니다. `npm install`이 완료될 때까지 기다려주세요.

### 2. 환경 변수 설정

#### 백엔드 환경 변수 설정

`backend/.env` 파일을 생성하고 다음 내용을 추가합니다:

```env
# 서버 설정
NODE_ENV=development
PORT=3000

# 데이터베이스 설정
DB_HOST=localhost
DB_PORT=5432
DB_NAME=honest_cup
DB_USER=postgres
DB_PASSWORD=password

# JWT 설정
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h

# CORS 설정
CORS_ORIGIN=http://localhost:3000
```

#### 프론트엔드 환경 변수 설정

`frontend/.env` 파일을 생성하고 다음 내용을 추가합니다:

```env
REACT_APP_API_URL=http://localhost:3000
```

> **보안 주의사항**: `.env` 파일은 절대 Git에 커밋하지 마세요. `.gitignore`에 이미 포함되어 있습니다.

### 3. 데이터베이스 설정

#### PostgreSQL 데이터베이스 생성

```bash
# PostgreSQL 접속
psql -U postgres

# 데이터베이스 생성
CREATE DATABASE honest_cup;

# 종료
\q
```

또는 명령줄에서:

```bash
createdb -U postgres honest_cup
```

#### 데이터베이스 마이그레이션 실행

```bash
# 백엔드 디렉토리로 이동
cd backend

# 마이그레이션 파일 실행
# PostgreSQL에 직접 접속하여 실행하거나, psql을 사용합니다
psql -U postgres -d honest_cup -f database/migrations/001_create_users_table.sql
psql -U postgres -d honest_cup -f database/migrations/002_create_partners_table.sql
psql -U postgres -d honest_cup -f database/migrations/003_create_products_table.sql
psql -U postgres -d honest_cup -f database/migrations/004_create_orders_table.sql
psql -U postgres -d honest_cup -f database/migrations/005_create_purchases_table.sql
psql -U postgres -d honest_cup -f database/migrations/006_create_tracking_table.sql
psql -U postgres -d honest_cup -f database/migrations/007_create_batches_table.sql
psql -U postgres -d honest_cup -f database/migrations/008_add_indexes.sql
```

또는 모든 마이그레이션을 한 번에 실행:

```bash
# database/schemas/schema.sql 파일이 있다면
psql -U postgres -d honest_cup -f database/schemas/schema.sql
```

#### 시드 데이터 추가 (선택사항)

테스트를 위한 샘플 데이터를 추가합니다:

```bash
psql -U postgres -d honest_cup -f database/seeds/seed_all.sql
```

### 4. 백엔드 서버 실행

```bash
# 백엔드 디렉토리로 이동
cd backend

# 개발 서버 실행 (nodemon 사용)
npm run dev

# 또는 프로덕션 모드로 실행
npm start
```

백엔드 서버는 기본적으로 **http://localhost:3000** 에서 실행됩니다.

서버가 정상적으로 시작되면 다음과 같은 메시지가 표시됩니다:

```
============================================
서버가 시작되었습니다!
============================================
환경: development
포트: 3000
URL: http://localhost:3000
============================================
```

### 5. 프론트엔드 애플리케이션 실행

새 터미널 창에서:

```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# 개발 서버 실행
npm start
# 또는
npm run dev
```

프론트엔드 애플리케이션은 기본적으로 **http://localhost:3000** (또는 다른 포트)에서 실행됩니다.

> **참고**: React 개발 서버는 자동으로 브라우저를 열고, 코드 변경 시 자동으로 새로고침됩니다. `npm start`와 `npm run dev`는 동일하게 작동합니다.

> **참고**: React 개발 서버는 자동으로 브라우저를 열고, 코드 변경 시 자동으로 새로고침됩니다.

### 6. 애플리케이션 접속

브라우저에서 다음 URL로 접속합니다:

- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:3000/api

### 실행 확인

#### 백엔드 API 확인

```bash
# API 헬스 체크
curl http://localhost:3000/

# 또는 브라우저에서 접속
# http://localhost:3000/
```

#### 프론트엔드 확인

브라우저에서 http://localhost:3000 에 접속하여 애플리케이션이 정상적으로 로드되는지 확인합니다.

### 문제 해결

#### 포트 충돌

포트가 이미 사용 중인 경우:

**Windows:**
```bash
netstat -ano | findstr :3000
```

**Linux/macOS:**
```bash
lsof -i :3000
```

`.env` 파일에서 `PORT` 값을 변경하거나, 사용 중인 프로세스를 종료합니다.

#### 데이터베이스 연결 오류

1. PostgreSQL 서비스가 실행 중인지 확인합니다.
2. `.env` 파일의 데이터베이스 설정이 올바른지 확인합니다.
3. 데이터베이스가 생성되었는지 확인합니다.

```bash
# PostgreSQL 서비스 상태 확인 (Linux)
sudo systemctl status postgresql

# 데이터베이스 목록 확인
psql -U postgres -l
```

#### 의존성 설치 오류

**Windows:**
```bash
# node_modules 삭제 후 재설치
rmdir /s /q node_modules
del package-lock.json
npm install
```

**Linux/macOS:**
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

#### react-scripts 오류

`react-scripts'은(는) 내부 또는 외부 명령...` 오류가 발생하는 경우:

```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 재설치
npm install

# react-scripts가 설치되었는지 확인
npm list react-scripts
```

여전히 문제가 발생하면:

```bash
# 캐시 정리 후 재설치
npm cache clean --force
rmdir /s /q node_modules  # Windows
del package-lock.json    # Windows
# 또는
rm -rf node_modules package-lock.json  # Linux/macOS
npm install
```

#### browserslist 경고

`We're unable to detect target browsers` 경고가 나타나는 경우:

이 경고는 무시해도 되지만, `package.json`에 `browserslist` 설정이 추가되어 있으면 자동으로 해결됩니다. 

경고가 나타나면:
- **Y 입력**: package.json에 기본 browserslist 설정이 자동으로 추가됩니다
- **n 입력**: 경고를 무시하고 계속 진행됩니다

또는 수동으로 `package.json`에 `browserslist` 설정을 추가할 수 있습니다 (이미 추가되어 있음).

#### 로그 파일 확인

백엔드 로그는 `backend/logs/` 디렉토리에 저장됩니다:

```bash
# 최신 에러 로그 확인
tail -f backend/logs/error-$(date +%Y-%m-%d).log

# 최신 통합 로그 확인
tail -f backend/logs/combined-$(date +%Y-%m-%d).log
```

### 프로덕션 빌드

#### 프론트엔드 빌드

```bash
cd frontend
npm run build
```

빌드된 파일은 `frontend/build/` 디렉토리에 생성됩니다.

#### 백엔드 프로덕션 실행

```bash
cd backend
NODE_ENV=production npm start
```

## 🔐 테스트 계정

애플리케이션 테스트를 위한 계정 정보입니다.

### 방법 1: 회원가입으로 계정 생성 (권장)

로그인 화면에서 "회원가입"을 클릭하여 다음 정보로 계정을 생성하세요:

- **이메일**: `test@example.com` (또는 원하는 이메일)
- **비밀번호**: `password123` (또는 원하는 비밀번호)
- **이름**: `테스트 사용자`

### 방법 2: 시드 데이터 사용

데이터베이스 시드 데이터를 실행한 경우, 다음 계정을 사용할 수 있습니다:

**일반 사용자 계정:**
- 이메일: `user@example.com`
- 비밀번호: `password123`
- 역할: `user`

**파트너 계정:**
- 이메일: `partner@example.com`
- 비밀번호: `password123`
- 역할: `partner`

**관리자 계정:**
- 이메일: `admin@example.com`
- 비밀번호: `password123`
- 역할: `admin`

> **참고**: 시드 데이터의 비밀번호 해시가 올바르지 않을 수 있습니다. 로그인이 되지 않으면 회원가입을 통해 새 계정을 생성하세요.

## 🧪 테스트 실행

프로젝트는 TDD (Test-Driven Development) 방법론을 사용합니다. 현재 **Red 단계**로 실패하는 테스트가 작성되어 있습니다.

### 테스트 환경

- **백엔드**: Jest + Supertest
- **프론트엔드**: Jest + React Testing Library

### 테스트 실행 방법

#### 1. 의존성 설치

```bash
# 백엔드 의존성 설치
cd backend
npm install

# 프론트엔드 의존성 설치
cd ../frontend
npm install
```

#### 2. 백엔드 테스트 실행

```bash
cd backend

# 테스트 실행
npm test

# Watch 모드로 실행 (파일 변경 시 자동 재실행)
npm run test:watch

# 커버리지 리포트 생성
npm run test:coverage
```

**예상 결과**: 모든 테스트가 실패합니다 (TDD Red 단계 - 의도된 실패)

#### 3. 프론트엔드 테스트 실행

```bash
cd frontend

# 테스트 실행
npm test

# Watch 모드로 실행
npm run test:watch

# 커버리지 리포트 생성
npm run test:coverage
```

**예상 결과**: 모든 테스트가 실패합니다 (TDD Red 단계 - 의도된 실패)

### 테스트 커버리지 현황

| 기능 | 백엔드 테스트 | 프론트엔드 테스트 | 총 테스트 케이스 | 상태 |
|------|-------------|----------------|---------------|------|
| **FR1: 투명 정보 추적** | 5개 | 5개 | 10개 | ✅ 완료 |
| **FR2: 윤리 영향 리포트** | 9개 | 8개 | 17개 | ✅ 완료 |
| **FR3: 맞춤형 주문 시스템** | - | - | 0개 | ⚪ 미작성 |
| **FR4: 데이터 검증** | - | - | 0개 | ⚪ 미작성 |
| **FR5: 파트너 관리** | - | - | 0개 | ⚪ 미작성 |
| **합계** | **14개** | **13개** | **27개** | - |

### 커버리지 리포트 확인

테스트 실행 후 다음 위치에서 HTML 리포트를 확인할 수 있습니다:

- **백엔드**: `backend/coverage/index.html`
- **프론트엔드**: `frontend/coverage/index.html`

브라우저에서 HTML 파일을 열어 시각적인 커버리지 리포트를 확인할 수 있습니다.

### TDD 워크플로우

1. **🔴 Red**: 실패하는 테스트 작성 (현재 단계)
2. **🟢 Green**: 최소한의 코드로 테스트 통과
3. **🔵 Refactor**: 코드 품질 개선

자세한 내용은 [TDD 워크플로우 가이드](docs/TDD_WORKFLOW.md)를 참고하세요.

### 🟢 Green 단계 구현 목록

현재 Red 단계가 완료되었으므로, 다음 단계인 Green 단계에서 구현해야 할 항목들을 우선순위별로 정리했습니다.

#### 🔴 P0: Critical (즉시 구현 필요)

**1. 데이터베이스 스키마 설계** (최우선) _ 작업 완료
- [ ] PostgreSQL 스키마 정의 (`database/schemas/`)
  - [ ] User 테이블
  - [ ] Product 테이블
  - [ ] Order 테이블
  - [ ] Purchase 테이블
  - [ ] Tracking 테이블
  - [ ] Partner 테이블
  - [ ] Batch 테이블
- [ ] 마이그레이션 파일 작성 (`database/migrations/`)
- [ ] 시드 데이터 생성 (`database/seeds/`)

**2. 인증 시스템** (기반 기능)
- [ ] 백엔드 인증 모듈 (`modules/auth/`)
  - [ ] 회원가입 API
  - [ ] 로그인 API
  - [ ] JWT 토큰 발급
  - [ ] 비밀번호 해시 (bcrypt)
  - [ ] 인증 미들웨어
- [ ] 프론트엔드 인증
  - [ ] 로그인 페이지
  - [ ] 회원가입 페이지
  - [ ] 인증 상태 관리

**3. Express/React 기본 구조** _ 작업완료
- [ ] Express 서버 설정 (`backend/src/app.js`)
- [ ] 라우팅 구조
- [ ] 미들웨어 설정
- [ ] React 앱 초기화
- [ ] 라우팅 설정 (React Router)
- [ ] 상태 관리 설정

**4. FR1: 투명 정보 추적 구현** (Green 단계) _ 작업완료
- [ ] 백엔드 API 구현
  - [ ] `GET /api/products/:id/tracking` 엔드포인트
  - [ ] ProductTrackingController 구현
  - [ ] 생산자 수익 비율 계산 로직
  - [ ] 농장 위치 정보 조회
  - [ ] 원산지 정보 조회
  - [ ] 에러 처리 (404)
- [ ] 프론트엔드 구현
  - [ ] ProductTracking 컴포넌트 구현
  - [ ] API 호출 함수 (`productApi.js`)
  - [ ] 지도 컴포넌트 (지도 시각화)
  - [ ] '원두 스토리 추적' 탭 UI
  - [ ] 데이터 로딩 및 에러 처리

**5. FR2: 윤리 영향 리포트 구현** (Green 단계) ) _ 작업완료
- [ ] 백엔드 API 구현
  - [ ] `GET /api/users/:userId/ethical-impact` 엔드포인트
  - [ ] EthicalImpactController 구현
  - [ ] 탄소 발자국 계산 서비스 (`services/carbon/`)
  - [ ] 3개월간 구매 기록 집계 로직
  - [ ] 친환경 원두 필터링 로직
  - [ ] 긍정적인 메시지 생성 로직
  - [ ] 월별 집계 데이터 생성
- [ ] 프론트엔드 구현
  - [ ] EthicalImpact 컴포넌트 구현
  - [ ] API 호출 함수 (`userApi.js`)
  - [ ] 탄소 발자국 수치 표시 UI
  - [ ] 긍정적인 메시지 표시
  - [ ] 월별 집계 차트/그래프
  - [ ] 로딩 및 에러 상태 처리

**6. 보안 요구사항** _ 작업완료
- [ ] 비밀번호 해시 함수 (bcrypt) 구현
- [ ] JWT 토큰 암호화
- [ ] SQL Injection 방어 (ORM 사용 또는 Prepared Statement)
- [ ] XSS 방어 (입력 값 검증 및 이스케이프)
- [ ] 입력 값 검증 미들웨어

#### 🟠 P1: High (빠른 구현 필요)

**1. FR3: 맞춤형 주문 시스템** _ 작업 완료
- [x] 테스트 작성 (12개 케이스)
- [x] 백엔드 API 구현
  - [x] `GET /api/products/search` 엔드포인트
  - [x] 필터링 로직 (여성 생산자, 친환경 포장재)
  - [x] 다중 필터 조합 처리
- [x] 프론트엔드 구현
  - [x] 검색 페이지 구현
  - [x] 필터 UI 컴포넌트
  - [x] 검색 결과 리스트
  - [x] 주문/결제 프로세스 (기본 구조)

**2. 공통 컴포넌트** _ 작업 완료
- [x] Button, Input, Modal 컴포넌트
- [x] Loading Spinner, Error Message
- [x] Header/Navigation, Footer (반응형 개선)

**3. 성능 최적화** _ 작업 완료
- [x] 이미지 WebP 형식 변환
- [x] 지연 로딩 (Lazy Loading) 구현
- [x] 데이터베이스 인덱싱

**4. 모바일 최적화** _ 작업 완료
- [x] 반응형 디자인 구현
- [x] 모바일 레이아웃 테스트 (기본 반응형 확인)

#### 🟡 P2: Medium (단계적 구현)

**1. FR5: 파트너 관리** _ 작업 완료
- [x] 테스트 작성 (13개 케이스)
- [x] 정산 계산 로직
- [x] 파트너 대시보드 구현

**2. 로깅 및 모니터링** _ 작업 완료
- [x] 로깅 시스템 구축
- [x] 에러 로깅

#### 🟢 P3: Low (향후 구현)

**1. FR4: 블록체인 연동** (Mock 구현)
- [ ] 테스트 작성 (Mock 블록체인)
- [ ] 관리자 대시보드
- [ ] 블록체인 기록 서비스 (Mock)

**2. CI/CD 파이프라인**
- [ ] GitHub Actions 설정
- [ ] 자동 테스트 실행

### 구현 예상 소요 시간

| 우선순위 | 예상 시간 | 기간 |
|---------|----------|------|
| **P0 (Critical)** | 24-36시간 | 3-5일 |
| **P1 (High)** | 20-26시간 | 2.5-3일 |
| **P2 (Medium)** | 14-20시간 | 2-2.5일 |
| **P3 (Low)** | 12-18시간 | 1.5-2일 |

### 구현 순서 권장사항

1. **데이터베이스 스키마 설계** (최우선 - 모든 기능의 기반)
2. **Express/React 기본 구조** (앱 실행을 위한 최소 구조)
3. **인증 시스템** (사용자 기능의 기반)
4. **FR1 구현** (Green 단계)
5. **FR2 구현** (Green 단계)
6. **보안 요구사항** (전체 기능에 적용)
7. **FR3 구현** (P1)
8. **공통 컴포넌트 및 최적화** (P1)

자세한 내용은 [구현 우선순위 목록](Report/IMPLEMENTATION_PRIORITY.md)을 참고하세요.

### 🔵 Refactor 단계: 프런트엔드 코드 리팩토링

프런트엔드 코드베이스 분석 결과, 코드 스멜과 개선점을 발견했습니다. 리팩토링 작업을 우선순위별로 정리했습니다.

자세한 분석 내용은 [프런트엔드 리팩토링 분석 보고서](docs/FRONTEND_REFACTORING_ANALYSIS.md)를 참고하세요.

#### 🔴 Phase 1: 긴급 수정 (1주 이내)

**1. API 토큰 관리 통일** _ 작업완료
- [ ] `services/api/partnerApi.js`에서 `localStorage.getItem('token')` 제거
- [ ] `authApi`의 `getToken()` 함수 사용 또는 axios 인터셉터 활용
- [ ] 토큰 키 불일치 해결 (`'token'` vs `'honest_cup_token'`)

**2. ProtectedRoute 로딩 상태 개선** _ 작업완료
- [ ] `components/common/ProtectedRoute.jsx`에서 단순 텍스트 제거
- [ ] `LoadingSpinner` 컴포넌트 적용
- [ ] 일관된 로딩 UI 제공

**3. 에러 처리 패턴 통일** _ 작업완료
- [ ] `ProductSearch.jsx`에서 인라인 스타일 에러 표시를 `ErrorMessage` 컴포넌트로 변경
- [ ] `EthicalImpact.jsx`에서 인라인 스타일 에러 표시를 `ErrorMessage` 컴포넌트로 변경
- [ ] `ProductTracking.jsx`에서 인라인 스타일 에러 표시를 `ErrorMessage` 컴포넌트로 변경
- [ ] 모든 컴포넌트에서 에러 표시 방식 통일

#### 🟡 Phase 2: 중요 개선 (2-3주)

**4. 반응형 로직 커스텀 훅 추출** _ 작업완료
- [ ] `hooks/useResponsive.js` 커스텀 훅 생성
- [ ] `Header.jsx`에서 중복된 반응형 로직 제거 및 `useResponsive` 적용
- [ ] `ProductSearch.jsx`에서 중복된 반응형 로직 제거 및 `useResponsive` 적용
- [ ] `ProductList.jsx`에서 중복된 반응형 로직 제거 및 `useResponsive` 적용
- [ ] `Footer.jsx`에서 중복된 반응형 로직 제거 및 `useResponsive` 적용

**5. 공통 로직 커스텀 훅화** _ 작업완료
- [ ] `hooks/useErrorHandler.js` 커스텀 훅 생성 (에러 처리 로직 통합)
- [ ] `hooks/useAsync.js` 커스텀 훅 생성 (비동기 데이터 로딩 패턴 통합)
- [ ] 각 컴포넌트에서 공통 로직을 커스텀 훅으로 교체

**6. 상수 파일 생성** _ 작업완료
- [ ] `constants/breakpoints.js` 생성 (브레이크포인트 값 통합: 768, 1024 등)
- [ ] `constants/theme.js` 생성 (색상, 폰트, 간격 등 테마 값 통합)
- [ ] 하드코딩된 값들을 상수로 교체

**7. useEffect 의존성 배열 수정** _ 작업완료
- [ ] `EthicalImpact.jsx`에서 `loadEthicalImpact` 함수를 `useCallback`으로 메모이제이션
- [ ] `ProductTracking.jsx`에서 `loadTrackingData` 함수를 `useCallback`으로 메모이제이션
- [ ] 모든 `useEffect`의 의존성 배열 검증 및 수정
- [ ] ESLint 경고 해결

#### 🟢 Phase 3: 장기 개선 (1-2개월)

**8. 스타일 시스템 개선**_ 작업완료
- [ ] CSS-in-JS 라이브러리 도입 (styled-components 또는 emotion) 또는 CSS Modules 도입
- [ ] 인라인 스타일 객체를 스타일 시스템으로 마이그레이션
- [ ] 공통 스타일을 별도 파일로 분리
- [ ] 테마 관리 시스템 구축

**9. 타입 안정성 강화**_ 작업완료
- [ ] PropTypes 도입 또는 TypeScript 마이그레이션 검토
- [ ] 모든 컴포넌트에 props 타입 검증 추가
- [ ] 타입 정의 파일 생성

**10. 성능 최적화**_ 작업완료
- [ ] `React.memo`로 불필요한 리렌더링 방지
- [ ] `useCallback`으로 인라인 함수 메모이제이션
- [ ] `useMemo`로 객체/배열 메모이제이션
- [ ] 성능 프로파일링 및 최적화

**11. 접근성 (A11y) 개선**_ 작업완료
- [ ] 모든 인터랙티브 요소에 적절한 ARIA 속성 추가
- [ ] 키보드 네비게이션 테스트 및 개선
- [ ] 포커스 관리 개선
- [ ] 스크린 리더 호환성 테스트

**12. 테스트 커버리지 향상**_ 작업완료
- [ ] 누락된 컴포넌트 테스트 추가
- [ ] 테스트 커버리지 목표 설정 (80% 이상)
- [ ] 통합 테스트 추가

**13. 환경 변수 관리 개선**_ 작업완료
- [ ] `.env.example` 파일 생성
- [ ] 환경 변수 문서화
- [ ] `config/api.js`에서 하드코딩된 기본값 제거

**14. 코드 문서화**_ 작업완료
- [ ] 모든 컴포넌트와 함수에 JSDoc 주석 추가
- [ ] 복잡한 비즈니스 로직에 상세 설명 추가
- [ ] 컴포넌트 사용 예시 문서화

### 리팩토링 예상 소요 시간

| Phase | 예상 시간 | 기간 |
|-------|----------|------|
| **Phase 1 (긴급 수정)** | 4-6시간 | 1일 |
| **Phase 2 (중요 개선)** | 16-24시간 | 2-3일 |
| **Phase 3 (장기 개선)** | 40-60시간 | 1-2주 |

### 리팩토링 우선순위 권장사항

1. **Phase 1 완료** → 즉시 사용자 경험 개선 및 버그 예방
2. **Phase 2 완료** → 코드 유지보수성 향상 및 개발 생산성 증대
3. **Phase 3 완료** → 장기적인 코드 품질 및 확장성 확보

## 📅 일정 및 마일스톤

MVP는 3개월을 목표로 합니다.

| 마일스톤 | 기간 | 목표 |
|---------|------|------|
| **Phase 0: MVP (Core Feature)** | 3개월 | 핵심 기능(FR1-FR3) 구현, 100명 베타 사용자 확보, PMF 검증 |
| **Phase 1: 공개 베타 (Growth)** | MVP 후 2개월 | SEO 최적화, 1,000명 사용자 확보, 리텐션 60% 달성 |

## ⚠️ 리스크 & 의존성

| 구분 | 내용 | 영향 | 완화 전략 |
|------|------|------|----------|
| **데이터 신뢰성 리스크** | 파트너가 제공하는 윤리적 정보(수익 분배율 등)가 정확하지 않을 경우 | 서비스 핵심 가치(솔직함) 훼손, 사용자 이탈 | 블록체인 연동(FR4)을 통한 데이터 변조 방지 및 계약서 기반의 정기적인 서류 검증 프로세스 구축 |
| **개발 의존성** | 블록체인 또는 분산원장 기술 구현에 필요한 기술 인력 확보 어려움 | FR4 구현 지연, 서비스 핵심 차별화 요소 부재 | 최소한의 검증 가능한 MVP 기능만 구현하고, 기존 DB 연동으로 대체한 후 기술 부채로 관리 |

## 📝 참고사항

- UX/UI 설계, 기술 사양, API 명세, 데이터 모델 섹션은 MVP 단계에서는 별도의 문서로 상세화되거나 개발 초기에 구체화됩니다.

---

## To-do List
 - TC _ 완료
 - Implementation
 - Refactory _ 완료

**문서 버전**: 1.0 (MVP)  
**최종 업데이트**: 2025-12-15

