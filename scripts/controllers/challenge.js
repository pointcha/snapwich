'use strict';

app.controller('ChallengeController', function($scope, FURL, $firebase, $location, Challenge, toaster) {

	var ref = new Firebase(FURL);
	var fbChallenges = $firebase(ref.child('challenge')).$asArray();
	$scope.challenges = fbChallenges;

	$scope.createChallenge = function(challenge) {	

// generate unique code


var iCode = randomString(7, '23456789abcdefghjkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ');

$scope.challenge.status = 'ready';
$scope.challenge.code = iCode;
$scope.challenge.itemNum = challenge.itemNumber;

			//$scope.challenge = {title: '', code: '', status: 'open', host: '', leader: '', name: ''};

			checkForCode(challenge.code, function(doesExist) {

				if (doesExist) {
				// already exists
				toaster.pop('warning', "Code already exists");
			} else {
				// does not exist
				ref.child('challenge').child(challenge.code).set({ title: challenge.title, code: challenge.code, itemNum: challenge.itemNumber, status: challenge.status});
				toaster.pop('success', "Challenge created");
				$location.path('/admin/');
			}
		});

		};

		function checkForCode(title, cb) {
			var titleRef = ref.child('challenge').child(title).once('value', function(snap) {
				cb(snap.exists());
			});
		}

	});