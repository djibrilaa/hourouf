// Hourouf — service worker : coquille en cache, audio mis en cache à la première écoute.
const V = "hourouf-v4";
const SHELL = ["./", "./index.html", "./data.js", "./manifest.webmanifest",
               "./logo.png", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;   // polices Google : réseau direct

  // Audio : cache d'abord, puis réseau, et on garde une copie.
  if (url.pathname.includes("/audio/")) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(req, cp)); }
        return res;
      }).catch(() => new Response("", { status: 404 })))
    );
    return;
  }

  // Reste : réseau d'abord (pour recevoir les mises à jour), repli sur le cache hors ligne.
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(req, cp)); }
      return res;
    }).catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
  );
});
