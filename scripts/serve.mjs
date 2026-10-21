import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const port = Number(process.env.PORT || 4173);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.mp4':'video/mp4','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.pptx':'application/vnd.openxmlformats-officedocument.presentationml.presentation'};
const allowed = /^(?:\/(?:index\.html|404\.html|sitemap\.xml|robots\.txt)?|\/(?:assets|projects|resume)(?:\/.*)?)$/;
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    if (!allowed.test(pathname) || pathname.split('/').some(s => s === '..' || s.startsWith('.'))) { res.writeHead(404); res.end('Not found'); return; }
    let target = path.resolve(root, '.' + pathname);
    if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    let stats = await stat(target);
    if (stats.isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(301, {Location: pathname + '/' + url.search}); res.end(); return; }
      target = path.join(target,'index.html');
      stats = await stat(target);
    }
    const data = await readFile(target);
    const headers = {'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Accept-Ranges':'bytes'};
    if (req.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      let start = 0, end = stats.size - 1;
      if (!match || (!match[1] && !match[2])) { res.writeHead(416, {'Content-Range':`bytes */${stats.size}`}); res.end(); return; }
      if (match[1]) { start = Number(match[1]); if (match[2]) end = Math.min(Number(match[2]), stats.size - 1); }
      else start = Math.max(0, stats.size - Number(match[2]));
      if (start > end || start >= stats.size) { res.writeHead(416, {'Content-Range':`bytes */${stats.size}`}); res.end(); return; }
      res.writeHead(206, {...headers,'Content-Range':`bytes ${start}-${end}/${stats.size}`,'Content-Length':end-start+1});
      res.end(req.method === 'HEAD' ? undefined : data.subarray(start,end+1));
    } else { res.writeHead(200, {...headers,'Content-Length':stats.size}); res.end(req.method === 'HEAD' ? undefined : data); }
  } catch {
    const html = await readFile(path.join(root,'404.html'));
    res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'}); res.end(html);
  }
}).listen(port,'127.0.0.1',() => console.log(`Portfolio preview: http://127.0.0.1:${port}`));
