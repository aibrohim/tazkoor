const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"]

const self = this;

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("opened")
        return cache.addAll(urlsToCache)
      })
  );
})

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request)
      .then(() => fetch(evt.request))
  )
})

self.addEventListener("activate", (evt) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  evt.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhiteList.includes(cacheName)) {
          return caches.delete(cacheName)
        }
      })
    ))
  )
})