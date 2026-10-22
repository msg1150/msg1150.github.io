const svg = (label, body, height = 210) => `<svg viewBox="0 0 560 ${height}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const text = (x, y, label, cls = '', anchor = 'start') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${label}</text>`;
const line = (x1, y1, x2, y2, cls = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
const dot = (x, y, cls = '') => `<circle cx="${x}" cy="${y}" r="6" class="${cls}"/>`;
const box = (x, y, w, h, cls = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" class="${cls}"/>`;
const frame = (title, body, caption) => `<figure class="explain-diagram"><div class="diagram-heading"><span>구현 한눈에 보기</span><h4>${title}</h4></div>${body}<figcaption>${caption}</figcaption></figure>`;

const diagrams = {
  convergence: () => frame('총구에서 합류한 뒤 조준 방향으로', svg('총구에서 조준선의 합류 지점까지 이동하고 이후 조준선 방향으로 진행. 한 프레임에서 합류 전후 시간을 나눠 계산한다.',
    line(48,75,510,75,'guide') + text(38,47,'카메라 조준선','muted')
    + line(76,151,276,75,'path') + line(276,75,500,75,'path secondary')
    + '<path d="M 254 76 L 268 78 L 261 90" class="arrow"/><path d="M 487 68 L 500 75 L 487 82" class="arrow secondary"/>'
    + dot(76,151,'accent-fill') + dot(276,75,'accent-fill')
    + text(50,180,'총구','strong') + text(276,50,'합류 지점','strong','middle')
    + text(173,137,'① 합류까지 이동','','middle') + text(415,111,'② 조준 방향으로','','middle')
    + text(280,207,'프레임 시간 = 합류까지의 시간 + 남은 시간','muted','middle'),230),
    '위치 관계를 설명하는 개념도 · 이동 중 충돌하면 중단'),

  sweep: () => frame('위치 두 점 사이의 전체 구간을 검사', svg('이전 위치 P0에서 다음 예정 위치 P1까지 Sphere Sweep으로 검사하며 그 사이에 있는 얇은 벽에서 첫 충돌을 선택한다.',
    box(44,86,470,48,'sweep-area') + box(305,42,15,125,'wall')
    + line(67,110,493,110,'guide') + line(67,110,298,110,'path')
    + dot(67,110,'accent-fill') + dot(493,110,'muted-fill') + dot(305,110,'accent-fill')
    + text(67,68,'P0','strong','middle') + text(493,68,'P1 · 예정','muted','middle')
    + text(312,28,'얇은 벽','strong','middle') + text(305,188,'가장 이른 Hit.Time 선택','accent-text','middle')
    + text(67,153,'이전 위치','muted','middle'),210),
    'RecordTravel로 기록한 각 이동 구간을 Sphere Sweep'),

  navigation: () => frame('일반 경로와 비용 0의 포탈 경로 비교', svg('출발부터 도착까지 일반 이동은 NavMesh 경로 길이를 사용하고, 포탈 경로는 입구까지 이동과 비용 0의 포탈 통과, 출구부터 이동을 합산한다.',
    '<path d="M 48 142 V 60 H 506 V 142" class="route-muted"/>'
    + line(48,142,184,142,'path') + line(184,142,375,142,'portal-link') + line(375,142,506,142,'path')
    + dot(48,142,'accent-fill') + dot(184,142,'accent-fill') + dot(375,142,'accent-fill') + dot(506,142,'accent-fill')
    + text(280,38,'일반 이동: NavMesh 경로 길이','muted','middle')
    + text(280,119,'포탈 통과 비용 = 0','accent-text','middle')
    + text(48,177,'출발','strong','middle') + text(184,177,'입구','','middle') + text(375,177,'출구','','middle') + text(506,177,'도착','strong','middle'),200),
    '개념도 · 직선거리 추정이 실제 비용보다 클 수 있어 Dijkstra 사용'),

  clipping: () => frame('출구 면 이전은 잘라내고, 이후는 표시', svg('가상 카메라와 출구 사이의 중간 벽은 잘라내고 출구 면부터 장면을 표시한다. 카메라 거리는 원근감 계산에 유지한다.',
    box(24,51,275,112,'clip-zone') + box(299,51,237,112,'visible-zone')
    + line(56,108,499,108,'guide') + box(169,74,15,68,'wall')
    + '<path d="M 38 96 H 62 V 120 H 38 Z M 62 101 L 75 94 V 122 L 62 115 Z" class="camera-shape"/>'
    + line(299,36,299,174,'clip-plane') + box(429,85,34,47,'object')
    + text(56,191,'가상 카메라','muted','middle') + text(176,40,'중간 벽','muted','middle')
    + text(299,22,'출구 면 = Near Clip','accent-text','middle')
    + text(446,191,'표시할 물체','strong','middle')
    + text(176,155,'잘라냄','muted','middle') + text(403,71,'정상 표시','strong','middle'),215),
    '출구 쪽 공간을 옆에서 본 개념도 · 카메라 거리는 원근감 계산에 유지'),

  data: () => frame('데이터 명세에서 편집·검증·적용까지',
    `<ol class="diagram-pipeline"><li><strong>Unreal Reflection</strong><span>타입 · Enum · 입력 범위 추출</span></li><li><strong>Manifest → WPF 편집기</strong><span>명세에 맞춰 화면 구성</span></li><li><strong>입력 검증</strong><span>통과하면 JSON 저장 / 오류면 저장 중단</span></li></ol><div class="diagram-branches"><div><span>RUNTIME</span><strong>메모리에 값 적용</strong></div><div><span>EDITOR</span><strong>값 적용 → 에셋 저장</strong><small>에셋 저장 시 연결된 JSON도 갱신</small></div></div>`,
    '값 적용과 에셋 파일 저장의 시점을 분리'),

  spawn: () => frame('먼 절반만 남긴 뒤 무작위로 한 곳 선택',
    `<div class="spawn-example" data-spawn-example><div class="spawn-distance"><span>← 사망 위치에서 먼 쪽</span><span>가까운 쪽 →</span></div><ol class="spawn-candidates" aria-label="거리가 먼 순서의 스폰 후보 6곳">${['A','B','C','D','E','F'].map((name,i)=>`<li class="${i<3?'is-retained':'is-excluded'}${i===1?' is-selected':''}" data-spawn-candidate="${name}"><span>후보 ${name}</span><small data-spawn-state>${i===1?'선택 예시':i<3?'유지':'제외'}</small></li>`).join('')}</ol><div class="spawn-groups"><span>먼 절반 유지: A / B / C</span><span>가까운 절반 제외: D / E / F</span></div><div class="spawn-draw"><p role="status" aria-live="polite" data-spawn-result>선택 예시: 후보 B</p><button type="button" data-spawn-draw>다시 추첨 ↻</button></div><p class="diagram-note">6곳 중 먼 3곳만 추첨합니다. 실제 게임의 거리값을 재현한 것은 아닙니다.</p></div>`,
    '남길 후보 수: max(1, floor(N / 2)) · 같은 거리는 무작위로 순서 결정')
};

export function renderDiagrams(names = []) {
  return names.map(name => {
    if (!diagrams[name]) throw new Error(`Unknown explanation diagram: ${name}`);
    return diagrams[name]();
  }).join('');
}
