// Escape every text fragment; only author-selected phrases become emphasis.
const escape = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function prose(text, highlights = []) {
  text = String(text ?? '');
  const terms = [...new Set(highlights)].filter(Boolean).sort((a, b) => b.length - a.length);
  if (!terms.length) return escape(text);
  const pattern = new RegExp(terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  let html = '', cursor = 0;
  for (const match of text.matchAll(pattern)) {
    html += escape(text.slice(cursor, match.index)) + `<strong class="text-accent">${escape(match[0])}</strong>`;
    cursor = match.index + match[0].length;
  }
  return html + escape(text.slice(cursor));
}
