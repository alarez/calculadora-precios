const CACHE_NAME = "pwa-calculadora-v1.0.3";
const urlsToCache = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/script.js",
    "/icons/icon-192.png",
    "/icons/icon-512.png",
    "/images/logo-vetsmart.png",
    "/manifest.json"
];

// Instalación
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Archivos cacheados");
            return cache.addAll(urlsToCache);
        })
    );
});

// Activación y limpieza de versiones viejas
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Borrando cache viejo:", cache);
                        return caches.delete(cache);
                    }
                })
            )
        )
    );
});

// Fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
