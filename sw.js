const CACHE = 'vitamins-v3';
const ASSETS = ['./index.html', './manifest.json', './BeeTeamVitaminLogo.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting(); // activate immediately, don't wait for old tabs to close
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim()) // take control of all open tabs immediately
  );
});

self.addEventListener('fetch', e =>
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request)) // network-first, cache as fallback
  )
);
