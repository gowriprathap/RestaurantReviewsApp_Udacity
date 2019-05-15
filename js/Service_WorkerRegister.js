//js file to register the service worker
if ('serviceWorker' in navigator){ //this if statement is only executed if browser supports the service worker, else skips this statement
  navigator.serviceWorker.register('./sw.js')
  .then(function(){
console.log('Registration worked'); //logging a success message if the service worker registration is successful
})
 .catch(function(){
console.log('Registration failed'); //logging a failure message if the service worker registration failed
});

}
//service worker only works on HTTPS
