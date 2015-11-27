'use strict';

app.controller('ChallengeController', function($scope, FURL, $firebase, $location, Challenge, toaster) {

	var ref = new Firebase(FURL);
	var fbChallenges = $firebase(ref.child('challenge')).$asArray();
	var fbItems = $firebase(ref.child('items')).$asArray();

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

				var arraynumber = fbItems.length; // how many items in the array
				var challengearray = shuffleArray(fbItems, arraynumber);

				console.log(challenge.code);

				ref.child('challenge').child(challenge.code).set({ title: challenge.title.toLowerCase(), code: challenge.code, itemNum: challenge.itemNumber, status: challenge.status});
				

for (var j = 0; j < challengearray.length; j++) { 
console.log(challengearray);
	var challengeitem = challengearray[j].title;
	console.log(challengeitem);
	ref.child('challenge').child(challenge.code).child('items').child(challengeitem).set({ points: challengearray[j].points });
}


				

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

		function randomString(length, chars) {
			var result = '';
			for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
				return result;
		}

		function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function shuffleArray(array, numberinarray) {
// shuffle array
    for (var i = numberinarray - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
console.log(array);
// pull last items into final array
var itemnumber = $scope.challenge.itemNum;
var challengearray = array.slice(Math.max(array.length - itemnumber, 1))
console.log(challengearray);
    return challengearray;
}

	});