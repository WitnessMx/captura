const CapturaPWA = "CapturaEIMP@v1-cache";
const assets = [
  "/",
  "/index.html",
  "/src/styles/style_calibracion2023.css",
  "/src/icon/camera-icon.png"
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
                  if(!mapaPWA.includes(cache)){
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