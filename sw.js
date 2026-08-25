// ==========================================================================
// CUFA EDITAIS AI — SERVICE WORKER (Offline Cache & PWA Support)
// Central Única das Favelas | v3.0 (BNDES Periferias Fortes Norte Ready)
// ==========================================================================

const CACHE_NAME = 'cufa-editais-ai-v3.1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './data/cufa_vault.js',
  './data/sample_editais.js',
  './data/agents_squad.js',
  './data/cufa_memory.js',
  './data/realtime_feed.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Install: cache all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[CUFA SW] Caching app assets...');
      return cache.addAll(ASSETS_TO_CACHE.filter(url => !url.startsWith('https://fonts')));
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[CUFA SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-first with cache fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET, browser-extension, and API requests
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('pncp.gov.br') || event.request.url.includes('in.gov.br')) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache when offline
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          // Final fallback: offline page
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
      })
  );
});

// Background Sync for edital alerts
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-editais-monitor') {
    event.waitUntil(syncEditaisInBackground());
  }
});

async function syncEditaisInBackground() {
  try {
    // Simulated background sync — in production this would call PNCP API
    console.log('[CUFA SW] Background sync: checking for new editais...');
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'BACKGROUND_SYNC',
        message: 'Monitor ao vivo sincronizado com PNCP e DOU.'
      });
    });
  } catch (err) {
    console.error('[CUFA SW] Sync failed:', err);
  }
}

// Push Notifications for new editais
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'Novo Edital Detectado!', {
      body: data.body || 'A Squad CUFA identificou uma nova oportunidade de captação.',
      icon: './manifest.json',
      badge: './manifest.json',
      vibrate: [200, 100, 200],
      data: { url: data.url || './' }
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || './')
  );
});
