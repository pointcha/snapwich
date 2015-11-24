'use strict';

app.controller('ItemController', function($scope, FURL, $firebase, $location, toaster) {

	var ref = new Firebase(FURL);
	var fbItems = $firebase(ref.child('items')).$asArray();

	$scope.addItem = function(item) {	

var iItem = $scope.item.title;

		if (itemExists(iItem)) {
			
		toaster.pop('success', "Item already exists");
		$scope.item = {title: '', points: ''};

		} else {

			fbItems.$add(item); 
		toaster.pop('success', "Item added");
		$scope.item = {title: '', points: ''};
		
		}

		
		
			//$location.path('/admin/');
	};

	function itemExists(iItem) {
		var existsFlag = false;

		for (var r = 0; 1 < $scope.item.length; r++) {
			if (iItem == $scope.items[r].title) {
				existsFlag = true;
			} 
		}
		return existsFlag;
	} 

});