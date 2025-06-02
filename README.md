# 🏢 CKU 기숙사 관리 시스템

<div align="center">
  <img src="https://img.shields.io/badge/react-18.0.0-61DAFB?style=flat&logo=react"/>
  <img src="https://img.shields.io/badge/typescript-5.0.0-3178C6?style=flat&logo=typescript"/>
  <img src="https://img.shields.io/badge/tailwindcss-3.0.0-06B6D4?style=flat&logo=tailwindcss"/>
  <img src="https://img.shields.io/badge/license-MIT-green"/>
</div>

<div align="center">
  <h3>🎯 천강대학교 기숙사 관리를 위한 웹 기반 관리 시스템</h3>
  <p>학생 관리, 호실 관리, 시설 관리, 식단 관리 등 기숙사 운영에 필요한 모든 기능을 제공합니다.</p>
</div>

## ✨ 주요 기능

<div align="center">
  <img src="https://user-images.githubusercontent.com/your-username/CKUDorm_Web/assets/preview.png" alt="CKU 기숙사 관리 시스템 미리보기" width="800"/>
</div>

### 🎓 학생 관리
- ✅ 학생 정보 등록 및 조회
- 🔍 상세 검색 기능 (이름, 학번, 호실, 상태 등)
- ⭐ 상벌점 관리 시스템
- 📊 엑셀 다운로드 기능

### 🏠 호실 관리
- 🔄 호실 배정 및 변경 관리
- 📋 호실별 학생 현황 조회

### 🛠 시설 관리
- 📝 시설물 수리 신청 접수 및 처리
- 📊 수리 현황 모니터링

### 🍽 식단 관리
- 📅 주간/월간 식단 등록 및 조회
- 🍳 식단 정보 관리

### 💬 Q&A 게시판
- ❓ 질문 등록 및 답변
- 🏷 카테고리별 조회 기능

## 🛠 기술 스택

<div align="center">
  <table>
    <tr>
      <th>분류</th>
      <th>기술</th>
    </tr>
    <tr>
      <td>Frontend</td>
      <td>
        <img src="https://img.shields.io/badge/react-61DAFB?style=flat&logo=react&logoColor=black"/>
        <img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>
        <img src="https://img.shields.io/badge/reactrouter-CA4245?style=flat&logo=reactrouter&logoColor=white"/>
        <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td>라이브러리</td>
      <td>
        <img src="https://img.shields.io/badge/echarts-AA344D?style=flat&logo=apacheecharts&logoColor=white"/>
        <img src="https://img.shields.io/badge/xlsx-217346?style=flat&logo=microsoftexcel&logoColor=white"/>
      </td>
    </tr>
  </table>
</div>

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 방법

1️⃣ 저장소 클론
```bash
git clone https://github.com/your-username/CKUDorm_Web.git
cd CKUDorm_Web
```

2️⃣ 의존성 설치
```bash
npm install
# 또는
yarn install
```

3️⃣ 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

4️⃣ 빌드
```bash
npm run build
# 또는
yarn build
```

## 📁 프로젝트 구조

```
src/
├── 📂 api/          # API 타입 정의 및 통신 로직
├── 📂 components/   # 재사용 가능한 컴포넌트
├── 📂 constants/    # 상수 정의
├── 📂 pages/        # 페이지 컴포넌트
│   ├── 📂 dashboard/
│   ├── 📂 student/
│   ├── 📂 room/
│   ├── 📂 repair/
│   ├── 📂 meal/
│   └── 📂 qna/
└── 📂 types/        # 타입 정의
```

## 📱 주요 페이지 및 기능

<details>
<summary><b>🎓 학생 관리 (/student)</b></summary>
<br>
- 학생 목록 조회 및 검색
- 학생 등록 폼
- 엑셀 다운로드
- 상세 검색 필터
</details>

<details>
<summary><b>👤 학생 상세 정보 (/student/:id)</b></summary>
<br>
- 기본 정보 표시
- 상벌점 현황 및 이력
- 상벌점 부여 기능
</details>

<details>
<summary><b>🏠 호실 변경 관리 (/room-change)</b></summary>
<br>
- 호실 변경 신청 목록
- 호실 배정 현황
- 변경 요청 처리
</details>

<details>
<summary><b>🛠 시설 보수 관리 (/repair)</b></summary>
<br>
- 수리 신청 목록
- 처리 상태 관리
- 신청 내역 조회
</details>

<details>
<summary><b>💬 Q&A 게시판 (/qna)</b></summary>
<br>
- 질문 목록 및 상세 보기
- 답변 등록 및 수정
- 카테고리별 필터링
</details>

## 🤝 기여 방법

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

<div align="center">
  <sub>Built with ❤️ by CKU Dormitory Management Team</sub>
</div> 