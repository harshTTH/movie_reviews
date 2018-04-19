var CACHE_NAME = 'mov_re_stat_v1';
var urlsToCache = [
    'http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css',
    'http://www.theimdbapi.org/api/movie?movie_id=tt0111161',
    'http://www.theimdbapi.org/api/movie?movie_id=tt0068646',
    'http://www.theimdbapi.org/api/movie?movie_id=tt0071562',
    'http://www.theimdbapi.org/api/movie?movie_id=tt0110912',
    'http://www.theimdbapi.org/api/movie?movie_id=tt0060196',
    'http://www.theimdbapi.org/api/movie?movie_id=tt0137523',
    'http://www.theimdbapi.org/api/movie?movie_id=tt0109830',
    'http://www.theimdbapi.org/api/movie?movie_id=tt2582802',
    '/movies.php'
];

self.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log('Cache Opened');
            return cache.addAll(urlsToCache);
        })
    );
})

self.addEventListener('fetch',(event)=>{
    event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
})
