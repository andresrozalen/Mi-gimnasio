const CACHE='mi-gimnasio-shell-v2';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 const allowed=FILES.map(p=>new URL(p,self.registration.scope).href);
 if(!allowed.includes(url.href))return;
 event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)))}return response}).catch(async()=>{const cached=await caches.match(event.request);return cached||new Response('Abre Mi Gimnasio una vez con conexión para preparar el acceso sin conexión.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}})}));
});
