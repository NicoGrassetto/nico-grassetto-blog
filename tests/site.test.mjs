import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const site = new URL('https://www.nicograssetto.com');
const readOutput = (file) => readFileSync(path.join(dist, file), 'utf8');
const homepage = readOutput('index.html');
const blog = readOutput('blog/index.html');
const feed = readOutput('feed');
const caseStudies = [
  'case-studies/environmental-permits.html',
  'case-studies/port-digital-colleague.html',
  'case-studies/speech-translation.html',
];
const legacyArticleURLs = [
  'https://www.nicograssetto.com/blog/agi-as-a-multi-dimensional-spectrum',
  'https://www.nicograssetto.com/blog/ptu-deep-dive',
];

function rssField(item, field) {
  const match = item.match(new RegExp(`<${field}>(.*?)</${field}>`, 's'));
  assert.ok(match, `RSS item is missing ${field}`);
  return match[1];
}

const rssItems = [...feed.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
  link: rssField(item, 'link'),
  guid: rssField(item, 'guid'),
  date: Date.parse(rssField(item, 'pubDate')),
}));

test('the landing page links to the blog, RSS, and latest published article', () => {
  assert.match(homepage, /<h1 id="hero-title">Artificial Intelligence Without the Bullsh\*\*\.<\/h1>/);
  assert.match(homepage, /href="\/blog\/">Blog<\/a>/);
  assert.match(homepage, /type="application\/rss\+xml"[^>]*href="\/feed"/);
  assert.match(homepage, /rel="canonical" href="https:\/\/www\.nicograssetto\.com\/"/);
  const announcement = homepage.match(/class="announcement-link" href="([^"]+)"/);
  assert.ok(announcement);
  assert.equal(announcement[1], new URL(rssItems[0].link).pathname);
});

test('existing article URLs and RSS identifiers remain unchanged', () => {
  for (const url of legacyArticleURLs) {
    assert.ok(rssItems.some((item) => item.link === url && item.guid === url), `Missing legacy RSS item: ${url}`);
    assert.ok(existsSync(path.join(dist, new URL(url).pathname, 'index.html')), `Missing legacy article: ${url}`);
  }
  assert.ok(feed.includes('<link>https://www.nicograssetto.com/blog/</link>'));
  assert.match(feed, /<atom:link href="https:\/\/www\.nicograssetto\.com\/feed"/);
});

test('the blog preserves the original three-column design and sections', () => {
  assert.match(blog, /class="container-full"/);
  assert.match(blog, /class="three-column-grid"/);
  assert.equal([...blog.matchAll(/class="column"/g)].length, 3);
  assert.match(blog, /class="profile-image"/);
  assert.match(blog, /id="ascii-loader"/);
  const sections = [...blog.matchAll(/<h2 class="section-header"[^>]*>([^<]+)<\/h2>/g)].map(([, title]) => title);
  assert.deepEqual(sections, ['INTRO', 'LINKS', 'PROJECTS', 'OPEN SOURCE', 'POSTS', 'READING LIST']);
});

test('the blog index, article routes, and RSS agree on published posts and order', () => {
  const links = [...blog.matchAll(/href="(\/blog\/[^"#?]+)" class="blog-post-card"/g)].map(([, href]) => href);
  assert.deepEqual(links, rssItems.map((item) => new URL(item.link).pathname));
  const articleDirectories = readdirSync(path.join(dist, 'blog'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  assert.deepEqual(articleDirectories, links.map((href) => href.split('/').at(-1)).sort());
  assert.deepEqual(rssItems.map((item) => item.date), rssItems.map((item) => item.date).sort((a, b) => b - a));
  for (const item of rssItems) {
    const article = readOutput(path.join(new URL(item.link).pathname, 'index.html'));
    assert.match(article, /href="\/blog\/" class="back-link"/);
    assert.doesNotMatch(article, /\/assets\/(?:styles\.css|three\.js|site\.js)/);
  }
  assert.match(blog, /href="\/" aria-label="Nico Grassetto, home"/);
  assert.doesNotMatch(blog, /\/assets\/(?:styles\.css|three\.js|site\.js)/);
});

test('imported pages and the blog resolve all local asset and navigation URLs', () => {
  for (const file of ['index.html', 'blog/index.html', ...caseStudies]) {
    const pageURL = new URL(file, site);
    for (const [, reference] of readOutput(file).matchAll(/(?:src|href)="([^"]+)"/g)) {
      const url = new URL(reference, pageURL);
      if (url.origin !== site.origin) continue;
      const target = path.join(dist, decodeURIComponent(url.pathname));
      const candidates = [target, path.join(target, 'index.html')];
      assert.ok(
        candidates.some((candidate) => existsSync(candidate) && statSync(candidate).isFile()),
        `${file} has a broken local reference: ${reference}`,
      );
    }
  }
});

test('legacy auxiliary pages and imported third-party licenses remain available', () => {
  for (const file of [
    'about/index.html',
    'pipe-flow-preview/index.html',
    'pipe-flow-preview.html',
    'assets/geist-pixel-square.woff2',
    'assets/geist-pixel-LICENSE',
    'assets/lucide-LICENSE',
    'assets/three-LICENSE',
  ]) {
    assert.ok(existsSync(path.join(dist, file)), `Missing file: ${file}`);
  }
});
