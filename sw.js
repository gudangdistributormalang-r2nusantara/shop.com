const CACHE_NAME = 'r2-nusantara-v5.0';
const urlsToCache = [
  '/id.com/',
  '/id.com/index.html',
  '/id.com/style.css',
  '/id.com/app.js',
  '/id.com/data.js',
  '/id.com/manifest.json',
  'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
    .catch(error => console.log('Cache addAll failed:', error))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
    .then(response => {
      const responseToCache = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache)).catch(() => {});
      return response;
    })
    .catch(() => caches.match(event.request))
  );
});