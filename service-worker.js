var cacheName = 'ASL';
var cacheFiles = [
    'index.html',
    'afterschool.webmanifest',
    'lessons.js',
    'images/art.jpg',
    'images/math.jpg',
    'images/physics.jpg',
    'images/geography.jpg',
    'images/sociology.jpg',
    'images/computer.jpg',
    'images/business.jpg',
    'images/Businesss.jpg',
    'images/eco.jpg',
    'images/wh.jpg',
    'images/ca.jpg',
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
