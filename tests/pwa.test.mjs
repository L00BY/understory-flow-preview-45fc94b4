import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = name => readFileSync(join(root, name), 'utf8');

test('web manifest defines a standalone Understory app with install icons', () => {
  assert.ok(existsSync(join(root, 'manifest.webmanifest')));
  const manifest = JSON.parse(read('manifest.webmanifest'));
  assert.equal(manifest.name, 'Understory');
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.start_url, './');
  assert.ok(manifest.icons.some(icon => icon.sizes === '192x192'));
  assert.ok(manifest.icons.some(icon => icon.sizes === '512x512'));
});

test('HTML advertises installability and registers offline support', () => {
  const html = read('index.html');
  assert.match(html, /rel="manifest" href="manifest\.webmanifest"/);
  assert.match(html, /apple-mobile-web-app-capable/);
  assert.match(html, /apple-touch-icon/);
  assert.match(html, /navigator\.serviceWorker\.register\('\.\/service-worker\.js'\)/);
});

test('service worker caches the core offline experience', () => {
  assert.ok(existsSync(join(root, 'service-worker.js')));
  const sw = read('service-worker.js');
  for (const asset of ['./', './index.html', './manifest.webmanifest', './assets/background.png']) {
    assert.ok(sw.includes(asset), `missing cached asset ${asset}`);
  }
  assert.match(sw, /addEventListener\('install'/);
  assert.match(sw, /addEventListener\('fetch'/);
});

test('app opens into a connected Home, journal, clarity, and settings shell', () => {
  const html = read('index.html');
  assert.match(html, /function renderHome/);
  assert.match(html, /id="homeSpiral"/);
  assert.match(html, /id="homeClarity"/);
  assert.match(html, /id="homeJournal"/);
  assert.match(html, /function renderJournal/);
  assert.match(html, /Add a part of me/);
  assert.match(html, /Grow this branch/);
});

test('settings contain local privacy and installation controls but no notifications', () => {
  const html = read('index.html');
  assert.match(html, /id="settingsButton"/);
  assert.match(html, /function renderSettings/);
  assert.doesNotMatch(html, /Notification\.requestPermission/);
  assert.doesNotMatch(html, /Enable notifications/);
  assert.match(html, /nothing is sent to a server/i);
});

test('journal is an interactive self-map with good and bad outcome branches', () => {
  const html = read('index.html');
  assert.match(html, /function renderSelfMap/);
  assert.match(html, /function renderMapAdd/);
  assert.match(html, /class="meNode"/);
  assert.match(html, /Good that comes from it/);
  assert.match(html, /Bad that comes from it/);
  assert.match(html, /state\.selfMap/);
});

test('carry-through route explores the trigger and provides tailored support', () => {
  const html = read('index.html');
  assert.match(html, /const carrySteps/);
  assert.match(html, /function renderCarry/);
  assert.match(html, /What happened right before it got this loud/);
  assert.match(html, /Why this may be happening/);
  assert.match(html, /Stay with me for one minute/);
  assert.match(html, /function renderCarryStay/);
});

test('every screen paperizes the answer and interaction area, not question headings', () => {
  const html = read('index.html');
  assert.match(html, /function paperize/);
  assert.match(html, /\.answerPaper/);
  assert.match(html, /clip-path:polygon/);
  assert.doesNotMatch(html, /\.stage h1,\.homeBrand/);
});

test('offline cache is bumped for corrected paper placement', () => {
  assert.match(read('service-worker.js'), /understory-shell-v4/);
});
