"""Check the public PPT copies without requiring PowerPoint or extra packages."""
from pathlib import Path
import hashlib,json,re,zipfile,xml.etree.ElementTree as E

root=Path(__file__).resolve().parent.parent
ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
projects=json.loads((root/'content/projects.json').read_text(encoding='utf8'))
for project in projects:
    manifest=json.loads((root/project['sourceManifest']).read_text(encoding='utf8'))
    expected=manifest.get('download',manifest)
    ppt=root/project['presentation'].split('?')[0].lstrip('/')
    raw=ppt.read_bytes()
    assert len(raw)==expected['bytes'],f"Size mismatch: {ppt.name}"
    assert hashlib.sha256(raw).hexdigest()==expected['sha256'],f"Hash mismatch: {ppt.name}"
    links=set()
    with zipfile.ZipFile(ppt) as z:
        assert z.testzip() is None
        count=len(E.fromstring(z.read('ppt/presentation.xml')).find('p:sldIdLst',ns))
        assert count==manifest['slideCount']
        for name in z.namelist():
            if name.startswith('docProps/') and name.endswith('.xml'):
                for element in E.fromstring(z.read(name)).iter():
                    if element.tag.split('}')[-1] in ['creator','lastModifiedBy','Company','Manager','Application']:
                        assert not(element.text or '').strip(),f"Author/exporter metadata remains: {ppt.name}"
            if name.startswith('ppt/notesSlides/notesSlide') and name.endswith('.xml'):
                for shape in E.fromstring(z.read(name)).findall('.//p:sp',ns):
                    ph=shape.find('p:nvSpPr/p:nvPr/p:ph',ns)
                    if ph is not None and ph.get('type') in ['sldNum','hdr','ftr','dt']:continue
                    assert not any((t.text or '').strip() for t in shape.findall('.//a:t',ns)),f"Nonempty slide notes: {ppt.name}"
            if name.startswith('ppt/slides/_rels/') and name.endswith('.rels'):
                links.update(r.get('Target') for r in E.fromstring(z.read(name)) if r.get('TargetMode')=='External')
        source_links=set(url for slide in manifest['slides'] for url in slide['links'])
        revision=expected.get('codeRevision')
        if revision:
            prefix=re.escape(project['repository'])
            source_links={re.sub('('+prefix+r'/(?:blob|tree|commits)/)main(?=/|$)',lambda m:m[1]+revision,url) for url in source_links}
        assert source_links==links,f"PPT hyperlink set differs: {ppt.name}"
    print(f"PASS: {ppt.name}, {count} slides, empty notes/author metadata, {len(links)} verified links")
