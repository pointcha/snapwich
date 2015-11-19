app.controller('AuthController', function($scope, $location) {

$scope.title = "Clean my house";


	$scope.login = function(provider) {
    console.log(provider);
    $scope.title = provider;
  }

});