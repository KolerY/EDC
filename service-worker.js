//Update cache names any time any of the cached files change.
const CACHE_NAME = "static-cache-v29";
//Add list of files to cache here.
const FILES_TO_CACHE = [
  "offline.html",
  "index.html",
  "confirmation.html",
  "faq.html",
  "information.html",
  "programme.html",
];

self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  //Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
    console.log("[ServiceWorker] Fetch", evt.request.url);
  
    evt.respondWith(
      caches.match(evt.request).then((response) => {
        if (response) {
          return response; // Return the cached response if we have it
        }
        return fetch(evt.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            // Cache the new response for future requests
            cache.put(evt.request.url, response.clone());
            return response;
          });
        });
      }).catch(() => {
        // If both the cache and network fail, show the offline page
        return caches.match("offline.html");
      })
    );
  });
