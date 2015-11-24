'use strict';

app.controller('ItemController', function($scope, FURL, $firebase, $location, toaster) {

	var ref = new Firebase(FURL);
	var fbItems = $firebase(ref.child('items')).$asArray();

	$scope.addItem = function(item) {	

// var iItem = $scope.item.title;

var userId = $scope.item.title;
  checkIfUserExists(userId);


		// 	fbItems.$add(item); 
		// toaster.pop('success', "Item added");
		// $scope.item = {title: '', points: ''};

		
		
			//$location.path('/admin/');
	};

function userExistsCallback(userId, exists) {
  if (exists) {
    alert('user ' + userId + ' exists!');
  } else {
    alert('user ' + userId + ' does not exist!');
  }
}

function checkIfUserExists(userId) {
  ref.child('items').child(userId).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    userExistsCallback(userId, exists);
  });
}

});