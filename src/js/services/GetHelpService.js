app.factory('GetHelp', function() {

	/* Proposed IDs associated with moods
	Mood        ID
	Anger		0
    Disgust		1
    Fear		2
    Happiness	3
    Sadness		4
    Surprise	5
	*/

	/*
	//Proposed constructor for feedback objects
	function feedback(copingStrategy, response) {
		//response === 1 if user responded 'yes' to the copingStrategy
		//response === 0 if user responded 'no' to the copingStrategy
		this.copingStrategy = copingStrategy;
		this.response = response;
	}
	*/

	//Get latest mood log
	//Will be retrieved from database once it is setup
	var latestMoodLog = null;

	//Get all feedback about coping strategies
	//Assume allFeedback is an array of feedback objects
	//Will be retrieved from database once it is setup
	var allFeedback = null;

	//Coping strategies for anger
	var angerStrats = [
		"Go to the gym",
		"Go for a walk"
	];

	//Coping strategies for disgust
	var disgustStrats = [
		"Speak with a trusted family member about your day",
		"Take a bath"
	];

	//Coping strategies for fear
	var fearStrats = [
		"Call a family member or friend",
		"Surround yourself with friends"
	];

	//Coping strategies for happiness
	var happinessStrats = [
		"Keep being happy!",
		"Continue doing what made you happy in the first place!"
	];

	//Coping strategies for sadness
	var sadnessStrats = [
		"Eat ice cream",
		"Watch Spongebob"
	];

	//Coping strategies for surprise
	var surpriseStrats = [
		"Speak with a friend about your current situation",
		"Watch television"
	];

	//An array of general coping strategies. Contains all coping strategies from above
	var generalStrats = angerStrats.concat(disgustStrats, fearStrats, happinessStrats, sadnessStrats, surpriseStrats);

	//Returns an array of coping strategies for the user's latest mood
	function getSpecificStrategies() {
		//Select coping strategies that match the latest mood
		switch(latestMoodLog.mood) {
			//If mood is angry
			case 0:
				return angerStrats;
			break;
			//If mood is disgust
			case 1:
				return disgustStrats;
			break;
			//If mood is fear
			case 2:
				return fearStrats;
			break;
			//If mood is happiness
			case 3:
				return happinessStrats;
			break;
			//If mood is sadness
			case 4:
				return sadnessStrats;
			break;
			//If mood is surprise
			case 5:
				return surpriseStrats;
			break;
			default:
				return generalStrats;
		}
	}

	//Returns an array of coping strategies that have worked in the past
	function getGoodStrategies() {
		var filtered = [];
		allFeedback.forEach((feedback) => {
			//If the user thought a coping strategy was good in the past, redisplay the coping strategy
			if(feedback.response === 1) {
				filtered.push(feedback.copingStrategy);
			}
		})
		return filtered;
	}

	//Return general coping strategies, specific coping strategies, and coping strategies that have worked in the past
	return {
		generalStrategies: generalStrats,
		specificStrategies: getSpecificStrategies,
		pastStrategies: getGoodStrategies
	};
});
