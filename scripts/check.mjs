import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const projects = JSON.parse(await readFile(path.join(root,'content/projects.json'),'utf8'));
const profile = JSON.parse(await readFile(path.join(root,'content/profile.json'),'utf8'));
assert.equal(new Set(projects.map(p=>p.slug)).size,projects.length,'Project slugs must be unique');
assert.match(profile.email,/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Email must be valid');
for (const p of projects) {
  assert.match(p.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/,'Project slug must be URL-safe');
  assert(p.cases.length,'A project needs at least one case study');
  assert.equal(new Set(p.cases.map(c=>c.id)).size,p.cases.length,'Case anchors must be unique');
}
const pages = ['/index.html','/resume/index.html','/404.html',...projects.filter(p=>p.published).map(p=>`/projects/${p.slug}/index.html`)];
let links = 0;
const cache = new Map();
async function htmlAt(target) {
  if (!cache.has(target)) cache.set(target,await readFile(target,'utf8'));
  return cache.get(target);
}
for (const page of pages) {
  const file = path.join(root,page);
  const html = await htmlAt(file);
  assert(html.includes('<html lang="ko">'),`Korean language missing: ${page}`);
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`Exactly one h1 required: ${page}`);
  assert(html.includes('name="description"') && html.includes('rel="canonical"'),`Metadata missing: ${page}`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`Duplicate IDs in ${page}`);
  for (const match of html.matchAll(/\b(?:href|src|poster|data-before|data-after|data-still|data-motion)="([^"]+)"/g)) {
    const raw = match[1].replaceAll('&amp;','&');
    if (/^(?:https?:|mailto:|data:)/.test(raw)) continue;
    assert(raw && !raw.startsWith('javascript:'),`Empty/unsafe URL in ${page}`);
    const url = new URL(raw,`https://local.test${page}`);
    let target = path.join(root,decodeURIComponent(url.pathname));
    let info;
    try { info = await stat(target); } catch { throw new Error(`Broken file link in ${page}: ${raw}`); }
    if (info.isDirectory()) target = path.join(target,'index.html');
    await stat(target);
    if (url.hash && target.endsWith('.html')) {
      const linkedHtml = await htmlAt(target);
      assert(linkedHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`Broken anchor in ${page}: ${raw}`);
    }
    links++;
  }
  for (const img of html.matchAll(/<img\b[^>]*>/g)) assert(/\balt="[^"]*"/.test(img[0]),`Image alt missing: ${page}`);
  for (const link of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert(/rel="[^"]*noopener/.test(link[0]),`External link rel missing: ${page}`);
}
const home = await htmlAt(path.join(root, 'index.html'));
assert(home.includes('id="profile"'), 'Profile must be included on homepage');
assert(!/href="\/resume\//.test(home), 'Homepage profile navigation should stay on homepage');
for (const project of projects.filter(p => p.published)) {
  if (project.sourceManifest) {
    const source = JSON.parse(await readFile(path.join(root, project.sourceManifest), 'utf8'));
    const ppt = await readFile(path.join(root, project.presentation.split('?')[0]));
    assert.equal(ppt.length, source.bytes, `PPT download size differs from source: ${project.slug}`);
    assert.equal(createHash('sha256').update(ppt).digest('hex'), source.sha256, `PPT download differs from source: ${project.slug}`);
    const covered = [...Object.values(project.sourceSlides).flat(), ...project.cases.flatMap(c=>c.sourceSlides), ...project.extras.flatMap(c=>c.sourceSlides)].sort((a,b)=>a-b);
    assert.deepEqual(covered, Array.from({length:source.slideCount},(_,i)=>i+1), `PPT slide coverage differs: ${project.slug}`);
    const detail = await htmlAt(path.join(root, 'projects', project.slug, 'index.html'));
    const sourceLinks = new Set(source.slides.flatMap(s=>s.links));
    const repositoryCode = `${project.repository}/`;
    for (const [name, html] of [['home', home], ['detail', detail]]) {
      const publicLinks = new Set([...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&')));
      for (const url of sourceLinks) assert(publicLinks.has(url), `PPT link missing from ${name}: ${url}`);
      for (const url of publicLinks) if (url.startsWith(repositoryCode) && /\/(?:blob|tree)\//.test(url)) assert(sourceLinks.has(url), `Code link absent from current PPT in ${name}: ${url}`);
    }
  }
  assert(home.includes(`id="project-${project.slug}"`), `Project missing from homepage: ${project.slug}`);
  for (const section of [...project.cases, ...project.extras]) {
    assert(home.includes(`id="${project.slug}-${section.id}"`), `Implementation missing from homepage: ${section.id}`);
  }
}
const homeDetails = [...home.matchAll(/<details\b[^>]*>/g)];
assert(homeDetails.length, 'Homepage needs expandable project content');
for (const [tag] of homeDetails) assert(/\bopen(?:\s|>|=)/.test(tag), `Content must be open by default: ${tag}`);
assert(!/href="\/projects\//.test(home), 'Homepage project navigation should stay on the homepage');
console.log(`PASS: ${pages.length} pages, ${links} local resources and anchors, image alternatives, metadata and content IDs.`);
