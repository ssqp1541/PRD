# 보안 요구사항 구현 문서

> 보안 요구사항 구현 상태 및 사용 방법

**작성일**: 2025-12-15  
**버전**: 1.0

---

## 📋 목차

1. [구현 상태](#구현-상태)
2. [보안 기능 상세](#보안-기능-상세)
3. [사용 방법](#사용-방법)
4. [보안 체크리스트](#보안-체크리스트)

---

## 구현 상태

### ✅ 완료된 보안 기능

| 항목 | 상태 | 위치 | 비고 |
|------|------|------|------|
| **비밀번호 해시 함수 (bcrypt)** | ✅ 완료 | `backend/src/modules/auth/authService.js` | salt rounds: 10 |
| **JWT 토큰 암호화** | ✅ 완료 | `backend/src/utils/jwt.js` | jsonwebtoken 사용 |
| **SQL Injection 방어** | ✅ 완료 | 모든 모델 파일 | Prepared Statement 사용 |
| **XSS 방어** | ✅ 완료 | `backend/src/middleware/security.js` | Helmet.js 사용 |
| **입력 값 검증 미들웨어** | ✅ 완료 | `backend/src/middleware/validator.js` | 재사용 가능 |
| **입력 Sanitization** | ✅ 완료 | `backend/src/middleware/sanitizer.js` | HTML 태그 제거 |

---

## 보안 기능 상세

### 1. 비밀번호 해시 함수 (bcrypt)

**구현 위치**: `backend/src/modules/auth/authService.js`

**기능**:
- bcrypt를 사용한 비밀번호 해시
- Salt rounds: 10
- 단방향 암호화

**사용 예시**:
```javascript
const passwordHash = await AuthService.hashPassword('password123');
const isValid = await AuthService.comparePassword('password123', passwordHash);
```

**보안 수준**: ✅ 높음
- bcrypt는 업계 표준 해시 알고리즘
- Salt를 자동으로 생성하여 레인보우 테이블 공격 방어

---

### 2. JWT 토큰 암호화

**구현 위치**: `backend/src/utils/jwt.js`

**기능**:
- jsonwebtoken을 사용한 JWT 토큰 생성 및 검증
- 환경 변수로 시크릿 키 관리
- 토큰 만료 시간 설정 (기본: 24시간)

**사용 예시**:
```javascript
const token = generateToken(userId, email, role);
const decoded = verifyToken(token);
```

**보안 수준**: ✅ 높음
- HS256 알고리즘 사용
- 환경 변수로 시크릿 키 관리
- 토큰 만료 시간 설정

**주의사항**:
- 프로덕션 환경에서는 반드시 강력한 JWT_SECRET 사용
- 기본 시크릿 키는 개발 환경에서만 사용

---

### 3. SQL Injection 방어

**구현 위치**: 모든 모델 파일 (`User.js`, `Tracking.js`, `Purchase.js` 등)

**기능**:
- PostgreSQL Prepared Statement 사용
- 파라미터화된 쿼리 ($1, $2 등)
- 사용자 입력을 직접 쿼리에 포함하지 않음

**사용 예시**:
```javascript
// ✅ 안전한 방법
const query = 'SELECT * FROM users WHERE email = $1';
const result = await pool.query(query, [email]);

// ❌ 위험한 방법 (사용하지 않음)
const query = `SELECT * FROM users WHERE email = '${email}'`;
```

**보안 수준**: ✅ 높음
- PostgreSQL의 Prepared Statement는 SQL Injection을 완전히 방어
- 모든 모델에서 일관되게 사용

---

### 4. XSS 방어

**구현 위치**: `backend/src/middleware/security.js`

**기능**:
- Helmet.js를 사용한 보안 헤더 설정
- Content Security Policy (CSP)
- XSS Filter
- HSTS (HTTP Strict Transport Security)
- Clickjacking 방어

**적용된 헤더**:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security`
- `Content-Security-Policy`

**보안 수준**: ✅ 높음
- Helmet.js는 Express의 표준 보안 미들웨어
- 다층 방어 체계

---

### 5. 입력 값 검증 미들웨어

**구현 위치**: `backend/src/middleware/validator.js`

**기능**:
- 이메일 형식 검증
- 비밀번호 강도 검증
- 필수 필드 검증
- 문자열 길이 검증
- 숫자 범위 검증

**사용 예시**:
```javascript
// 라우트에 적용
router.post('/register', validateRegisterInput, AuthController.register);
router.post('/login', validateLoginInput, AuthController.login);
router.get('/:id/tracking', validateNumericId('id'), Controller.getTracking);
```

**보안 수준**: ✅ 높음
- 재사용 가능한 검증 미들웨어
- 표준화된 검증 규칙
- 일관된 에러 메시지

---

### 6. 입력 Sanitization

**구현 위치**: `backend/src/middleware/sanitizer.js`

**기능**:
- HTML 태그 제거
- 특수 문자 정리
- 공백 정리
- 객체의 모든 문자열 필드 정리

**사용 예시**:
```javascript
// app.js에 전역 적용
app.use(sanitizeAll);

// 또는 개별 적용
app.use(sanitizeBody);
app.use(sanitizeQuery);
app.use(sanitizeParams);
```

**보안 수준**: ✅ 중간-높음
- 기본적인 XSS 방어
- HTML 태그 제거로 스크립트 주입 방어

---

## 사용 방법

### 1. 보안 헤더 설정

**위치**: `backend/src/app.js`

```javascript
const { setupSecurityHeaders } = require('./middleware/security');

// 가장 먼저 적용
setupSecurityHeaders(app);
```

### 2. 입력 Sanitization 적용

**위치**: `backend/src/app.js`

```javascript
const { sanitizeAll } = require('./middleware/sanitizer');

// JSON 파싱 후 적용
app.use(sanitizeAll);
```

### 3. 입력 검증 미들웨어 적용

**위치**: 라우트 파일

```javascript
const { validateRegisterInput, validateLoginInput, validateNumericId } = require('../../middleware/validator');

router.post('/register', validateRegisterInput, Controller.register);
router.get('/:id', validateNumericId('id'), Controller.get);
```

---

## 보안 체크리스트

### ✅ 완료된 항목

- [x] 비밀번호 해시 함수 (bcrypt) 구현
- [x] JWT 토큰 암호화 구현
- [x] SQL Injection 방어 (Prepared Statement)
- [x] XSS 방어 (보안 헤더, sanitization)
- [x] 입력 값 검증 미들웨어
- [x] 입력 sanitization 미들웨어

### ⚪ 향후 구현 (선택사항)

- [ ] Rate Limiting (요청 제한)
- [ ] CSRF Protection (CSRF 토큰)
- [ ] 보안 로깅 및 모니터링
- [ ] 2단계 인증 (2FA)
- [ ] 비밀번호 재설정 기능
- [ ] 세션 관리

---

## 보안 모범 사례

### 1. 환경 변수 관리

- `.env` 파일을 `.gitignore`에 추가
- 프로덕션 환경에서는 강력한 시크릿 키 사용
- 기본값은 개발 환경에서만 사용

### 2. 에러 메시지

- 상세한 에러 정보는 개발 환경에서만 제공
- 프로덕션에서는 일반적인 메시지만 제공
- 스택 트레이스는 로그에만 기록

### 3. 입력 검증

- 클라이언트와 서버 양쪽에서 검증
- 화이트리스트 방식 사용 (허용된 값만)
- 블랙리스트는 피하기

### 4. 보안 업데이트

- 정기적으로 의존성 패키지 업데이트
- 보안 취약점 알림 모니터링
- 보안 패치 즉시 적용

---

**작성일**: 2025-12-15  
**최종 업데이트**: 2025-12-15

