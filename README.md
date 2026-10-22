# 박장한 · 게임 프로그래머 포트폴리오

GitHub Pages용 정적 사이트입니다. 외부 패키지와 API 키 없이 실행합니다.

## 로컬 실행

Node.js 20 이상:

```powershell
node scripts/build.mjs
node scripts/check.mjs
python scripts/check-pptx.py
node scripts/serve.mjs
```

미리보기: [http://127.0.0.1:4173](http://127.0.0.1:4173). 생성 HTML이 포함되어 있어 정적 서버로 바로 제공할 수도 있습니다. 파일 더블클릭 대신 로컬 서버를 사용하세요.

## 수정할 파일

- `content/profile.json`: 이름, 연락처, 소개, 주요 기술.
- `content/projects.json`: 첫 페이지에 이어서 표시할 프로젝트 전체 콘텐츠.
- `scripts/build.mjs`: 공통 템플릿과 정적 페이지 생성.
- `assets/site.css`: 반응형·인쇄 스타일.
- `assets/site.js`: 모바일 메뉴, 확대 보기, 비교, 이메일 복사.
- `assets/battlearena/`: 증빙 이미지와 편집 영상.
- `assets/downloads/`: 원본 PPT.

내용 수정 후 `node scripts/build.mjs`와 `node scripts/check.mjs`를 실행합니다. HTML은 생성 파일이므로 직접 수정하면 다음 빌드에서 덮어씁니다. `/resume/`의 인쇄 버튼으로 PDF를 저장할 수 있습니다. 현재는 자료로 확인한 기술·프로젝트 중심 프로필입니다.

## 첫 페이지 탐색

프로젝트 개요, 핵심 구현, 추가 구현과 테스트 자료를 첫 페이지에서 모두 제공합니다. 프로젝트 전체와 개별 구현은 기본으로 펼쳐져 있으며 방문자가 제목을 눌러 직접 접을 수 있습니다. 접힘 상태는 저장하지 않아 다시 열면 모두 펼쳐집니다. 목차와 구현 사례 링크는 같은 페이지의 해당 위치로 이동하고, 대상이 접혀 있으면 자동으로 펼칩니다. 각 프로젝트의 앵커에는 slug 접두사를 붙여 여러 게임 사이에 ID가 겹치지 않도록 합니다.

기존 `/projects/slug/` 주소는 이전 링크를 위해 유지하되 첫 페이지에서 진입할 필요가 없습니다. 프로젝트 본문은 공통 렌더러로 생성해 두 경로의 내용이 일치합니다.

맨 위 `#profile`에 이름·사진 자리·소개·주요 기술·연락처를 통합하고 바로 아래에 프로젝트를 표시합니다. 별도 프로필 칸과 프로필 보기 버튼은 없습니다. `/resume/`는 이전 주소 호환용으로 유지합니다. 상단 인쇄 아이콘은 프로젝트 경험·검증까지 포함한 기술 프로필을 인쇄/PDF 저장합니다. 메인의 인쇄 문서는 화면에서는 숨기고 프로필 인쇄 때만 표시합니다.

동작 아이콘은 Lucide, 기술 브랜드 로고는 Devicon 원본을 `assets/icons/`에 보관해 사용합니다. `scripts/icons.mjs`·`scripts/technologies.mjs`에서 렌더링하며 출처·고정 커밋·라이선스는 [아이콘 출처](docs/icon-sources.md)에 기록했습니다. 기술 행은 `profile.skills[].tech`를 구분자로 나눠 처리하며 등록된 실제 로고가 없으면 이름을 표시합니다. 접근성 이름·키보드 초점·툴팁을 제공하고 모바일과 인쇄에서는 로고의 기술 이름도 표시합니다.

데스크톱에서는 개요와 구현 설명을 왼쪽, 이미지·영상·비교 화면을 오른쪽에 표시합니다. 긴 항목의 하위 설명도 관련 미디어와 한 행으로 묶습니다. 800px 이하에서는 설명 다음에 해당 미디어가 이어집니다. 목차는 본문 위에 가로로 배치해 설명과 미디어가 사용할 너비를 확보합니다.

프로필·프로젝트·핵심/추가 구현·하위 설명의 `highlights` 배열에 원문 구절을 넣으면 진한 주황색 굵은 글씨로 강조합니다. `scripts/prose.mjs`가 텍스트를 이스케이프해 출력하며 HTML을 직접 넣지 않습니다. `evidenceTable`의 마지막 열은 적용 후 결과로 강조하고 인쇄에서는 검은색을 사용합니다.

사진 여러 장은 `media-gallery` 두 열로 묶고 최대 높이를 제한합니다. 사진은 PPT에서 보이는 자르기를 반영한 무손실 PNG이며 화면에서 추가로 자르지 않습니다. `animations[].videoFile`이 있으면 브라우저 기본 컨트롤로 MP4를 바로 재생합니다. 원본 GIF도 유지하고 `animations[].crop`의 0–1 비율로 PPT의 표시 범위를 맞춥니다. `mediaManifest`의 원본 PPT 식별값·출력 해시는 정적 점검에 포함됩니다. 하단 연락 영역은 이메일·GitHub·복사 아이콘만 표시합니다.

`scripts/diagrams.mjs`는 구현을 설명하는 SVG·HTML 도식을 제공합니다. JSON의 `diagrams`에 등록된 이름을 연결하면 오른쪽 미디어 열에 표시합니다. 개념도는 실제 플레이 화면과 구분하며, 원본 미디어도 함께 유지합니다. 스폰의 추첨 버튼은 고정된 후보 6곳 중 먼 3곳에서 선택하는 설명용 예시입니다. `compact: true`인 핵심 구현은 본문과 반복되는 결과 상자를 생략합니다. `sections[].table`은 비교표를 표시합니다.

핵심 구현의 `diagramPlacement: "under-copy"`는 도식을 왼쪽 설명 아래에 배치합니다. 외부 데이터 항목은 `mediaLayout: "diagram-right-images-below"`로 설명 왼쪽·도식 오른쪽을 구성하고 사진 두 장을 그 행 아래에 나란히 표시합니다. 모바일에서는 설명, 도식, 사진 묶음 순서로 읽습니다.

## 증명사진 추가

현재 첫 화면의 사진 영역은 비워 두었습니다. 사진을 `assets/profile/` 등에 저장하고 `content/profile.json`의 `portrait`를 `/assets/profile/portrait.webp` 같은 경로로 지정한 후 다시 빌드하면 표시됩니다. `null`이면 빈 사진 영역을 유지합니다.

## 게임 추가

1. `assets/새-slug/`에 대표 이미지와 증빙 자료를 넣습니다.
2. 프로젝트 JSON의 객체를 복사하고 모든 내용을 새 게임에 맞게 작성합니다. `slug`는 고유한 영어 소문자·숫자·하이픈으로 지정합니다.
3. `cases`에는 핵심 구현, `extras`에는 추가 구현을 넣습니다. `navTitle`은 상세 목차의 짧은 이름입니다. 이미지·영상은 해당 프로젝트 폴더의 파일명을 연결합니다.
4. `codeRevision`에 실제 자료와 일치하는 고정 커밋 SHA를 넣습니다. 코드 링크의 `path`는 파일, `directory`는 폴더입니다. `testing`과 `sourceNotice`도 해당 자료에 맞게 작성합니다.
5. 작성 중에는 `published: false`로 둡니다. 공개할 때 `true`로 바꾸면 첫 페이지에 전체 내용이 펼쳐진 상태로 추가되고, 호환용 상세 주소·프로필·사이트맵에도 포함됩니다.
6. `featured: true`인 첫 프로젝트는 소개 영역의 구현 사례 링크 기준입니다. 첫 화면에는 특정 게임을 노출하지 않습니다. 대표작을 바꾸면 기술 링크의 연결 대상도 함께 점검하세요.
7. 빌드·점검 후 화면에서 확인합니다. 공개 프로젝트를 숨기거나 삭제할 경우 예전에 생성된 `projects/slug/` 폴더도 직접 제거합니다.

핵심 사례 개수는 조절할 수 있습니다. `sections`에 하위 구현 설명·흐름·이미지를, `animations`에 `file`·`poster`·`title`·`alt`·`caption`을 넣으면 사용자 조작으로 재생하는 GIF를 연결할 수 있습니다. 코드 링크별 `revision`으로 서로 다른 근거 커밋을 지정할 수 있습니다. `technicalDocument`에는 실제 기술 문서 URL을 넣습니다. `comparison: true`는 기본 FPR 비교 이미지를 사용하며, `comparison: {"before": "파일명", "after": "파일명"}`으로 프로젝트별 비교 이미지를 지정할 수 있습니다. 일반 프로젝트에서는 이 옵션을 생략하세요.

Dungeon Sweeper는 최신 27장 PPT의 설명·실제 이미지·GIF·코드 링크로 구성했습니다. 핵심 순서는 PPT의 가방·경제, 몬스터, 제작 도구, 탐험·저장, 조작·2.5D입니다. BattleArena와 같은 템플릿을 사용합니다. `evidenceTable`에는 `caption`·`headers`·`rows`·`note`를 넣어 미디어 열에 측정 비교표를 표시할 수 있습니다. `testingIntro`·`testingTitle`·`validationSections`로 검증 범위와 측정 조건을 구분합니다. 하위 `sections`도 `links`를 지원합니다. PPT 근거와 수치 조건은 [Dungeon Sweeper 자료 기록](docs/dungeonsweeper-sources.md)을 참조하세요.

공개 PPT는 최신 원본의 슬라이드·이미지를 유지하되 작성자·수정자·제작 도구 메타데이터를 제거한 배포 사본입니다. Dungeon Sweeper의 코드 하이퍼링크도 웹과 같은 고정 커밋으로 연결합니다. `sourceManifest`의 최상위 해시는 원본을, `download`의 해시·크기는 공개 사본을 식별합니다. 메인·프로필의 공유 미리보기 이미지는 `profile.shareImage`로 지정하며 두 프로젝트를 함께 표시합니다. [제출 전 10개 항목 확인](docs/submission-review-20261023.md)에 근거와 한계를 기록했습니다.

## GitHub Pages

저장소 Settings → Pages에서 **Deploy from a branch → main → /(root)**를 선택합니다. 수정 후 생성 HTML까지 함께 커밋해야 합니다. `main`에 푸시하면 설정된 GitHub Pages 배포가 실행됩니다. CSS와 JS에는 콘텐츠 기반 버전이 붙어 수정 후 이전 스타일이 재사용되는 것을 방지합니다.

도메인이 바뀌면 프로필의 `siteUrl`을 수정하고 다시 빌드해 canonical·OG·사이트맵을 갱신하세요. 사이트는 외부 폰트·라이브러리 CDN을 요청하지 않습니다.

- [실제 개발자 사례 조사](docs/portfolio-research.md)
- [PPT·미디어 출처와 확인 범위](docs/content-sources.md)
