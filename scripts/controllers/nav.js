'use strict';

app.controller('NavController', function($scope, $location, Auth, toaster) {

  $scope.logout = function() {    
    Auth.logout();    
    toaster.pop('success', "Logged out successfully");
    $location.path('/');
  };

  // straight navigation redirection
	$scope.go = function ( path ) {
  $location.path( path );
};
	
});