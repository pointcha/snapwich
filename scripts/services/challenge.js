'use strict';

app.factory('Challenge', function(FURL, $firebase) {
	var ref = new Firebase(FURL);
	var challenges = $firebase(ref.child('challenge')).$asArray();
	//var user = Auth.user;

	var Challenge = {
		all: challenges,

		createChallenge: function(challenge) {
			// challenge.datetime = Firebase.ServerValue.TIMESTAMP;
			return challenges.$add(challenge).then(function(newChallenge) {

				// Create User-Tasks lookup record for POSTER
				var obj = {
					challengeId: newChallenge.key(),
					title: challenge.title
				};

				//return $firebase(ref.child('user_challenges').child(challenge.poster)).$push(obj);
			});
		}
	};

	return Challenge;

});