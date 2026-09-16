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
  assert.match(html, /Grow a new branch/);
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

test('journal graph renders one marbled pothos with botanical vines and outcome leaves', () => {
  const html = read('index.html');
  assert.match(html, /function renderCentralPothos/);
  assert.match(html, /function renderPothosLeaf/);
  assert.match(html, /function renderVine/);
  assert.match(html, /class="centralPothos"/);
  assert.match(html, /class="graphVine\$\{fine\}"/);
  assert.match(html, /class="pothosLeaf/);
  assert.match(html, /leaf--healthy/);
  assert.match(html, /leaf--dry/);
  assert.doesNotMatch(html, /class="graphNode"/);
  assert.doesNotMatch(html, /string of pearls/i);
  assert.doesNotMatch(html, /string of hearts/i);
});

test('pothos illustration uses natural variation, veins, marbling, depth, and dry texture', () => {
  const html = read('index.html');
  assert.match(html, /linearGradient id="leafHealthy"/);
  assert.match(html, /linearGradient id="leafDeep"/);
  assert.match(html, /linearGradient id="ceramicPot"/);
  assert.match(html, /filter id="leafShadow"/);
  assert.match(html, /class="leafVein"/);
  assert.match(html, /class="leafMarbling"/);
  assert.match(html, /class="dryMottle"/);
  assert.match(html, /\.graphVine\{[^}]*stroke-width:2/);
  assert.match(html, /\.graphVine--fine\{stroke-width:1\.15/);
  assert.match(html, /\.centralStem\{[^}]*stroke-width:3/);
  assert.match(html, /node\.type==='category'\?18:node\.type==='trait'\?13:9/);
  assert.match(html, /function naturalLeafShape/);
});

test('journal graph is immovable while reading and only explicit controls change zoom', () => {
  const html = read('index.html');
  assert.match(html, /function clampGraphCamera/);
  assert.match(html, /setAttribute\('viewBox'/);
  assert.match(html, /class="graphHit"/);
  assert.match(html, /function selectGraphNode/);
  assert.match(html, /function zoomSelectedNode/);
  assert.match(html, /id="graphHome"/);
  assert.doesNotMatch(html, /<text class="graphLabel"/);
  assert.doesNotMatch(html, /addEventListener\('pointerdown'/);
  assert.doesNotMatch(html, /addEventListener\('touchmove'/);
  assert.match(html, /\.stage\.graphStage\{overflow:hidden;overscroll-behavior:none/);
  assert.match(html, /\.graphViewport\{height:190px;min-height:190px;flex-shrink:0/);
  assert.match(html, /\.nodeDetail\{position:relative;height:80px;min-height:80px;overflow-y:auto;touch-action:pan-y/);
  assert.match(html, /touch-action:none/);
});

test('spiralling starts with one shared open context instead of a support wizard', () => {
  const html = read('index.html');
  assert.match(html, /Tell me what’s happening/);
  assert.match(html, /id="spiralContext"/);
  assert.match(html, /state\.spiral\.context/);
  assert.match(html, /function renderSpiralPaths/);
  assert.match(html, /function renderImpulseHold/);
});

test('impulsive route goes from held action directly to draft editor', () => {
  const html = read('index.html');
  assert.match(html, /id="heldAction"/);
  assert.match(html, /renderDraftBox\(\)/);
  assert.match(html, /Keep it locked and return home/);
  assert.match(html, /Optional pause setup/);
});

test('carry-through is immediate support and does not repeat trigger analysis', () => {
  const html = read('index.html');
  assert.match(html, /function renderCarryNow/);
  assert.match(html, /No more questions first/);
  assert.match(html, /Stay with this screen/);
});

test('pause flow provides a real lockable draft and removes dead-end options', () => {
  const html = read('index.html');
  assert.match(html, /function renderDraftBox/);
  assert.match(html, /function renderLockedDraft/);
  assert.match(html, /Lock this draft away/);
  assert.match(html, /state\.pause\.draft/);
  assert.doesNotMatch(html, /Hide the draft/);
  assert.doesNotMatch(html, /Put my phone down/);
  assert.doesNotMatch(html, /Move to another room/);
});

test('every screen paperizes the answer and interaction area, not question headings', () => {
  const html = read('index.html');
  assert.match(html, /function paperize/);
  assert.match(html, /\.answerPaper/);
  assert.match(html, /clip-path:polygon/);
  assert.doesNotMatch(html, /\.stage h1,\.homeBrand/);
});

test('offline cache is bumped for centred graph and shared spiral context', () => {
  assert.match(read('service-worker.js'), /understory-shell-v10/);
});
