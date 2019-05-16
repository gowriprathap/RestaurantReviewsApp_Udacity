var staticCacheName = 'restaurant-static-v1'; //storing the name of the static cache in a variable

self.addEventListener('install', function(event){ //adding a listener for the install event
  event.waitUntil( //lets us signal how the install has progressed
    caches.open(staticCacheName).then(function(cache){
      return cache.addAll([ //once we get the cache, we call this function to cache all the URLs
        './',
        './index.html',
        './restaurant.html',
        './css/styles.css',
        './data/restaurants.json',
        './js/dbhelper.js',
        './js/main.js',
        './js/restaurant_info.js',
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
      ]);
    })
  );

self.addEventListener('activate', function(event){
event.waitUntil(
  caches.keys().then(function(cacheNames){ //getting all of the cache names that exist
    return Promise.all( //to wait on the completion of all the promises
      cacheNames.filter(function(cacheName){ //filtering the list of cache names
        return cacheName.startsWith('restaurant-') && //only need the cache names beginning with 'restaurant'
        cacheName != staticCacheName; //but it should not be the name of our static cache
      }).map(function(cacheName){ //list of all the caches which are not needed anymore
        return cache.delete(cacheName); //to remove the old cache
      })
    )
  })
);
});

});

self.addEventListener('fetch', function(event){
  event.respondWith( //telling the browser that we're going to handle the request ourselves
  // It either takes a response or a promise that resolves to a response
    caches.match(event.request).then(function(response){ //tries to find a match in a cache, and starts with the oldest
      //If there is no match for the cache, the promise will resolve to undefined
      if (response) return response; //if we get a match in the cache, we return it
      return fetch(event.request); //otherwise a fetch to the network for the original request
    })
  );
});
