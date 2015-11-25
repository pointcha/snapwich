'use strict';

app.controller('ChallengeController', function($scope, FURL, $firebase, $location, Challenge) {

	var ref = new Firebase(FURL);
	var fbChallenges = $firebase(ref.child('challenge')).$asArray();
	$scope.challenges = fbChallenges;

	$scope.createChallenge = function(challenge) {	

// generate unique code

		var iCode = randomString(7, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
		while (codeExists(iCode)) {
			iCode = randomString(7, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
		}

		$scope.challenge.status = 'ready';
		$scope.challenge.code = iCode;

		//$scope.challenge.name = Auth.user.profile.name;
		//$scope.challenge.poster = Auth.user.uid;

		Challenge.createChallenge($scope.challenge).then(function(ref) {
			$scope.challenge = {title: '', code: '', status: 'open', host: '', leader: '', name: ''};
			$location.path('/admin/');
		});
	};

	function randomString(length, chars) {
		var result = '';
		for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
			return result;
	}

	function codeExists(iCode) {
		var existsFlag = false;

		for (var r = 0; 1 < $scope.challenge.length; r++) {
			if (iCode == $scope.challenge[r].code) {
				existsFlag = true;
			} 
		}
		return existsFlag;
	} 

});