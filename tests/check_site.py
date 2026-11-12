"""Dependency-free structural checks for every published HTML and CSS file."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
errors = []

def check_reference(source, value):
    parsed = urlsplit(value)
    if parsed.scheme or value.startswith('//') or not parsed.path:
        return
    target = ROOT / unquote(parsed.path).lstrip('/') if parsed.path.startswith('/') else source.parent / unquote(parsed.path)
    if not target.exists():
        errors.append(f'{source.relative_to(ROOT)}: missing {value}')

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids = []
        self.charset = False
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.append(attrs['id'])
        if tag == 'meta' and attrs.get('charset', '').lower() == 'utf-8':
            self.charset = True
        for key in ('href', 'src', 'data-url', 'data-setbg'):
            if attrs.get(key):
                check_reference(self.path, attrs[key])
        if tag == 'img' and 'alt' not in attrs:
            errors.append(f'{self.path.relative_to(ROOT)}: image has no alt attribute')
        if tag == 'script' and any(host in attrs.get('src', '') for host in ('googletagmanager.com', 'clarity.ms', 'adsbygoogle')):
            errors.append(f'{self.path.relative_to(ROOT)}: unconditional tracking script')

pages = list(ROOT.rglob('*.html'))
for path in pages:
    parser = Page(path)
    parser.feed(path.read_text(encoding='utf-8'))
    if not parser.charset:
        errors.append(f'{path.relative_to(ROOT)}: missing UTF-8 declaration')
    for value, count in Counter(parser.ids).items():
        if count > 1:
            errors.append(f'{path.relative_to(ROOT)}: duplicate id {value}')

for path in ROOT.rglob('*.css'):
    for value in re.findall(r'url\(\s*[\'\"]?([^\)\'\"]+)', path.read_text()):
        check_reference(path, value)

manifest = json.loads((ROOT / 'images/site.webmanifest').read_text())
for icon in manifest['icons']:
    check_reference(ROOT / 'index.html', icon['src'])

for name in ('index', 'about', 'tracks', 'videos', 'blog', 'contact', 'privacy', 'cookies'):
    content = (ROOT / f'{name}.html').read_text()
    expected = 'https://www.siddysounds.com/' + ('' if name == 'index' else f'{name}.html')
    if not re.search(r'<link[^>]*href="' + re.escape(expected) + r'"[^>]*rel="canonical"', content):
        errors.append(f'{name}: wrong canonical URL')

if errors:
    print('\n'.join(errors))
    sys.exit(1)
print(f'PASS: {len(pages)} HTML pages; local links/assets, CSS URLs, duplicate IDs, UTF-8, image alternatives, tracking tags, canonical URLs and manifest.')
