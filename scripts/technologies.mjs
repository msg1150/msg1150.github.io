const technologies = {
  'C++': ['cpp', '#276a99', '<path d="m16 4-8-2-6 6v9l6 5 8-3"/><text x="4" y="16">C</text><path d="M15 10v6m-3-3h6m3-3v6m-3-3h6"/>'],
  'Unreal Engine 5': ['unreal', '#20211f', '<circle cx="12" cy="12" r="10"/><text x="4" y="16">UE</text>'],
  'Blueprint': ['blueprint', '#236b9d', '<rect x="2" y="3" width="7" height="6" rx="1"/><rect x="15" y="15" width="7" height="6" rx="1"/><path d="M9 6h7v5H6v7h9"/>'],
  'NavMesh': ['navmesh', '#68864b', '<path d="m3 6 8-4 10 5v13L3 18V6Zm0 0 9 7 9-6M11 2l1 11-9 5m9-5 9 7M12 13l-1 6"/>'],
  'Dijkstra': ['dijkstra', '#a57125', '<circle cx="4" cy="5" r="2"/><circle cx="19" cy="4" r="2"/><circle cx="12" cy="13" r="2"/><circle cx="20" cy="20" r="2"/><circle cx="4" cy="20" r="2"/><path d="m6 6 5 5m3 4 4 4M5 18l6-3m2-4 5-5M6 5h11M4 7v11"/>'],
  'PathLink': ['pathlink', '#a05a39', '<path d="m10 7 3-3a5 5 0 0 1 7 7l-3 3M7 10l-3 3a5 5 0 0 0 7 7l3-3M8 16l8-8"/>'],
  '.NET 8 WPF': ['dotnet-wpf', '#7055a8', '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20"/><text x="4" y="17" class="small">.NET</text>'],
  'Reflection': ['reflection', '#4d8084', '<path d="M7 3H3v18h4M17 3h4v18h-4M12 3v18m-4-9h8m-2-2 2 2-2 2"/>'],
  'Slate': ['slate', '#6c7079', '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20M8 8v13M12 12h6m-6 4h6"/>']
};
export function renderTechnologies(names) {
  return `<ul class="technology-icons" aria-label="사용 기술">${names.map(name => {
    const technology = technologies[name];
    if (!technology) throw new Error(`Unknown technology: ${name}`);
    const [key, color, body] = technology;
    return `<li><span class="technology-symbol" tabindex="0" role="img" aria-label="${name}" data-label="${name}" style="--technology-color:${color}"><svg class="technology-svg technology-${key}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg><span class="technology-tooltip" aria-hidden="true">${name}</span></span><span class="technology-print-label">${name}</span></li>`;
  }).join('')}</ul>`;
}
