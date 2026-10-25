import { readFileSync } from 'node:fs';
const names = {external:'external-link',down:'arrow-down',up:'arrow-up',download:'download',mail:'mail',copy:'copy',print:'printer',close:'x',expand:'zoom-in','chevron-up':'chevron-up','chevron-down':'chevron-down',menu:'menu',gamepad:'gamepad-2',route:'route',tools:'wrench'};
const cache = new Map();
export function icon(name) {
  if (!cache.has(name)) {
    const source = name === 'github' ? '../assets/icons/devicon/github.svg'
      : name === 'notion' ? '../assets/icons/brands/notion.svg'
      : `../assets/icons/lucide/${names[name]}.svg`;
    if (name !== 'github' && name !== 'notion' && !names[name]) throw new Error(`Unknown icon: ${name}`);
    let svg = readFileSync(new URL(source, import.meta.url),'utf8').trim();
    svg = svg.replace(/<svg\b/, `<svg class="icon icon-${name}" aria-hidden="true" focusable="false"`);
    if (name === 'github' || name === 'notion') svg = svg.replace('<svg ', '<svg fill="currentColor" ');
    cache.set(name,svg);
  }
  return cache.get(name);
}
