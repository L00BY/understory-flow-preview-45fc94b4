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

test('settings keep notifications off by default and require explicit permission', () => {
  const html = read('index.html');
  assert.match(html, /id="settingsButton"/);
  assert.match(html, /notifications:false/);
  assert.match(html, /function renderSettings/);
  assert.match(html, /Notification\.requestPermission\(\)/);
  assert.match(html, /Only reminders you create/);
  assert.match(html, /nothing is sent to a server/i);
});
