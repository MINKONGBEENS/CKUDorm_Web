# 🏢 CKU 기숙사 관리 시스템

<div align="center">

![CKU Dormitory Management System](https://via.placeholder.com/800x400?text=CKU+Dormitory+Management+System)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0.0-E0234E?logo=nestjs)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0-336791?logo=postgresql)](https://www.postgresql.org/)

</div>

## 📋 프로젝트 개요

가톨릭관동대학교 기숙사 관리 시스템은 기숙사 운영의 효율성을 높이고 입주생들에게 더 나은 서비스를 제공하기 위한 웹 기반 통합 관리 시스템입니다.

### 🎯 주요 기능

- **입주생 관리**: 입주생 정보 관리, 호실 배정, 상벌점 관리
- **시설 관리**: 시설물 점검, 수리 요청 처리, 비품 관리
- **식단 관리**: 식단 등록, 영양 정보 관리, 만족도 조사
- **공지사항**: 공지 등록, 알림 발송, 열람 통계
- **외박 관리**: 외박 신청, 승인 처리, 현황 관리
- **관리자 기능**: 권한 관리, 통계 분석, 리포트 생성

## 🛠 기술 스택

### 프론트엔드
- React 18.2.0
- TypeScript 5.0.0
- Zustand 4.4.1
- TailwindCSS 3.3.0

### 백엔드
- NestJS 10.0.0
- TypeORM 0.3.17
- PostgreSQL 15.0
- Redis 7.0

## 📚 프로젝트 구조

```
src/
├── frontend/
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── pages/         # 페이지 컴포넌트
│   ├── stores/        # Zustand 상태 관리
│   └── utils/         # 유틸리티 함수
│
├── backend/
│   ├── controllers/   # API 컨트롤러
│   ├── services/      # 비즈니스 로직
│   ├── entities/      # 데이터베이스 모델
│   └── utils/         # 유틸리티 함수
│
└── docs/             # 프로젝트 문서
    ├── 요구사항분석서.md
    └── API문서.md
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.x 이상
- PostgreSQL 15.x
- Redis 7.x

### 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/your-username/ckudorm-web.git
cd ckudorm-web
```

2. 의존성 설치
```bash
# 프론트엔드
cd frontend
npm install

# 백엔드
cd backend
npm install
```

3. 환경 변수 설정
```bash
# .env 파일 생성
cp .env.example .env
```

4. 개발 서버 실행
```bash
# 프론트엔드 (http://localhost:3000)
npm run dev

# 백엔드 (http://localhost:4000)
npm run start:dev
```

## 📖 문서

- [요구사항 분석서](docs/요구사항분석서.md)
- [API 문서](http://localhost:4000/api)
- [컴포넌트 문서](http://localhost:6006)

## 🔒 보안

- JWT 기반 인증
- RBAC 권한 관리
- SSL/TLS 암호화
- 데이터 암호화 (AES-256)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스로 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👥 팀원

- 홍길동 - 프론트엔드 개발
- 김철수 - 백엔드 개발
- 이영희 - UI/UX 디자인
- 박지민 - 품질 관리

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 아래로 연락해주세요:

- Email: support@ckudorm.com
- Issue: [GitHub Issues](https://github.com/your-username/ckudorm-web/issues) 