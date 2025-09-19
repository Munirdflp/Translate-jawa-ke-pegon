const CACHE_NAME = 'pegon-transliterator-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/icon-192.png', // 
  '/icon-512.png'  // 
];

// Instalasi Service Worker dan caching file
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Mengambil file dari cache saat offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Mengembalikan dari cache
        }
        return fetch(event.request); // Mengambil dari jaringan jika tidak ada di cache
      })
  );

});
