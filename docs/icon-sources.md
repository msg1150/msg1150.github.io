# 아이콘 원본과 라이선스

직접 작성했던 기술·동작 SVG는 제거했다. 기술 브랜드는 Devicon의 원본 SVG, 일반 동작과 분야 아이콘은 Lucide 원본 SVG를 사용한다. 원본 파일은 `assets/icons/`에 저장하고 출처·정확한 커밋을 `assets/icons/sources.json`에 기록했다. SVG의 도형을 새로 그리지 않으며, 인라인 동작 아이콘에 접근성 속성과 크기 클래스를 붙이고 단색 GitHub 로고는 주변 링크 색상을 상속한다.

| 라이브러리 | 사용 범위 | 원본 | 라이선스 |
| --- | --- | --- | --- |
| Devicon | C++, Unreal Engine, .NET, Unity, C#, GitHub | https://github.com/devicons/devicon/tree/6a37858047b0e8d9c9c0e68f4a071fc410652e89 | MIT, `assets/icons/devicon/LICENSE` |
| Lucide | 메뉴·방향·연락·복사·인쇄·다운로드·확대·닫기·게임패드·경로·도구 | https://github.com/lucide-icons/lucide/tree/20aef31db93fe4d9f398dbb15b120d99c48eef95 | ISC 및 일부 Feather 유래 MIT, `assets/icons/lucide/LICENSE` |
| Epic Unreal Editor | Blueprint 에셋 아이콘 | 설치된 UE 5.8.3의 `Engine/Content/Editor/Slate/Starship/AssetIcons/Blueprint_64.svg` | Epic Games 소유 에디터 에셋, Unreal Engine EULA. Devicon·MIT 에셋으로 분류하지 않음 |

Blueprint는 엔진의 실제 `ClassThumbnail.Blueprint` 아이콘을 사용한다. `StarshipStyle.cpp`의 Blueprint 형식 등록과 `Starship/AssetIcons/%s_64` 연결을 확인했다. 원본 SVG를 변경 없이 복사했고 SHA-256은 `97db4b44aea59c193221e8efa2bc6a69ee0804e7933f001f5c0ce923722b69eb`이다. 다른 기술과 같은 흰색 컨테이너를 사용하고 CSS 밝기 필터로 회색 도형의 대비를 높인다. 아이콘 출처의 엔진 버전은 프로젝트 개발 환경을 변경한다는 의미가 아니다.

NavMesh·Dijkstra·PathLink·Reflection·Slate·URP·Input System 등은 별도 브랜드 로고로 오인될 심벌을 만들지 않고 이름을 표시한다. .NET 아이콘은 .NET을 나타내며 WPF 자체의 로고라고 주장하지 않는다. 아이콘은 관련 기술을 식별하기 위한 것이며 공식 인증·제휴를 의미하지 않는다. Epic 에디터 에셋의 저작권은 Epic Games, Inc.에 있다. 출처와 고유 라이선스 정보는 `assets/icons/sources.json`에 별도로 기록했다.
