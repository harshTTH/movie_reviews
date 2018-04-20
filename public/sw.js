var CACHE_NAME = 'mov_re_stat_v1';

self.addEventListener('fetch',(event)=>{
    event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        if(event.request.url.indexOf('movie_id=') >= 0 ||
        event.request.url.indexOf('desc.php') >= 0 ||
        event.request.url.indexOf('displayComment.php') > 0 ||
        event.request.url.indexOf('review.php') > 0){
            caches.open(CACHE_NAME)
            .then((cache)=>cache.add(event.request.url))
        }
        return fetch(event.request);
      }
    )
  );
})
