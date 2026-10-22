const brands = {'C++':'cplusplus','Unreal Engine 5':'unrealengine','.NET 8 WPF':'dot-net','Unity':'unity','C#':'csharp'};
const escape = s => s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderTechnologies(names) {
  return `<ul class="technology-icons" aria-label="사용 기술">${names.map(name => {
    const label=escape(name),brand=brands[name];
    if (!brand) return `<li class="technology-text" aria-label="${label}" data-label="${label}">${label}</li>`;
    return `<li><span class="technology-symbol" tabindex="0" role="img" aria-label="${label}" data-label="${label}"><img class="technology-svg" src="/assets/icons/devicon/${brand}.svg" alt="" width="27" height="27"><span class="technology-tooltip" aria-hidden="true">${label}</span></span><span class="technology-print-label">${label}</span></li>`;
  }).join('')}</ul>`;
}
