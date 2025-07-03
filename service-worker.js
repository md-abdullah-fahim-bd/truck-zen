const CACHE_NAME = 'truck-zen-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/truck-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/noisejs/2.1.0/noise.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});