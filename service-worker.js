var cacheName = 'ASL';
var cacheFiles = [
    'index.html',
    'afterschool.webmanifest',
    'lessons.js',
    'images/maths.png',
    'images/physics.png',
    'images/chemistry.png',
    'images/history.png',
    'images/geography.png',
    'images/sociology.png',
    'images/arts.png',
    'images/computer.png',
    'images/business.png',
    'images/economics.png',
    'images/icon1.png',
    'images/icon2.png',
    'tailwind.css'

];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files'); // caching all the files
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // Downloading the files if not present in the cache
            return r || fetch(e.request).then(function (response) {
                // adding the files to the cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});