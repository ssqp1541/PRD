# 환경 변수 설정 가이드

프런트엔드 애플리케이션에서 사용하는 환경 변수에 대한 설명입니다.

## 필수 환경 변수

### `REACT_APP_API_BASE_URL`
- **설명**: 백엔드 API 서버의 기본 URL
- **기본값**: `http://localhost:3000` (개발 환경)
- **예시**: 
  - 개발: `http://localhost:3000`
  - 프로덕션: `https://api.example.com`

## 환경 변수 설정 방법

### 1. `.env` 파일 생성
프로젝트 루트(`frontend/`)에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
REACT_APP_API_BASE_URL=http://localhost:3000
```

### 2. 환경별 설정
- `.env.development`: 개발 환경용 설정
- `.env.production`: 프로덕션 환경용 설정
- `.env.local`: 로컬 환경용 설정 (git에 커밋하지 않음)

### 3. 환경 변수 사용
코드에서 환경 변수는 다음과 같이 사용합니다:

```javascript
const apiUrl = process.env.REACT_APP_API_BASE_URL;
```

**주의**: React에서 환경 변수는 `REACT_APP_` 접두사가 있어야 합니다.

## 참고사항

- 환경 변수를 변경한 후에는 개발 서버를 재시작해야 합니다.
- `.env` 파일은 절대 git에 커밋하지 마세요. `.gitignore`에 포함되어 있습니다.
- 프로덕션 환경에서는 환경 변수가 필수입니다.

