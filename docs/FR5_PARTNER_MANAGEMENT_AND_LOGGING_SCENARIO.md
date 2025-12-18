# FR5: 파트너 관리 및 로깅 시스템 최소 단위 구현 시나리오

> README.md 404-411 라인: FR5 파트너 관리 및 로깅 시스템 최소 구현 계획

**작성일**: 2025-12-15  
**목표**: FR5 테스트 통과 및 로깅 시스템 구축을 위한 최소 구현  
**방법론**: TDD (Test-Driven Development) - Red → Green 단계

---

## 📋 목차

1. [시나리오 개요](#시나리오-개요)
2. [FR5: 파트너 관리 구현 계획](#fr5-파트너-관리-구현-계획)
3. [로깅 및 모니터링 구현 계획](#로깅-및-모니터링-구현-계획)
4. [현재 상태 확인](#현재-상태-확인)
5. [승인 요청](#승인-요청)

---

## 시나리오 개요

### 목표

FR5 테스트를 통과하고 로깅 시스템을 구축하기 위한 최소한의 구현을 완료합니다.

### 사용자 스토리

```
Given 입점 로스터리 관리자가 파트너 전용 대시보드에 접속했을 때
When 관리자가 '정산 보고서' 탭을 선택하고 기간을 설정하면
Then 총 판매액, 플랫폼 수수료, 최종 정산 예정 금액이 명확하게 표시되어야 한다.
```

### 구현 원칙

1. **테스트 우선**: 먼저 테스트 작성 (Red 단계)
2. **최소 기능**: 테스트를 통과시키는 최소한의 코드만 구현
3. **데이터베이스 활용**: 이미 생성된 `orders`, `partners` 테이블 사용
4. **로깅 시스템**: 체계적인 로깅 및 에러 추적

### 구현 범위

#### ✅ 포함 사항

**FR5: 파트너 관리**
- 테스트 작성 (13개 케이스)
- 정산 계산 로직 (판매액, 수수료, 최종 정산액)
- 파트너 대시보드 구현
- 정산 보고서 API
- 기간별 필터링

**로깅 및 모니터링**
- 로깅 시스템 구축 (파일 로깅, 로그 레벨)
- 에러 로깅 개선
- 로그 파일 관리

#### ⚪ 제외 사항 (향후 구현)
- 고급 대시보드 기능 (차트, 그래프)
- 실시간 알림
- 로그 분석 도구 연동
- 로그 아카이빙
- 모니터링 대시보드

---

## FR5: 파트너 관리 구현 계획

### 1. 테스트 작성 계획 (Red 단계)

#### 백엔드 테스트 (6개 케이스)

**파일**: `backend/tests/modules/partner/settlement.test.js`

1. **정산 데이터 조회 API 테스트**
   - `GET /api/partner/settlement` - 200 상태 코드 반환
   - 파트너 권한 검증

2. **기간별 판매액 집계 테스트**
   - 시작일/종료일 파라미터 처리
   - 해당 기간의 주문 금액 합계 계산

3. **플랫폼 수수료 계산 테스트**
   - 수수료율 적용 (예: 10%)
   - 수수료 금액 계산 검증

4. **최종 정산 금액 계산 테스트**
   - 총 판매액 - 플랫폼 수수료 = 최종 정산액
   - 계산 로직 정확성 검증

5. **기간 필터링 검증**
   - 시작일/종료일 범위 검증
   - 잘못된 날짜 형식 처리

6. **권한 검증 테스트**
   - 파트너가 아닌 사용자 접근 차단
   - 인증되지 않은 사용자 접근 차단

#### 프론트엔드 테스트 (7개 케이스)

**파일**: `frontend/src/pages/Partner/__tests__/SettlementReport.test.jsx`

1. **파트너 대시보드 렌더링**
   - 대시보드 컴포넌트 렌더링 확인

2. **정산 보고서 탭 렌더링**
   - '정산 보고서' 탭 UI 확인

3. **기간 선택 UI**
   - 시작일/종료일 입력 필드 렌더링

4. **정산 데이터 표시**
   - API 호출 및 데이터 표시 확인

5. **총 판매액 표시**
   - 총 판매액 수치 표시 확인

6. **플랫폼 수수료 표시**
   - 플랫폼 수수료 수치 표시 확인

7. **최종 정산 금액 표시**
   - 최종 정산 예정 금액 표시 확인

### 2. 백엔드 구현 계획

#### 2.1 프로젝트 구조

```
backend/src/
├── modules/
│   └── partner/
│       ├── settlementController.js    # 컨트롤러 (신규)
│       ├── settlementService.js       # 서비스 (신규)
│       └── partnerRoutes.js           # 라우트 (신규)
└── models/
    └── Order.js                       # Order 모델 (신규)
```

#### 2.2 구현 파일 상세

**Order 모델 (`models/Order.js`)**

**기능**:
- 데이터베이스에서 주문 조회
- 파트너별 기간별 주문 집계

**메서드**:
```javascript
- findByPartnerIdAndDateRange(partnerId, startDate, endDate)
- calculateTotalSales(partnerId, startDate, endDate)
```

**SettlementService (`modules/partner/settlementService.js`)**

**기능**:
- 정산 데이터 계산
- 플랫폼 수수료 계산
- 최종 정산액 계산

**함수**:
```javascript
- calculateSettlement(partnerId, startDate, endDate)
```

**계산 로직**:
- 총 판매액 = 기간 내 주문 금액 합계
- 플랫폼 수수료 = 총 판매액 × 수수료율 (10%)
- 최종 정산액 = 총 판매액 - 플랫폼 수수료

**SettlementController (`modules/partner/settlementController.js`)**

**기능**:
- HTTP 요청/응답 처리
- 쿼리 파라미터 파싱 (시작일, 종료일)
- 권한 검증
- 에러 처리

**엔드포인트 핸들러**:
```javascript
- getSettlement(req, res, next)
```

**PartnerRoutes (`modules/partner/partnerRoutes.js`)**

**라우트 정의**:
```javascript
GET /api/partner/settlement
```

### 3. API 명세

**엔드포인트**: `GET /api/partner/settlement`

**쿼리 파라미터**:
- `startDate` (string, 필수): 시작일 (YYYY-MM-DD)
- `endDate` (string, 필수): 종료일 (YYYY-MM-DD)

**인증**: 파트너 권한 필요

**성공 응답** (200 OK):
```json
{
  "success": true,
  "settlement": {
    "partnerId": 1,
    "partnerName": "로스터리 A",
    "period": {
      "startDate": "2025-01-01",
      "endDate": "2025-01-31"
    },
    "totalSales": 5000000.00,
    "platformFee": 500000.00,
    "finalAmount": 4500000.00,
    "orderCount": 150
  }
}
```

**에러 응답** (400 Bad Request):
```json
{
  "success": false,
  "message": "유효하지 않은 날짜 형식입니다.",
  "error": "INVALID_DATE_FORMAT"
}
```

**에러 응답** (403 Forbidden):
```json
{
  "success": false,
  "message": "파트너 권한이 필요합니다.",
  "error": "FORBIDDEN"
}
```

### 4. 프론트엔드 구현 계획

#### 4.1 프로젝트 구조

```
frontend/src/
├── pages/
│   └── Partner/
│       ├── PartnerDashboard.jsx      # 대시보드 (신규)
│       ├── SettlementReport.jsx       # 정산 보고서 (신규)
│       └── __tests__/
│           └── SettlementReport.test.jsx # 테스트 (신규)
└── services/
    └── api/
        └── partnerApi.js              # API 클라이언트 (신규)
```

#### 4.2 구현 파일 상세

**PartnerDashboard 컴포넌트 (`pages/Partner/PartnerDashboard.jsx`)**

**기능**:
- 파트너 대시보드 메인 페이지
- 탭 네비게이션 (정산 보고서 등)
- 파트너 정보 표시

**UI 요소**:
- 탭 메뉴
- 콘텐츠 영역

**SettlementReport 컴포넌트 (`pages/Partner/SettlementReport.jsx`)**

**기능**:
- 정산 보고서 UI
- 기간 선택 (시작일/종료일)
- 정산 데이터 표시
- 로딩 및 에러 상태 처리

**상태 관리**:
```javascript
- startDate: string
- endDate: string
- settlement: Object
- isLoading: boolean
- error: string | null
```

**partnerApi (`services/api/partnerApi.js`)**

**함수**:
```javascript
- getSettlement(startDate, endDate)
```

---

## 로깅 및 모니터링 구현 계획

### 1. 현재 상태

**기존 로깅 시스템**:
- `backend/src/middleware/logger.js` - 기본 HTTP 요청/에러 로깅
- `console.log`, `console.error` 사용
- 파일 로깅 없음
- 로그 레벨 관리 없음

### 2. 개선 계획

#### 2.1 로깅 시스템 구축

**파일**: `backend/src/utils/logger.js` (신규)

**기능**:
- 파일 로깅 (winston 또는 기본 fs 모듈)
- 로그 레벨 관리 (error, warn, info, debug)
- 로그 파일 관리 (일별 로그 파일)
- 로그 포맷팅

**구현 방법**:
- **옵션 1**: winston 라이브러리 사용 (권장)
- **옵션 2**: 기본 fs 모듈 사용 (최소 구현)

**로그 레벨**:
- `error`: 에러 로그
- `warn`: 경고 로그
- `info`: 정보 로그
- `debug`: 디버그 로그

**로그 파일 구조**:
```
backend/logs/
├── error-2025-12-15.log
├── combined-2025-12-15.log
└── ...
```

#### 2.2 에러 로깅 개선

**파일**: `backend/src/middleware/logger.js` (업데이트)

**개선 사항**:
- 파일 로깅 통합
- 상세한 에러 정보 기록
- 요청 컨텍스트 정보 포함
- 스택 트레이스 저장

**에러 로그 형식**:
```json
{
  "timestamp": "2025-12-15T10:30:00.000Z",
  "level": "error",
  "message": "Database connection failed",
  "stack": "...",
  "request": {
    "method": "GET",
    "url": "/api/products",
    "ip": "127.0.0.1"
  }
}
```

#### 2.3 로그 파일 관리

**기능**:
- 일별 로그 파일 생성
- 로그 파일 크기 제한
- 오래된 로그 파일 자동 삭제 (선택적)

---

## 현재 상태 확인

### ✅ 이미 구현된 항목

1. **기본 로깅 미들웨어** (`backend/src/middleware/logger.js`)
   - HTTP 요청 로깅
   - 기본 에러 로깅
   - ⚠️ 파일 로깅 없음 (개선 필요)

2. **데이터베이스 스키마**
   - `partners` 테이블
   - `orders` 테이블
   - 관계 설정 완료

### ⚪ 미구현 항목

1. **FR5: 파트너 관리**
   - 테스트 작성
   - 정산 계산 로직
   - 파트너 대시보드
   - 정산 보고서 API

2. **로깅 시스템**
   - 파일 로깅
   - 로그 레벨 관리
   - 로그 파일 관리

---

## 구현 파일 목록

### FR5: 파트너 관리

#### 테스트 파일 (2개)
1. `backend/tests/modules/partner/settlement.test.js` - 백엔드 테스트 (신규)
2. `frontend/src/pages/Partner/__tests__/SettlementReport.test.jsx` - 프론트엔드 테스트 (신규)

#### 백엔드 파일 (4개)
3. `backend/src/models/Order.js` - Order 모델 (신규)
4. `backend/src/modules/partner/settlementService.js` - 정산 서비스 (신규)
5. `backend/src/modules/partner/settlementController.js` - 정산 컨트롤러 (신규)
6. `backend/src/modules/partner/partnerRoutes.js` - 파트너 라우트 (신규)
7. `backend/src/routes/index.js` - 라우트 통합 (업데이트)

#### 프론트엔드 파일 (3개)
8. `frontend/src/pages/Partner/PartnerDashboard.jsx` - 파트너 대시보드 (신규)
9. `frontend/src/pages/Partner/SettlementReport.jsx` - 정산 보고서 (신규)
10. `frontend/src/services/api/partnerApi.js` - API 클라이언트 (신규)
11. `frontend/src/App.jsx` - 라우트 추가 (업데이트)

### 로깅 및 모니터링

#### 백엔드 파일 (2개)
12. `backend/src/utils/logger.js` - 로깅 유틸리티 (신규)
13. `backend/src/middleware/logger.js` - 로깅 미들웨어 (업데이트)
14. `backend/package.json` - winston 의존성 추가 (업데이트, 선택적)

---

## 예상 결과

### 생성될 파일
- **테스트 파일**: 2개 (신규)
- **백엔드**: 6개 파일 (신규 5개, 업데이트 1개)
- **프론트엔드**: 4개 파일 (신규 3개, 업데이트 1개)
- **로깅**: 2개 파일 (신규 1개, 업데이트 1개)
- **총 14개 파일**

### 기능
- ✅ 정산 계산 API
- ✅ 기간별 필터링
- ✅ 플랫폼 수수료 계산
- ✅ 파트너 대시보드
- ✅ 정산 보고서 UI
- ✅ 파일 로깅 시스템
- ✅ 에러 로깅 개선

---

## 승인 요청

### 구현 계획 요약

1. **FR5 테스트 작성** (Red 단계) - 2개 파일
   - 백엔드 테스트 6개 케이스
   - 프론트엔드 테스트 7개 케이스

2. **FR5 백엔드 구현** (Green 단계) - 5개 파일
   - Order 모델 생성
   - SettlementService 구현
   - SettlementController 구현
   - PartnerRoutes 생성
   - 라우트 통합 파일 업데이트

3. **FR5 프론트엔드 구현** (Green 단계) - 4개 파일
   - PartnerDashboard 컴포넌트 구현
   - SettlementReport 컴포넌트 구현
   - partnerApi 함수 구현
   - App.jsx 라우트 추가

4. **로깅 시스템 구축** - 2개 파일
   - logger.js 유틸리티 생성
   - logger.js 미들웨어 업데이트

### 예상 소요 시간

- FR5 테스트 작성: 2-3시간
- FR5 백엔드 구현: 3-4시간
- FR5 프론트엔드 구현: 3-4시간
- 로깅 시스템 구축: 2-3시간
- 테스트 및 디버깅: 1-2시간
- **총 11-16시간** (1.5-2일)

### 승인 여부

다음 작업을 진행하시겠습니까?

- [ ] ✅ **승인** - FR5 파트너 관리 및 로깅 시스템 구현 시작
- [ ] ⏸️ **보류** - 추가 검토 필요
- [ ] ✏️ **수정 요청** - 시나리오 변경 필요

**승인 시 진행할 작업**:
1. FR5 테스트 작성 (Red 단계) - 13개 케이스
2. FR5 백엔드 Order 모델 및 정산 서비스/컨트롤러/라우트 구현
3. FR5 프론트엔드 파트너 대시보드 및 정산 보고서 구현
4. partnerApi 함수 구현
5. 로깅 시스템 구축 (파일 로깅, 로그 레벨 관리)
6. 테스트 실행 및 통과 확인

---

**작성일**: 2025-12-15  
**승인 대기 중**

