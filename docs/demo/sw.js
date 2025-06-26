const CACHE_NAME = "v1"

let urlsToCache = [
  './',
  './style.css',
  './manifest.json',
  './sw.js',
  '../astro/browserAll.5ZF4ckep.js',
  '../astro/colorToUniform.Db5An2aa.js',
  '../astro/DemoScript.astro_astro_type_script_index_0_lang.CG-6-1R_.js',
  '../astro/ec.8zarh.js',
  '../astro/ec.v4551.css',
  '../astro/index.BJT2DUuG.css',
  '../astro/MobileTableOfContents.astro_astro_type_script_index_0_lang.DyuwL9FC.js',
  '../astro/page.C7AGz2l7.js',
  '../astro/preload-helper.oD9tGONt.js',
  '../astro/print.DNXP8c50.css',
  '../astro/processing-ts.D_YNDCeM.svg',
  '../astro/processing-ts.D_YNDCeM_A0IIg.svg',
  '../astro/Search.astro_astro_type_script_index_0_lang.CzqaJjEj.js',
  '../astro/SharedSystems.BG5W6Zoz.js',
  '../astro/TableOfContents.astro_astro_type_script_index_0_lang.BHhGlp-m.js',
  '../astro/ui-core.BPQDM9aU.js',
  '../astro/WebGLRenderer.Cl4GGwp7.js',
  '../astro/WebGPURenderer.D6FMXlPx.js',
  '../astro/webworkerAll.DMovJAsV.js'
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
          if(!response.url.startsWith("chrome-extension"))cache.put(e.request, response.clone());
          return response;
        });
      })
    )
  );

});