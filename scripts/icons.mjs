const paths = {
  'chevron-up': '<path d="m5 15 7-7 7 7"/>',
  'chevron-down': '<path d="m5 9 7 7 7-7"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  gamepad: '<path d="M7 7h10c3 0 5 11 3 12-2 1-4-4-6-4h-4c-2 0-4 5-6 4C2 18 4 7 7 7Z"/><path d="M8 9v5m-2.5-2.5h5M16 10h.1M18 13h.1"/>',
  route: '<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h9a4 4 0 0 1 0 8H8a3 3 0 0 0 0 6h9"/>',
  tools: '<path d="m14 7-8 8-3 1 1-3 8-8m2 2 3-1 2-3a6 6 0 0 1-7 8M5 3l16 16-2 2L3 5V3h2Z"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M20 14v6H4V4h6"/>',
  down: '<path d="M12 4v16m-6-6 6 6 6-6"/>',
  up: '<path d="M12 20V4m-6 6 6-6 6 6"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
  print: '<path d="M6 8V3h12v5M6 17H3V8h18v9h-3M6 14h12v7H6zM17 11h1"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  expand: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6m-3-3v6"/>',
  github: '<path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.3A5.7 5.7 0 0 0 19.3 4a5.3 5.3 0 0 0-.1-4S18-.4 15 1.5a14 14 0 0 0-7 0C5-.4 3.8 0 3.8 0a5.3 5.3 0 0 0-.1 4A5.7 5.7 0 0 0 2.3 8c0 5.7 3.5 6.9 6.8 7.3A3.5 3.5 0 0 0 8 18v4" transform="translate(1 1) scale(.9)"/>'
};
export function icon(name) {
  if (!paths[name]) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="icon icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
}
