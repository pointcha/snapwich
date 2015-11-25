'use strict';

app.controller('ItemController', function($scope, FURL, $firebase, $location, toaster) {

	var ref = new Firebase(FURL);
	var fbItems = $firebase(ref.child('items')).$asArray();

	$scope.addItem = function(item) {

		var userId = $scope.item.title;

		checkForTitle(item.title, function(doesExist) {

			if (doesExist) {
				// already exists
				toaster.pop('warning', "Item already exists");
			} else {
				// does not exist
				ref.child('items').child(item.title).set({ title: item.title, points: item.points });
				toaster.pop('success', "Item added");
				$scope.item = {title: '', points: ''};
			}

		});
	};

	function checkForTitle(title, cb) {
		var titleRef = ref.child('items').child(title).once('value', function(snap) {
			cb(snap.exists());
		});
	}

});