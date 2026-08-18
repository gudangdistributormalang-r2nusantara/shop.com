const CACHE_NAME = 'r2-nusantara-v3';
const STATIC_ASSETS = [
  '/id.com/',
  '/id.com/index.html',
  '/id.com/style.css',
  '/id.com/app.js',
  '/id.com/data.js',
  '/id.com/manifest.json',
  '/id.com/assets/logo/logo.png',
  '/id.com/assets/logo/hero-bg.jpg',
  '/id.com/assets/logo/loader-bg.jpg',
  '/id.com/assets/logo/footer-bg.jpg',
  '/id.com/assets/logo/preview.jpg',
  '/id.com/assets/logo/watermark.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(STATIC_ASSETS))
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.pathname.startsWith('/assets/products/') || url.hostname === 'picsum.photos') {
    event.respondWith(
      caches.open('product-images').then(cache => {
        return cache.match(request).then(cached => {
          const fetchPromise = fetch(request).then(response => {
            cache.put(request, response.clone());
            return response;
          }).catch(() => new Response('', { status: 404 }));
          return cached || fetchPromise;
        });
      })
    );
    return;
  }
  event.respondWith(
    caches.match(request).then(cached => {
      return cached || fetch(request).catch(() => {
        if (request.headers.get('accept').includes('text/html')) {
          return caches.match('/id.com/index.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});