
let CACHE_NAME = 'restaurant-cache-v2';
let urlsToCache = [
    '/',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      })
    );
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // If response is present in Cache return from it
          if (response) {
            return response;
          }
  
          //If response is not present in the cache then add it to cache 
          let fetchRequest = event.request.clone();
  
          return fetch(fetchRequest).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              //Cloning the response as we want browser as well as cache to consume the response
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });