var cacheName = '99pets+-v1.2';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        './index.html',
       

        './style.css',
         './script.js',
        
         './chamados-pet/index.html',
         './dog-location/index.html',
         './driver-location/index.html',
         './info-location/index.html',
         './list-locations/index.html',
         './pet-location/index.html',
         './list-pets/index.html',
         './list-pets/main.js',
         './login/index.html',
         './register/index.html',
         './register-pet/index.html',
         './service-pet/index.html',
        
        
        
        
        
        
        
        


        

    
        'images/dog.svg',
        'images/driver.svg',
        'images/local1.svg',
        'images/local2.svg',
        'images/local3.svg',
        'images/login.svg',
        'images/register.svg',
        'images/small-dog.svg',
        'images/small-dog2.svg',
          
        'images/download.png',
        'images/icon-cut.png',
        'images/logo.png',
        'images/logo2.png',       
            
        
        
        
  
        'images/logos/128.png',
        'images/logos/144.png',
        'images/logos/152.png',
        'images/logos/167.png',
        'images/logos/180.png',
        'images/logos/196.png',
        'images/logos/256.png',
        'images/logos/512.png',
        'images/logos/1024.png',

  

        
      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  //Atualizacao internet
  event.respondWith(async function () {
     try {
       return await fetch(event.request);
     } catch (err) {
       return caches.match(event.request);
     }
   }());

  //Atualizacao cache
  /*event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );*/

});

