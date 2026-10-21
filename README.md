# 박장한 · 게임플레이 프로그래머 포트폴리오

GitHub Pages용 정적 사이트입니다. 외부 패키지와 API 키 없이 실행합니다.

## 로컬 실행

Node.js 20 이상:

```powershell
node scripts/build.mjs
node scripts/check.mjs
node scripts/serve.mjs
```

미리보기: [http://127.0.0.1:4173](http://127.0.0.1:4173). 생성 HTML이 포함되어 있어 정적 서버로 바로 제공할 수도 있습니다. 파일 더블클릭 대신 로컬 서버를 사용하세요.

## 수정할 파일

- `content/profile.json`: 이름, 연락처, 소개, 주요 기술.
- `content/projects.json`: 프로젝트 카드와 상세 콘텐츠.
- `scripts/build.mjs`: 공통 템플릿과 정적 페이지 생성.
- `assets/site.css`: 반응형·인쇄 스타일.
- `assets/site.js`: 모바일 메뉴, 확대 보기, 비교, 이메일 복사.
- `assets/battlearena/`: 증빙 이미지와 편집 영상.
- `assets/downloads/`: 원본 PPT.

내용 수정 후 `node scripts/build.mjs`와 `node scripts/check.mjs`를 실행합니다. HTML은 생성 파일이므로 직접 수정하면 다음 빌드에서 덮어씁니다. `/resume/`의 인쇄 버튼으로 PDF를 저장할 수 있습니다. 현재는 자료로 확인한 기술·프로젝트 중심 프로필입니다.

## 증명사진 추가

현재 첫 화면의 사진 영역은 비워 두었습니다. 사진을 `assets/profile/` 등에 저장하고 `content/profile.json`의 `portrait`를 `/assets/profile/portrait.webp` 같은 경로로 지정한 후 다시 빌드하면 표시됩니다. `null`이면 빈 사진 영역을 유지합니다.

## 게임 추가

1. `assets/새-slug/`에 대표 이미지와 증빙 자료를 넣습니다.
2. 프로젝트 JSON의 객체를 복사하고 모든 내용을 새 게임에 맞게 작성합니다. `slug`는 고유한 영어 소문자·숫자·하이픈으로 지정합니다.
3. `cases`에는 핵심 구현, `extras`에는 추가 구현을 넣습니다. `navTitle`은 상세 목차의 짧은 이름입니다. 이미지·영상은 해당 프로젝트 폴더의 파일명을 연결합니다.
4. `codeRevision`에 실제 자료와 일치하는 커밋을 넣습니다. 코드 링크의 `path`는 파일, `directory`는 폴더입니다. `testing`과 `sourceNotice`도 해당 자료에 맞게 작성합니다.
5. 작성 중에는 `published: false`로 둡니다. 공개할 때 `true`로 바꾸면 메인·상세·프로필·사이트맵에 자동 포함됩니다.
6. `featured: true`인 첫 프로젝트는 소개 영역의 구현 사례 링크 기준입니다. 첫 화면에는 특정 게임을 노출하지 않습니다. 대표작을 바꾸면 기술 링크의 연결 대상도 함께 점검하세요.
7. 빌드·점검 후 화면에서 확인합니다. 공개 프로젝트를 숨기거나 삭제할 경우 예전에 생성된 `projects/slug/` 폴더도 직접 제거합니다.

핵심 사례 개수는 조절할 수 있습니다. `comparison: true` 옵션은 `fpr-before.webp`와 `fpr-after.webp`를 사용하므로 일반 프로젝트에서는 생략하세요.

## GitHub Pages

저장소 Settings → Pages에서 **Deploy from a branch → main → /(root)**를 선택합니다. 수정 후 생성 HTML까지 함께 커밋해야 합니다. `main`에 푸시하면 설정된 GitHub Pages 배포가 실행됩니다. CSS와 JS에는 콘텐츠 기반 버전이 붙어 수정 후 이전 스타일이 재사용되는 것을 방지합니다.

도메인이 바뀌면 프로필의 `siteUrl`을 수정하고 다시 빌드해 canonical·OG·사이트맵을 갱신하세요. 사이트는 외부 폰트·라이브러리 CDN을 요청하지 않습니다.

- [실제 개발자 사례 조사](docs/portfolio-research.md)
- [PPT·미디어 출처와 확인 범위](docs/content-sources.md)
