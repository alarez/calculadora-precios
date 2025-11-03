const CACHE_NAME = "calc-precio-v1.1";
const urlsToCache = [
    "index.html",
    "css/style.css",
    "js/script.js",
    "manifest.json",
    "icons/icon-192.png",
    "icons/icon-512.png"
];

// Instalar y cachear archivos
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// Activar y limpiar cachés viejos
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Interceptar solicitudes
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
