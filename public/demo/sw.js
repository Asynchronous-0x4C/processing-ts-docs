const CACHE_NAME = "v1"

let urlsToCache = [
  '../demo/',
  '../demo/style.css'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(urlsToCache)
    })
  );
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(e.request).then((response) => {
        return response || fetch(e.request).then((response) => {
          console.log(response)
          cache.put(e.request, response.clone());
          return response;
        });
      })
    )
  );

});