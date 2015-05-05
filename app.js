angular.module('plunker', ['ui.bootstrap', 'ngFacebook'])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('414484898712790');
  $facebookProvider.setPermissions("email,user_likes,publish_actions,user_photos");
})

.run( function( $rootScope ) {
  // Load the facebook SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script'); 
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
})

;

var DemoCtrl = function ($scope, $facebook, $http) {
  
  $scope.isLoggedIn = false;
  
  $scope.login = function() {
    $facebook.login().then(function() {
      refresh();
    });
  };

  $scope.logout = function() {
    $facebook.logout().then(function() {
      $scope.isLoggedIn = false;
      refresh();
    });
  };

  $scope.uploadFile = function(files) {
    
    var fd = new FormData();
    //Take the first selected file
    fd.append("file", files[0]);
    //need to specify uploadurl after setting up server.
    $http.post(uploadUrl, fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success( console.log('done!') ).error( console.log('damnit!') );

  };

  $scope.test = function() {
    $facebook.login(function(){
      $facebook.api('/me/feed', 'post', {message: 'Hello, world!'});
}, {scope: 'publish_actions'});
  };

  function refresh() {
    $facebook.api("/me").then( 
      function(response) {
        $scope.welcomeMsg = "Welcome " + response.name;
        $scope.isLoggedIn = true;
      },
      function(err) {
        $scope.welcomeMsg = "Please log in";
      });
  };
  
  refresh();
};