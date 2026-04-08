# DreamIT Statistics - 개발 문서

## 프로젝트 개요

DreamIT Statistics는 통계학 학습 플랫폼으로, 8개 카테고리(48개 토픽)의 통계학 콘텐츠를 한국어/영어 이중 언어로 제공합니다.

- **도메인**: https://statistics.dreamitbiz.com
- **프레임워크**: React 19 + TypeScript + Vite 7
- **인증**: Supabase (Google/Kakao OAuth)
- **배포**: GitHub Pages

## 학습 카테고리 (8개)

| # | 카테고리 | 영문명 | 색상 | 경로 |
|---|---------|--------|------|------|
| 1 | 기술통계학 | Descriptive Statistics | #1D4ED8 | /descriptive-statistics |
| 2 | 확률론 | Probability Theory | #7C3AED | /probability |
| 3 | 추론통계학 | Inferential Statistics | #0891B2 | /inferential-statistics |
| 4 | 가설검정 | Hypothesis Testing | #DC2626 | /hypothesis-testing |
| 5 | 회귀분석 | Regression Analysis | #059669 | /regression |
| 6 | 분산분석 | ANOVA | #D97706 | /anova |
| 7 | 비모수통계 | Nonparametric Statistics | #E11D48 | /nonparametric |
| 8 | 베이지안통계 | Bayesian Statistics | #6D28D9 | /bayesian |

각 카테고리는 6개의 세부 토픽으로 구성되어 총 48개 토픽을 제공합니다.

## 기술 스택

- **React 19** — UI 라이브러리
- **TypeScript** — 정적 타입 검사
- **Vite 7** — 빌드 도구 (포트: 5183)
- **React Router DOM 7** — 클라이언트 사이드 라우팅
- **Supabase** — 인증 및 데이터베이스
- **GitHub Pages** — 정적 사이트 호스팅

## 프로젝트 구조

```
statistics/
├── public/
│   ├── CNAME                    # 커스텀 도메인
│   ├── favicon.svg              # 파비콘
│   └── og-image.png             # OG 이미지 (1200x630)
├── scripts/
│   ├── generate-og-image.mjs    # OG 이미지 생성 스크립트
│   └── supabase-setup.sql       # Supabase DB 설정
├── src/
│   ├── config/
│   │   ├── site.ts              # 사이트 설정 & 학습 경로
│   │   └── admin.ts             # 관리자 설정
│   ├── types/
│   │   └── index.ts             # TypeScript 타입 정의
│   ├── contexts/
│   │   ├── ThemeContext.tsx      # 테마 (5색 + 다크모드)
│   │   ├── LanguageContext.tsx   # 언어 (한국어/영어)
│   │   ├── AuthContext.tsx       # Supabase 인증
│   │   └── ToastContext.tsx      # 토스트 알림
│   ├── utils/
│   │   ├── supabase.ts          # Supabase 클라이언트
│   │   ├── auth.ts              # 인증 유틸리티
│   │   └── translations.ts      # 번역 데이터
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # 내비게이션 바
│   │   │   └── Footer.tsx       # 푸터
│   │   ├── SEOHead.tsx          # SEO 메타 태그
│   │   ├── TipBox.tsx           # 팁/경고 박스
│   │   ├── FeatureCard.tsx      # 특징 카드
│   │   ├── HeroBackground.tsx   # 히어로 배경
│   │   └── HeroCarousel.tsx     # 히어로 캐러셀
│   ├── layouts/
│   │   └── PublicLayout.tsx     # 레이아웃 + 라우팅
│   ├── pages/
│   │   ├── Home.tsx             # 홈 페이지
│   │   ├── Login.tsx            # 로그인 페이지
│   │   ├── NotFound.tsx         # 404 페이지
│   │   ├── descriptive-statistics/
│   │   ├── probability/
│   │   ├── inferential-statistics/
│   │   ├── hypothesis-testing/
│   │   ├── regression/
│   │   ├── anova/
│   │   ├── nonparametric/
│   │   └── bayesian/
│   ├── styles/                  # CSS 파일 (11개)
│   ├── App.tsx                  # 앱 루트
│   ├── main.tsx                 # 엔트리 포인트
│   └── index.css                # CSS 임포트
├── Dev_md/
│   └── DEVELOPMENT.md           # 이 파일
├── package.json
├── vite.config.ts               # Vite 설정 (포트 5183)
├── tsconfig.json
└── index.html
```

## 테마 시스템

5가지 컬러 테마 + 자동/라이트/다크 모드:

| 테마 | 기본 색상 | CSS 변수 |
|------|----------|---------|
| 다크블루 (기본) | #1D4ED8 | `--primary` |
| 세이프티 | #059669 | `--primary` |
| 포레스트 | #15803D | `--primary` |
| 선셋 | #EA580C | `--primary` |
| 체리 | #DC2626 | `--primary` |

테마는 쿠키에 저장되어 새로고침 시에도 유지됩니다.

## Supabase 설정

- **프로젝트**: hcmgdztsgjvzcyxyayaj
- **테이블 접두사**: `statistics_`
- **주요 테이블**: `statistics_user_profiles`
- **인증**: Google OAuth, Kakao OAuth
- **RLS**: 사용자별 프로필 접근 제한

`scripts/supabase-setup.sql`을 Supabase SQL 에디터에서 실행하여 테이블과 트리거를 생성합니다.

## 개발 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 (포트 5183)
npm run dev

# TypeScript 타입 체크
npx tsc --noEmit

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# OG 이미지 생성
npm run generate-og

# GitHub Pages 배포
npx gh-pages -d dist
```

## 학습 페이지 패턴

모든 학습 페이지는 동일한 구조를 따릅니다:

1. **SECTIONS 배열** — 6개 섹션 (id, icon, ko, en)
2. **사이드바** — 섹션 네비게이션
3. **콘텐츠** — 활성 섹션 렌더링
4. **이전/다음** — 섹션 간 이동 버튼
5. **출처** — 참고자료 섹션

## 배포

GitHub Pages에 배포됩니다:
1. `npm run build` — dist 폴더 생성
2. `npx gh-pages -d dist` — gh-pages 브랜치에 배포
3. CNAME 파일이 `statistics.dreamitbiz.com`을 가리킴
