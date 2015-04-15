var app = angular.module('fb-upload',['ngFacebook']);

app.config(function($facebookProvider) {
	$facebookProvider.setAppId('421184968045936');
});

/* already hardcoded into index.html 
app.run( function( $rootScope ) {
  // Load the facebook SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {console.log('already done');return;}

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
});
*/

app.controller('flowCtrl', function ($scope, $facebook) {
    //Approach: login - authenticate - upload - post.
  
    $scope.isLoggedIn = false;
  
    $scope.login = function() {
        console.log("Logging In");
        $facebook.login().then(function() {
            console.log("Logged In");
            refresh();
        },
        function(error) {
            console.log(err);
        });
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
    }

    refresh();

});