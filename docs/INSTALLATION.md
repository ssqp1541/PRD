# 설치 및 실행 가이드

> 솔직한 한 잔 (Honest Cup) 프로젝트 설치 및 실행 방법

## 📋 목차

1. [사전 요구사항](#사전-요구사항)
2. [프로젝트 클론](#프로젝트-클론)
3. [환경 변수 설정](#환경-변수-설정)
4. [Docker를 사용한 실행 (권장)](#docker를-사용한-실행-권장)
5. [로컬 개발 환경 설정](#로컬-개발-환경-설정)
6. [개별 서비스 실행](#개별-서비스-실행)
7. [문제 해결](#문제-해결)

---

## 사전 요구사항

프로젝트를 실행하기 전에 다음 소프트웨어가 설치되어 있어야 합니다:

### 필수 요구사항

- **Node.js** (v18 이상 권장)
  - [Node.js 공식 사이트](https://nodejs.org/)에서 다운로드
  - 설치 확인: `node --version`
  
- **npm** 또는 **yarn** (Node.js와 함께 설치됨)
  - 설치 확인: `npm --version` 또는 `yarn --version`

- **Git**
  - [Git 공식 사이트](https://git-scm.com/)에서 다운로드
  - 설치 확인: `git --version`

### Docker를 사용하는 경우 (권장)

- **Docker Desktop** (v20 이상)
  - [Docker Desktop 공식 사이트](https://www.docker.com/products/docker-desktop)에서 다운로드
  - 설치 확인: `docker --version`
  
- **Docker Compose** (v2 이상, Docker Desktop에 포함됨)
  - 설치 확인: `docker-compose --version`

### 선택적 요구사항

- **PostgreSQL** (로컬 개발 시 직접 설치하는 경우)
  - [PostgreSQL 공식 사이트](https://www.postgresql.org/download/)에서 다운로드
  - Docker를 사용하는 경우 불필요

---

## 프로젝트 클론

```bash
# GitHub에서 프로젝트 클론
git clone https://github.com/ssqp1541/PRD.git

# 프로젝트 디렉토리로 이동
cd PRD

# Coffee 브랜치로 전환
git checkout Coffee

# 또는 Coffee 디렉토리로 직접 이동
cd Coffee
```

---

## 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 필요한 환경 변수를 설정합니다.

### 루트 `.env` 파일 (선택사항)

```env
# 프로젝트 환경
NODE_ENV=development

# 데이터베이스 설정 (Docker 사용 시)
DATABASE_URL=postgresql://user:password@localhost:5432/honestcup

# API 키 및 기타 설정
# API_KEY=your_api_key_here
# BLOCKCHAIN_NETWORK=testnet
```

### 프론트엔드 `.env` 파일

`frontend/.env` 파일 생성:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_BLOCKCHAIN_NETWORK=testnet
```

### 백엔드 `.env` 파일

`backend/.env` 파일 생성:

```env
NODE_ENV=development
PORT=8000
DATABASE_URL=postgresql://user:password@localhost:5432/honestcup
JWT_SECRET=your_jwt_secret_here
BCRYPT_ROUNDS=10
```

> **보안 주의사항**: `.env` 파일은 절대 Git에 커밋하지 마세요. `.gitignore`에 이미 포함되어 있습니다.

---

## Docker를 사용한 실행 (권장)

Docker를 사용하면 모든 의존성과 서비스를 자동으로 설정하고 실행할 수 있습니다.

### 1. Docker 서비스 시작

```bash
# 프로젝트 루트에서 실행
docker-compose up -d
```

이 명령은 다음 서비스를 시작합니다:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **Database**: localhost:5432

### 2. 서비스 상태 확인

```bash
# 실행 중인 컨테이너 확인
docker-compose ps

# 로그 확인
docker-compose logs -f

# 특정 서비스 로그만 확인
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f db
```

### 3. 서비스 중지

```bash
# 서비스 중지
docker-compose stop

# 서비스 중지 및 컨테이너 제거
docker-compose down

# 볼륨까지 제거 (데이터 삭제)
docker-compose down -v
```

### 4. 데이터베이스 마이그레이션 실행

```bash
# 백엔드 컨테이너에서 마이그레이션 실행
docker-compose exec backend npm run migrate

# 또는 직접 접속
docker-compose exec backend sh
```

---

## 로컬 개발 환경 설정

Docker 없이 로컬에서 직접 실행하는 방법입니다.

### 1. 데이터베이스 설정

#### PostgreSQL 직접 설치한 경우

```bash
# PostgreSQL 서비스 시작 (OS에 따라 다름)
# Windows: 서비스 관리자에서 PostgreSQL 서비스 시작
# macOS: brew services start postgresql
# Linux: sudo systemctl start postgresql

# 데이터베이스 생성
createdb honestcup

# 또는 psql 사용
psql -U postgres
CREATE DATABASE honestcup;
```

#### Docker로 PostgreSQL만 실행하는 경우

```bash
# PostgreSQL 컨테이너만 실행
docker run --name honestcup-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=honestcup \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### 2. 프론트엔드 설정

```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm run dev
# 또는
yarn dev
```

프론트엔드는 http://localhost:3000 에서 실행됩니다.

### 3. 백엔드 설정

```bash
# 백엔드 디렉토리로 이동
cd backend

# 의존성 설치
npm install
# 또는
yarn install

# 데이터베이스 마이그레이션 실행
npm run migrate
# 또는
yarn migrate

# 개발 서버 실행
npm run dev
# 또는
yarn dev
```

백엔드는 http://localhost:8000 에서 실행됩니다.

---

## 개별 서비스 실행

### 프론트엔드만 실행

```bash
cd frontend
npm install
npm run dev
```

### 백엔드만 실행

```bash
cd backend
npm install
npm run migrate  # 첫 실행 시
npm run dev
```

### 데이터베이스만 실행 (Docker)

```bash
docker run --name honestcup-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=honestcup \
  -p 5432:5432 \
  -d postgres:15-alpine
```

---

## 문제 해결

### 포트 충돌

포트가 이미 사용 중인 경우:

```bash
# Windows에서 포트 사용 확인
netstat -ano | findstr :3000
netstat -ano | findstr :8000
netstat -ano | findstr :5432

# Linux/macOS에서 포트 사용 확인
lsof -i :3000
lsof -i :8000
lsof -i :5432
```

`docker-compose.yml`에서 포트 번호를 변경할 수 있습니다.

### Docker 컨테이너 문제

```bash
# 컨테이너 재시작
docker-compose restart

# 컨테이너 재빌드
docker-compose build --no-cache
docker-compose up -d

# 모든 컨테이너 및 볼륨 제거 후 재시작
docker-compose down -v
docker-compose up -d
```

### 데이터베이스 연결 오류

1. 데이터베이스가 실행 중인지 확인
2. `.env` 파일의 `DATABASE_URL` 확인
3. 방화벽 설정 확인
4. Docker 네트워크 확인: `docker network ls`

### 의존성 설치 오류

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install

# 또는 yarn 사용
rm -rf node_modules yarn.lock
yarn install
```

### 캐시 문제

```bash
# npm 캐시 클리어
npm cache clean --force

# Docker 빌드 캐시 무시
docker-compose build --no-cache
```

---

## 다음 단계

설치 및 실행이 완료되면 다음 문서를 참고하세요:

- [API 명세서](./api/README.md) - API 엔드포인트 문서
- [아키텍처 문서](./architecture/README.md) - 시스템 아키텍처 설명
- [개발 가이드](./DEVELOPMENT.md) - 개발 가이드 (작성 예정)

---

## 지원

문제가 발생하면 다음을 확인하세요:

1. 이 문서의 [문제 해결](#문제-해결) 섹션
2. 프로젝트 이슈 트래커
3. 개발팀에 문의

---

**마지막 업데이트**: 2025-12-15

