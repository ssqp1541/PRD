# 인증 시스템 최소 단위 구현 시나리오

> TDD Green 단계를 위한 인증 시스템 최소 구현 계획

**작성일**: 2025-12-15  
**목표**: FR1, FR2 테스트 통과를 위한 최소한의 인증 시스템 구현  
**방법론**: TDD (Test-Driven Development)

---

## 📋 목차

1. [시나리오 개요](#시나리오-개요)
2. [백엔드 구현 계획](#백엔드-구현-계획)
3. [프론트엔드 구현 계획](#프론트엔드-구현-계획)
4. [기술 스택](#기술-스택)
5. [API 명세](#api-명세)
6. [데이터베이스 연동](#데이터베이스-연동)
7. [보안 고려사항](#보안-고려사항)
8. [승인 요청](#승인-요청)

---

## 시나리오 개요

### 목표

FR1, FR2 테스트를 통과하기 위한 최소한의 인증 시스템을 구현합니다.

### 구현 원칙

1. **최소 기능만 구현**: 회원가입, 로그인, JWT 토큰 발급만 구현
2. **보안 우선**: 비밀번호 해시(bcrypt), JWT 토큰 검증 필수
3. **확장 가능한 구조**: 향후 소셜 로그인, 비밀번호 재설정 등 추가 용이
4. **TDD 준수**: 테스트 가능한 구조로 설계

### 구현 범위

#### ✅ 포함 사항
- 회원가입 API (이메일, 비밀번호, 이름)
- 로그인 API (이메일, 비밀번호)
- JWT 토큰 발급 및 검증
- 비밀번호 해시 (bcrypt)
- 인증 미들웨어 (보호된 라우트)
- 로그인 페이지 (프론트엔드)
- 회원가입 페이지 (프론트엔드)
- 인증 상태 관리 (Context API 또는 간단한 상태 관리)

#### ⚪ 제외 사항 (향후 구현)
- 소셜 로그인 (Google, Kakao 등)
- 비밀번호 재설정
- 이메일 인증
- 2단계 인증 (2FA)
- 세션 관리 (JWT만 사용)
- 리프레시 토큰 (MVP에서는 Access Token만 사용)

---

## 백엔드 구현 계획

### 1. 프로젝트 구조

```
backend/src/modules/auth/
├── authController.js      # 인증 컨트롤러 (회원가입, 로그인)
├── authService.js         # 비즈니스 로직 (비밀번호 해시, JWT 생성)
├── authMiddleware.js      # 인증 미들웨어 (토큰 검증)
└── authRoutes.js          # 라우트 정의

backend/src/models/
└── User.js                # User 모델 (데이터베이스 연동)

backend/src/utils/
└── jwt.js                 # JWT 유틸리티 함수
```

### 2. 의존성 패키지

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.11.3",           // PostgreSQL 클라이언트
    "dotenv": "^16.3.1"        // 환경 변수 관리
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
```

### 3. 환경 변수 설정

```env
# .env 파일
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h
DB_HOST=localhost
DB_PORT=5432
DB_NAME=honest_cup
DB_USER=postgres
DB_PASSWORD=password
```

### 4. 구현 파일 상세

#### 4.1 User 모델 (`models/User.js`)

**기능**:
- 데이터베이스 연결 및 쿼리 실행
- 사용자 생성, 조회, 이메일 중복 확인

**메서드**:
```javascript
- createUser(email, passwordHash, name, role)
- findByEmail(email)
- findById(id)
```

#### 4.2 JWT 유틸리티 (`utils/jwt.js`)

**기능**:
- JWT 토큰 생성
- JWT 토큰 검증

**함수**:
```javascript
- generateToken(userId, email, role)
- verifyToken(token)
```

#### 4.3 인증 서비스 (`modules/auth/authService.js`)

**기능**:
- 비밀번호 해시 생성 (bcrypt)
- 비밀번호 검증
- 사용자 생성 로직
- 로그인 로직

**함수**:
```javascript
- hashPassword(password)
- comparePassword(password, hash)
- registerUser(email, password, name)
- loginUser(email, password)
```

#### 4.4 인증 컨트롤러 (`modules/auth/authController.js`)

**기능**:
- HTTP 요청/응답 처리
- 에러 처리
- 응답 포맷팅

**엔드포인트 핸들러**:
```javascript
- register(req, res, next)
- login(req, res, next)
```

#### 4.5 인증 미들웨어 (`modules/auth/authMiddleware.js`)

**기능**:
- JWT 토큰 검증
- 사용자 정보 추출
- 보호된 라우트 접근 제어

**미들웨어**:
```javascript
- authenticateToken(req, res, next)
```

#### 4.6 인증 라우트 (`modules/auth/authRoutes.js`)

**라우트 정의**:
```javascript
POST /api/auth/register  - 회원가입
POST /api/auth/login     - 로그인
```

---

## 프론트엔드 구현 계획

### 1. 프로젝트 구조

```
frontend/src/
├── pages/
│   ├── Auth/
│   │   ├── Login.jsx           # 로그인 페이지
│   │   ├── Register.jsx       # 회원가입 페이지
│   │   └── __tests__/         # 테스트 파일
├── services/
│   ├── api/
│   │   └── authApi.js         # 인증 API 호출 함수
│   └── auth/
│       └── authService.js     # 인증 상태 관리 서비스
├── context/
│   └── AuthContext.jsx       # 인증 컨텍스트 (상태 관리)
└── components/
    └── common/
        └── ProtectedRoute.jsx # 보호된 라우트 컴포넌트
```

### 2. 의존성 패키지

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5"
  }
}
```

### 3. 구현 파일 상세

#### 3.1 인증 API (`services/api/authApi.js`)

**기능**:
- 백엔드 API 호출
- 토큰 저장/조회

**함수**:
```javascript
- register(email, password, name)
- login(email, password)
- logout()
- getToken()
- setToken(token)
```

#### 3.2 인증 컨텍스트 (`context/AuthContext.jsx`)

**기능**:
- 전역 인증 상태 관리
- 로그인/로그아웃 상태 제공
- 사용자 정보 제공

**상태**:
```javascript
- user: { id, email, name, role } | null
- isAuthenticated: boolean
- isLoading: boolean
```

**함수**:
```javascript
- login(email, password)
- register(email, password, name)
- logout()
```

#### 3.3 로그인 페이지 (`pages/Auth/Login.jsx`)

**기능**:
- 이메일/비밀번호 입력 폼
- 로그인 버튼
- 에러 메시지 표시
- 회원가입 페이지로 이동 링크

**UI 요소**:
- 이메일 입력 필드
- 비밀번호 입력 필드
- 로그인 버튼
- 에러 메시지 영역
- 회원가입 링크

#### 3.4 회원가입 페이지 (`pages/Auth/Register.jsx`)

**기능**:
- 이메일/비밀번호/이름 입력 폼
- 비밀번호 확인 필드
- 회원가입 버튼
- 에러 메시지 표시
- 로그인 페이지로 이동 링크

**UI 요소**:
- 이메일 입력 필드
- 비밀번호 입력 필드
- 비밀번호 확인 입력 필드
- 이름 입력 필드
- 회원가입 버튼
- 에러 메시지 영역
- 로그인 링크

#### 3.5 보호된 라우트 (`components/common/ProtectedRoute.jsx`)

**기능**:
- 인증되지 않은 사용자 접근 차단
- 로그인 페이지로 리다이렉트

---

## 기술 스택

### 백엔드
- **Express.js**: 웹 프레임워크
- **bcrypt**: 비밀번호 해시
- **jsonwebtoken**: JWT 토큰 생성/검증
- **pg**: PostgreSQL 클라이언트
- **dotenv**: 환경 변수 관리

### 프론트엔드
- **React**: UI 라이브러리
- **React Router**: 라우팅
- **Axios**: HTTP 클라이언트
- **Context API**: 상태 관리

---

## API 명세

### 1. 회원가입 API

**엔드포인트**: `POST /api/auth/register`

**요청 본문**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "홍길동"
}
```

**성공 응답** (201 Created):
```json
{
  "success": true,
  "message": "회원가입이 완료되었습니다.",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "홍길동",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**에러 응답** (400 Bad Request):
```json
{
  "success": false,
  "message": "이미 등록된 이메일입니다.",
  "error": "EMAIL_ALREADY_EXISTS"
}
```

### 2. 로그인 API

**엔드포인트**: `POST /api/auth/login`

**요청 본문**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**성공 응답** (200 OK):
```json
{
  "success": true,
  "message": "로그인 성공",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "홍길동",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**에러 응답** (401 Unauthorized):
```json
{
  "success": false,
  "message": "이메일 또는 비밀번호가 올바르지 않습니다.",
  "error": "INVALID_CREDENTIALS"
}
```

### 3. 인증 미들웨어 사용 예시

```javascript
// 보호된 라우트
router.get('/api/users/profile', authenticateToken, (req, res) => {
  // req.user에 사용자 정보가 포함됨
  res.json({ user: req.user });
});
```

---

## 데이터베이스 연동

### 사용할 테이블

**users 테이블** (이미 생성됨):
```sql
- id (SERIAL PRIMARY KEY)
- email (VARCHAR UNIQUE NOT NULL)
- password_hash (VARCHAR NOT NULL)
- name (VARCHAR)
- role (VARCHAR DEFAULT 'user')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 쿼리 예시

```sql
-- 사용자 생성
INSERT INTO users (email, password_hash, name, role)
VALUES ($1, $2, $3, $4)
RETURNING id, email, name, role;

-- 이메일로 사용자 조회
SELECT id, email, password_hash, name, role
FROM users
WHERE email = $1;

-- ID로 사용자 조회
SELECT id, email, name, role
FROM users
WHERE id = $1;
```

---

## 보안 고려사항

### 1. 비밀번호 보안
- ✅ bcrypt로 비밀번호 해시 (salt rounds: 10)
- ✅ 평문 비밀번호는 절대 저장하지 않음
- ✅ 비밀번호는 응답에 포함하지 않음

### 2. JWT 토큰 보안
- ✅ 환경 변수로 JWT_SECRET 관리
- ✅ 토큰 만료 시간 설정 (24시간)
- ✅ 토큰은 HTTP-only 쿠키 또는 로컬 스토리지에 저장 (프론트엔드)

### 3. 입력 검증
- ✅ 이메일 형식 검증
- ✅ 비밀번호 최소 길이 검증 (8자 이상)
- ✅ SQL Injection 방어 (Prepared Statement 사용)

### 4. 에러 처리
- ✅ 구체적인 에러 메시지 노출 최소화
- ✅ 로그에는 상세 정보 기록, 응답에는 일반적인 메시지만 전송

---

## 구현 파일 목록

### 백엔드 파일 (7개)

1. `backend/src/models/User.js` - User 모델
2. `backend/src/utils/jwt.js` - JWT 유틸리티
3. `backend/src/modules/auth/authService.js` - 인증 서비스
4. `backend/src/modules/auth/authController.js` - 인증 컨트롤러
5. `backend/src/modules/auth/authMiddleware.js` - 인증 미들웨어
6. `backend/src/modules/auth/authRoutes.js` - 인증 라우트
7. `backend/src/app.js` - Express 앱 설정 (라우트 등록)

### 프론트엔드 파일 (6개)

1. `frontend/src/services/api/authApi.js` - 인증 API 클라이언트
2. `frontend/src/context/AuthContext.jsx` - 인증 컨텍스트
3. `frontend/src/pages/Auth/Login.jsx` - 로그인 페이지
4. `frontend/src/pages/Auth/Register.jsx` - 회원가입 페이지
5. `frontend/src/components/common/ProtectedRoute.jsx` - 보호된 라우트
6. `frontend/src/App.jsx` - 라우터 설정 (인증 라우트 등록)

### 설정 파일 (2개)

1. `backend/.env.example` - 환경 변수 예시 파일
2. `frontend/src/config/api.js` - API 기본 URL 설정

---

## 예상 결과

### 생성될 파일
- **백엔드**: 7개 파일
- **프론트엔드**: 6개 파일
- **설정 파일**: 2개
- **총 15개 파일**

### 기능
- ✅ 회원가입 기능
- ✅ 로그인 기능
- ✅ JWT 토큰 발급 및 검증
- ✅ 비밀번호 해시 (bcrypt)
- ✅ 인증 미들웨어
- ✅ 로그인/회원가입 페이지
- ✅ 인증 상태 관리

---

## 승인 요청

### 구현 계획 요약

1. **백엔드 인증 모듈** (7개 파일)
   - User 모델, JWT 유틸리티, 인증 서비스/컨트롤러/미들웨어/라우트
   - Express 앱 설정 업데이트

2. **프론트엔드 인증** (6개 파일)
   - 인증 API 클라이언트, 인증 컨텍스트
   - 로그인/회원가입 페이지
   - 보호된 라우트 컴포넌트

3. **보안 구현**
   - bcrypt 비밀번호 해시
   - JWT 토큰 생성/검증
   - 입력 검증

### 예상 소요 시간

- 백엔드 구현: 3-4시간
- 프론트엔드 구현: 2-3시간
- 테스트 및 디버깅: 1-2시간
- **총 6-9시간** (1-1.5일)

### 승인 여부

다음 작업을 진행하시겠습니까?

- [ ] ✅ **승인** - 인증 시스템 구현 시작
- [ ] ⏸️ **보류** - 추가 검토 필요
- [ ] ✏️ **수정 요청** - 시나리오 변경 필요

**승인 시 진행할 작업**:
1. 백엔드 인증 모듈 구현 (7개 파일)
2. 프론트엔드 인증 구현 (6개 파일)
3. Express 앱 설정 업데이트
4. React 라우터 설정 업데이트
5. 환경 변수 설정 파일 생성

---

**작성일**: 2025-12-15  
**승인 대기 중**

