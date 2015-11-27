'use strict';

app.controller('ChallengeController', function($scope, FURL, $firebase, $location, Challenge, toaster) {

	var ref = new Firebase(FURL);
	var fbChallenges = $firebase(ref.child('challenge')).$asArray();
	var fbItems = $firebase(ref.child('items')).$asArray();

	var tempItems = [];
	var challengeItems = [];
	var arraynumber = "";
	var randomnumber = "";
	var passItem = [];

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
				tempItems = fbItems;
				challengeItems = [];
				addItems(challenge.itemNumber);

				ref.child('challenge').child(challenge.code).set({ title: challenge.title.toLowerCase(), code: challenge.code, itemNum: challenge.itemNumber, status: challenge.status});
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

		function addItems(itemnumber) {
			// pull items into array
			// find out how many items are in the challenge 
			console.log(itemnumber);
			// count items in array
			arraynumber = tempItems.length;
			console.log(arraynumber);
			// get random number between 0 and item number in array
			randomnumber = randomIntFromInterval(0,arraynumber); 
			console.log(randomnumber);
			// retrieve item [i] from the array
			passItem = tempItems[randomnumber];
			console.log(passItem);
			
			// count items in second array
			if (challengeItems.length < itemnumber) {
				// add item to second array if need more
				challengeItems.push(passItem);
				// remove item from first array
				tempItems.splice(randomnumber);
				console.log(challengeItems);

				addItems(itemnumber)
			} 
			
			// save second array to firebace challenge

console.log(fbItems);
		}

	});