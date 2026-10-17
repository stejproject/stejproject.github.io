// Service Worker untuk STEJProject Apps
// Domain: https://stejproject.github.io/

const CACHE_NAME = 'stejproject-cache-v1';
const OFFLINE_URL = './index.html';

// File utama yang wajib disimpan agar bisa berjalan offline
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js',
  'fonts.googleapis.com/css',
  'translate.googleapis.com/element/log',
  './images/favicon-128.ico',
  './images/favicon-128.png'
];

// Install Event - Menyimpan aset utama ke cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Memulai precaching aset utama');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Menghapus cache versi lama jika ada pembaruan
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('[SW] Menghapus cache lama:', key);
            return caches.delete(key);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Mengatur strategi pembacaan file offline & online
self.addEventListener('fetch', (event) => {
  // Hanya proses request GET dan abaikan skema non-http (seperti chrome-extension)
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);

  // STRATEGI A: File internal (Same Origin) -> Cache First, update di background
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Stale-While-Revalidate: Berikan cache dengan cepat, lalu update di background jika ada koneksi
          fetch(event.request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          }).catch(() => {/* Abaikan error update di background */});
          
          return cachedResponse;
        }

        // Jika tidak ada di cache, ambil dari internet
        return fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => {
            // Jika benar-benar offline dan pengguna membuka halaman utama
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
          });
      })
    );
  } else {
    // STRATEGI B: File eksternal (CDN/Fonts/Tailwind) -> Network First, Fallback ke Cache
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Simpan aset CDN yang sukses diakses ke dalam cache
          if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Jika pengguna sedang offline, ambil aset CDN dari cache (jika pernah dibuka sebelumnya)
          return caches.match(event.request);
        })
    );
  }
});

// Menerima instruksi skipWaiting dari file HTML/JS utama jika ada aplikasi versi baru
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
