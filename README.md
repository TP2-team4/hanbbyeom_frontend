# 한뼘 (hanbbyeom) - Frontend

**"필요한 활동만, 딱 한 뼘의 거리에서 함께"**

한뼘은 러닝 코스·거리·페이스·대화 수준(조용히 러닝 / 가벼운 대화)이 맞는 상대를 찾아 함께 뛰는 러닝 메이트 매칭 서비스입니다. 부담스러운 인간관계 없이, 이번 활동에 필요한 만큼만 가볍게 매칭하는 것을 목표로 합니다.

**배포 링크:** [https://hanbbyeom.vercel.app](https://hanbbyeom.vercel.app/home)

## 주요 기능

- 모집 게시판 조회 (필터·정렬·무한스크롤) 및 신청/신청 취소
- 모집글 작성·수정·취소, 신청자 확인 및 매칭 수락/거절
- 확정된 활동을 위한 1:1 채팅, 활동 완료 후 후기·노쇼 신고
- 활동 이력, 신뢰도 프로필(별점·완료 활동·노쇼 신고) 조회
- 회원가입/로그인, 닉네임·선호 대화 수준 등 마이페이지 설정

## 기술 스택

- **React 19** + **TypeScript**, **Vite**
- **React Router v7**
- **Tailwind CSS v4**
- **MSW(Mock Service Worker)** — 백엔드 API 목업
- **Vitest** — 테스트

## 프로젝트 구조

[FSD(Feature-Sliced Design)](https://feature-sliced.design/) 레이어 구조를 따릅니다.

```
src/
├─ app/       # 라우터, 전역 프로바이더 등 앱 초기화
├─ pages/     # 라우트 단위 화면
├─ widgets/   # 여러 feature/entity를 조합한 레이아웃 단위 UI (헤더, 하단 내비 등)
├─ features/  # 사용자 행동 단위 기능 (신청, 필터, 후기 작성 등)
├─ entities/  # 도메인 모델과 그 UI (모집글, 유저 프로필, 채팅방 등)
├─ shared/    # 공통 UI 컴포넌트, 유틸, API 클라이언트
└─ mocks/     # MSW 핸들러
```

## 커밋 타입

| Type     | 설명                | 예시                                |
| -------- | ------------------- | ----------------------------------- |
| Feat     | 새로운 기능 추가    | `Feat: 러닝 매칭 API 추가`          |
| Fix      | 버그 수정           | `Fix: 중복 매칭 오류 수정`          |
| Refactor | 코드 리팩토링       | `Refactor: 매칭 로직 분리`          |
| Docs     | 문서 수정           | `Docs: README 업데이트`             |
| Style    | 코드 스타일 변경    | `Style: import 정리`                |
| Test     | 테스트 추가 및 수정 | `Test: 매칭 서비스 테스트 추가`     |
| Chore    | 빌드 및 설정 변경   | `Chore: Swagger 의존성 추가`        |
| Init     | 프로젝트 초기 설정  | `Init: Spring Boot 프로젝트 초기화` |
| Rename   | 파일 및 폴더명 변경 | `Rename: 클래스명 변경`             |
| Remove   | 파일 및 코드 삭제   | `Remove: 미사용 코드 삭제`          |
| Hotfix   | 운영 환경 긴급 수정 | `Hotfix: JWT 인증 오류 수정`        |

### 예시

```
Feat: 러닝 조건 기반 매칭 API 추가

러닝 코스, 활동 시간, 페이스 범위, 대화 정도를 기준으로
호환 가능한 사용자 조회 기능 구현

```
