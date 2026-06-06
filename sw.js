/*
  Pokemon Void - Service Worker
  Strategy: NETWORK-FIRST for app code/data, CACHE-FIRST for sprites/images.

  Why network-first for code/data:
    Online users always get the freshest deploy immediately, exactly like the
    plain website does today. The cache is only a fallback for when the network
    is unavailable (offline). This avoids the "I deployed but it still shows the
    old version" problem.

  Why cache-first for sprites/images:
    Image files never change once added (a new sprite is a new filename), so
    serving them from cache is safe and makes the app feel instant offline.

  To force every client to drop old caches after a deploy, bump CACHE_VERSION.
  You do NOT need to do this for normal content updates (network-first handles
  those automatically) - only bump it if you change this service worker file
  itself or want to guarantee a hard cache reset.
*/

const CACHE_VERSION = 'voiddex-v1';
const APP_CACHE = CACHE_VERSION + '-app';
const IMG_CACHE = CACHE_VERSION + '-img';

// Core files that make up the app shell. These are precached on install so the
// site can boot offline. Sprites are NOT listed here - they are cached lazily
// as they are requested (there are 900+ of them).
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './data.js',
  './sprites/manifest.json',
  './wiki/data-dex.js',
  './wiki/data-game.js',
  './wiki/ui.jsx',
  './wiki/view-pokedex.jsx',
  './wiki/view-detail.jsx',
  './wiki/view-moves.jsx',
  './wiki/view-abilities.jsx',
  './wiki/view-items.jsx',
  './wiki/view-routes.jsx',
  './wiki/view-types.jsx',
  './wiki/view-team.jsx',
  './wiki/view-compare.jsx',
  './wiki/view-living.jsx',
  './wiki/view-catch.jsx',
  './wiki/view-nuzlocke.jsx',
  './wiki/view-riddles.jsx',
  './wiki/view-battle.jsx',
  './wiki/view-vote.jsx',
  './wiki/view-leaderboard.jsx',
  './wiki/view-damage.jsx'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then((cache) => {
        // addAll fails the whole install if any single file 404s, so add them
        // individually and ignore the ones that are not present.
        return Promise.all(
          PRECACHE_URLS.map((url) =>
            cache.add(url).catch(() => { /* skip missing file */ })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== APP_CACHE && key !== IMG_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET. Anything else (e.g. Supabase POSTs for the leaderboard)
  // goes straight to the network, untouched.
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never touch cross-origin requests (React/Babel CDN, Google Fonts, Supabase,
  // Discord, etc.). Let the browser handle them normally.
  if (url.origin !== self.location.origin) return;

  // Images / sprites: cache-first.
  const isImage =
    req.destination === 'image' ||
    /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(url.pathname);

  if (isImage) {
    event.respondWith(
      caches.open(IMG_CACHE).then((cache) =>
        cache.match(req).then((cached) => {
          if (cached) return cached;
          return fetch(req)
            .then((resp) => {
              if (resp && resp.ok) cache.put(req, resp.clone());
              return resp;
            })
            .catch(() => cached);
        })
      )
    );
    return;
  }

  // Everything else (HTML, JS, JSX, JSON): network-first, fall back to cache.
  event.respondWith(
    fetch(req)
      .then((resp) => {
        if (resp && resp.ok) {
          const copy = resp.clone();
          caches.open(APP_CACHE).then((cache) => cache.put(req, copy));
        }
        return resp;
      })
      .catch(() =>
        caches.match(req).then((cached) => {
          if (cached) return cached;
          // Last resort for navigations: serve the cached shell so the app
          // still boots offline even on an uncached deep link.
          if (req.mode === 'navigate') return caches.match('./index.html');
          return undefined;
        })
      )
  );
});
