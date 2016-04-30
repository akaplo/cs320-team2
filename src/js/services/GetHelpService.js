app.factory('GetHelp', function(sqlService) {

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

	var latestMoodLog = {
		mood: 5
	};
//Get all the mood logs?
	sqlService.executeQuery('SELECT * FROM mood_logs').then(function(result){
		//Get the latest mood log. Latest mood log is at the (length - 1)th row
		console.log("Query result", result.rows.item(result.rows.length - 1))
		latestMoodLog.mood = result.rows.item(result.rows.length - 1).id;
	}),
		(err) => console.log("Query error", err)

	//Coping strategies for anger
	var angerStrats = [
		{name:"Go to the gym", id: 0},
		{name:"Go for a walk", id: 1}
	];

	//Coping strategies for disgust
	var disgustStrats = [
		{name: "Speak with a trusted family member about your day", id: 0},
		{name:"Take a bath", id: 1}
	];

	//Coping strategies for fear
	var fearStrats = [
		{name: "Call a family member or friend", id: 0},
		{name: "Surround yourself with friends", id: 1}
	];

	//Coping strategies for happiness
	var happinessStrats = [
		{name: "Keep being happy!", id: 0},
		{name: "Continue doing what made you happy in the first place!", id: 1}
	];

	//Coping strategies for sadness
	var sadnessStrats = [
		{name: "Eat ice cream", id: 0},
		{name: "Watch Spongebob", id: 1}
	];

	//Coping strategies for surprise
	var surpriseStrats = [
		{name: "Speak with a friend about your current situation", id: 0},
		{name: "Watch television", id: 1}
	];

	//Get all feedback about coping strategies
	//Assume allFeedback is an array of feedback objects
	//Will be retrieved from database once it is setup
	var allFeedback = angerStrats.concat(disgustStrats, fearStrats, happinessStrats, sadnessStrats, surpriseStrats);

	//An array of general coping strategies. Contains all coping strategies from above.
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
	function getGoodStrategies(cb) {
		var strats = []
		sqlService.executeQuery('SELECT * FROM feedback').then(function(result){
			for (var i = 0; i < result.rows.length; i++) {
				console.log("Query result", result.rows.item(i));
				if (result.rows.item(i).response === 1) {
					cb(result.rows.item(i));
				}
			}
			return strats;
		}),
			(err) => console.log("Query error", err)
		/*  uncomment when we know how to get
		 * whether or not a strategy is "good" or not.
		 * FOr now, this funciton returns ALL coping strats.
		allFeedback.forEach((feedback) => {
			//If the user thought a coping strategy was good in the past, redisplay the coping strategy
			if(feedback.response || feedback.response === 1) {
				filtered.push(feedback.copingStrategy);
			}
		})
		*/
	}

	//Return general coping strategies, specific coping strategies, and coping strategies that have worked in the past
	return {
		generalStrategies: generalStrats,
		specificStrategies: getSpecificStrategies,
		pastStrategies: getGoodStrategies
	};
});
