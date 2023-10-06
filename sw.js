const CapturaPWA = "CapturaEIMP@v3-cache";
const assets = [
  "/captura/",
  "/captura/index.html",
  "/captura/src/styles/style_calibracion2023.css",
  "/captura/src/icon/camera-icon.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(CapturaPWA).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('activate',(e)=>{
   e.waitUntil(
       caches.keys().then(cacheList=>{
          return Promise.all(
              cacheList.map(cache=>{
                  if(!CapturaPWA.includes(cache)){
                      return caches.delete(cache);
                  }
          
              }));

       })

   );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
