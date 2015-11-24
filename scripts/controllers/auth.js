// define our app and dependencies (remember to include firebase!)

'use strict';

app.controller("AuthController", ["$scope", "$firebaseAuth",
  function($scope, $firebaseAuth) {
    var ref = new Firebase("https://snapwich.firebaseio.com");
    auth = $firebaseAuth(ref);

    $scope.login = function(provider) {
      $scope.authData = null;
      $scope.error = null;

      $location.path('/entry');

      auth.$authWithOAuthRedirect(provider).then(function(authData) {
        $scope.authData = authData;
        $location.path('/entry');
      }).catch(function(error) {
        $scope.error = error;
        console.log("login Failed!", error);
      });
    };
  }
  ]);