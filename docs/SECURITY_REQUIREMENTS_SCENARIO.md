# 보안 요구사항 최소 단위 구현 시나리오

> 보안 요구사항을 충족하기 위한 최소 구현 계획

**작성일**: 2025-12-15  
**목표**: 보안 요구사항을 충족하는 최소한의 구현  
**현재 상태**: 일부 보안 기능은 이미 구현됨

---

## 📋 목차

1. [시나리오 개요](#시나리오-개요)
2. [현재 상태 분석](#현재-상태-분석)
3. [구현 계획](#구현-계획)
4. [보안 기능 상세](#보안-기능-상세)
5. [승인 요청](#승인-요청)

---

## 시나리오 개요

### 목표

보안 요구사항을 충족하기 위한 최소한의 구현을 완료합니다.

### 구현 원칙

1. **최소 기능만 구현**: 보안 요구사항을 충족하는 최소한의 코드만
2. **기존 코드 활용**: 이미 구현된 보안 기능은 재확인 및 개선
3. **표준 패턴 사용**: 보안 모범 사례 준수
4. **확장 가능한 구조**: 향후 보안 강화가 용이하도록 설계

### 구현 범위

#### ✅ 이미 구현됨
- 비밀번호 해시 함수 (bcrypt) - `authService.js`
- JWT 토큰 암호화 - `jwt.js`
- SQL Injection 방어 (Prepared Statement) - 모든 모델

#### ⚪ 추가 구현 필요
- 입력 값 검증 미들웨어 (재사용 가능한 형태)
- XSS 방어 강화 (출력 이스케이프, 보안 헤더)
- 입력 sanitization
- 보안 헤더 설정

---

## 현재 상태 분석

### ✅ 이미 구현된 보안 기능

#### 1. 비밀번호 해시 함수 (bcrypt)
- **위치**: `backend/src/modules/auth/authService.js`
- **구현 상태**: ✅ 완료
- **기능**: bcrypt를 사용한 비밀번호 해시 (salt rounds: 10)

#### 2. JWT 토큰 암호화
- **위치**: `backend/src/utils/jwt.js`
- **구현 상태**: ✅ 완료
- **기능**: jsonwebtoken을 사용한 JWT 토큰 생성 및 검증

#### 3. SQL Injection 방어
- **위치**: 모든 모델 파일 (`User.js`, `Tracking.js`, `Purchase.js`)
- **구현 상태**: ✅ 완료
- **기능**: PostgreSQL의 Prepared Statement 사용 ($1, $2 등)

### ⚪ 추가 구현 필요

#### 1. 입력 값 검증 미들웨어
- **현재 상태**: 컨트롤러에서 직접 검증 (중복 코드)
- **필요 사항**: 재사용 가능한 검증 미들웨어

#### 2. XSS 방어
- **현재 상태**: React의 기본 XSS 방어 활용
- **필요 사항**: 
  - 보안 헤더 설정 (helmet)
  - 입력 sanitization
  - 출력 이스케이프 (필요 시)

---

## 구현 계획

### 1. 프로젝트 구조

```
backend/src/
├── middleware/
│   ├── validator.js              # 입력 검증 미들웨어 (신규)
│   ├── sanitizer.js              # 입력 sanitization (신규)
│   └── security.js               # 보안 헤더 미들웨어 (신규)
└── utils/
    └── security.js               # 보안 유틸리티 함수 (신규)
```

### 2. 구현 파일 상세

#### 2.1 입력 검증 미들웨어 (`middleware/validator.js`)

**기능**:
- 이메일 형식 검증
- 비밀번호 강도 검증
- 필수 필드 검증
- 문자열 길이 검증
- 숫자 범위 검증

**미들웨어 함수**:
```javascript
- validateEmail(email)
- validatePassword(password)
- validateRequired(fields)
- validateStringLength(field, min, max)
- validateNumberRange(field, min, max)
- validateRegisterInput(req, res, next)
- validateLoginInput(req, res, next)
```

#### 2.2 입력 Sanitization (`middleware/sanitizer.js`)

**기능**:
- HTML 태그 제거
- 특수 문자 이스케이프
- SQL 키워드 필터링
- 공백 정리

**미들웨어 함수**:
```javascript
- sanitizeString(input)
- sanitizeInput(req, res, next)
```

#### 2.3 보안 헤더 미들웨어 (`middleware/security.js`)

**기능**:
- Helmet.js를 사용한 보안 헤더 설정
- XSS 방어 헤더
- Content Security Policy (CSP)
- HSTS (HTTP Strict Transport Security)

**미들웨어 함수**:
```javascript
- setupSecurityHeaders(app)
```

#### 2.4 보안 유틸리티 (`utils/security.js`)

**기능**:
- XSS 방어 함수
- 입력 정리 함수

**함수**:
```javascript
- escapeHtml(text)
- sanitizeInput(input)
```

### 3. app.js 업데이트

**추가 사항**:
- 보안 헤더 미들웨어 적용
- 입력 sanitization 미들웨어 적용
- 입력 검증 미들웨어 적용 (선택적)

---

## 보안 기능 상세

### 1. 비밀번호 해시 함수 (bcrypt)

**현재 상태**: ✅ 이미 구현됨

**위치**: `backend/src/modules/auth/authService.js`

**구현 내용**:
- bcrypt 사용 (salt rounds: 10)
- `hashPassword()` 함수
- `comparePassword()` 함수

**확인 사항**:
- ✅ bcrypt 패키지 사용
- ✅ 적절한 salt rounds (10)
- ✅ 비밀번호는 응답에 포함되지 않음

### 2. JWT 토큰 암호화

**현재 상태**: ✅ 이미 구현됨

**위치**: `backend/src/utils/jwt.js`

**구현 내용**:
- jsonwebtoken 사용
- 환경 변수로 시크릿 키 관리
- 토큰 만료 시간 설정

**확인 사항**:
- ✅ JWT_SECRET 환경 변수 사용
- ✅ 토큰 만료 시간 설정 (24h)
- ✅ 토큰 검증 로직 구현

**개선 사항**:
- 프로덕션 환경에서 기본 시크릿 키 경고 (이미 구현됨)

### 3. SQL Injection 방어

**현재 상태**: ✅ 이미 구현됨

**위치**: 모든 모델 파일

**구현 내용**:
- PostgreSQL Prepared Statement 사용
- 파라미터화된 쿼리 ($1, $2 등)

**확인 사항**:
- ✅ 모든 쿼리에서 Prepared Statement 사용
- ✅ 사용자 입력을 직접 쿼리에 포함하지 않음

**예시**:
```javascript
// ✅ 안전한 방법
const query = 'SELECT * FROM users WHERE email = $1';
const result = await pool.query(query, [email]);

// ❌ 위험한 방법 (사용하지 않음)
const query = `SELECT * FROM users WHERE email = '${email}'`;
```

### 4. XSS 방어

**현재 상태**: ⚪ 부분 구현 (React 기본 보호)

**필요 사항**:
- 보안 헤더 설정 (helmet)
- 입력 sanitization
- 출력 이스케이프 (필요 시)

**구현 계획**:
1. Helmet.js 설치 및 설정
2. 보안 헤더 미들웨어 생성
3. 입력 sanitization 미들웨어 생성
4. XSS 방어 유틸리티 함수 생성

### 5. 입력 값 검증 미들웨어

**현재 상태**: ⚪ 부분 구현 (컨트롤러에서 직접 검증)

**필요 사항**:
- 재사용 가능한 검증 미들웨어
- 표준화된 검증 규칙
- 에러 메시지 통일

**구현 계획**:
1. 검증 미들웨어 생성
2. 공통 검증 규칙 정의
3. 컨트롤러에 적용

---

## 구현 파일 목록

### 백엔드 파일 (4개)

1. `backend/src/middleware/validator.js` - 입력 검증 미들웨어 (신규)
2. `backend/src/middleware/sanitizer.js` - 입력 sanitization 미들웨어 (신규)
3. `backend/src/middleware/security.js` - 보안 헤더 미들웨어 (신규)
4. `backend/src/utils/security.js` - 보안 유틸리티 함수 (신규)
5. `backend/src/app.js` - 보안 미들웨어 적용 (업데이트)

### 설정 파일 (1개)

1. `backend/package.json` - 보안 패키지 추가 (helmet, validator 등)

---

## 예상 결과

### 생성될 파일
- **백엔드**: 5개 파일 (신규 4개, 업데이트 1개)
- **설정 파일**: 1개
- **총 6개 파일**

### 기능
- ✅ 비밀번호 해시 함수 (bcrypt) - 재확인
- ✅ JWT 토큰 암호화 - 재확인
- ✅ SQL Injection 방어 - 재확인
- ✅ 입력 값 검증 미들웨어
- ✅ XSS 방어 (보안 헤더, sanitization)
- ✅ 입력 sanitization

---

## 승인 요청

### 구현 계획 요약

1. **보안 기능 재확인** (3개 항목)
   - 비밀번호 해시 함수 (bcrypt) - 이미 구현됨
   - JWT 토큰 암호화 - 이미 구현됨
   - SQL Injection 방어 - 이미 구현됨

2. **추가 보안 기능 구현** (4개 파일)
   - 입력 검증 미들웨어 생성
   - 입력 sanitization 미들웨어 생성
   - 보안 헤더 미들웨어 생성 (helmet)
   - 보안 유틸리티 함수 생성

3. **app.js 업데이트**
   - 보안 미들웨어 적용

### 예상 소요 시간

- 보안 기능 재확인: 0.5시간
- 추가 보안 기능 구현: 2-3시간
- 테스트 및 검증: 0.5-1시간
- **총 3-4.5시간** (0.5-1일)

### 승인 여부

다음 작업을 진행하시겠습니까?

- [ ] ✅ **승인** - 보안 요구사항 구현 시작
- [ ] ⏸️ **보류** - 추가 검토 필요
- [ ] ✏️ **수정 요청** - 시나리오 변경 필요

**승인 시 진행할 작업**:
1. 보안 기능 재확인 및 문서화
2. 입력 검증 미들웨어 구현
3. 입력 sanitization 미들웨어 구현
4. 보안 헤더 미들웨어 구현 (helmet)
5. 보안 유틸리티 함수 구현
6. app.js에 보안 미들웨어 적용
7. package.json에 보안 패키지 추가

---

**작성일**: 2025-12-15  
**승인 대기 중**

