app.controller('DashCtrl', function($scope, sqlService, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    console.log("ionicPlatform ready");
    // initialize database
    sqlService.init().then((res) => {
      // run a view query
      sqlService.viewTable('feedback').then(
        (result) => console.log("View result", result.rows.item(1)),
        (err) => console.log("View error", err)
      );

      sqlService.executeQuery('SELECT * FROM mood_logs').then(
        (result) => console.log("Query result", result.rows.item(0)),
        (err) => console.log("Query error", err)
      );

    }, (err) => console.log(err));
  });
});

app.controller('PreferencesCtrl', function($scope, sqlService, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    // initialize database
    sqlService.init().then((res) => {
      // run a view query
      sqlService.viewTable('preferences_table').then(
        (result) => console.log("View result", result, result.rows.item(0)),
        (err) => console.log("View error", err)
      );
    })
  });


  $scope.preferences = {};
  $scope.preferences.userName = "TODO:  CALL TO DATABASE!!!!";
  $scope.preferences.password = "TODO:  CALL TO DATABASE!!!!";
  $scope.preferences.helpContact = "TODO:  CALL TO DATABASE!!!!";
  $scope.preferences.splashScreen = "https://s3.amazonaws.com/codecademy-blog/assets/puppy-main_zps26d178c5.jpg"; //TODO:  Call to database!

  // Let the user select their reminder rate.
  // Fetch previous state.
  $scope.preferences.reminderRate = Infinity; //TODO:  Call to database!
  // Build a table of the reminder rates allowed.
  $scope.preferences.REMINDER_RATE_VALS = {};
  $scope.preferences.REMINDER_RATE_VALS["Twice A Day"] =     12 * 60 * 60 * 1000;
  $scope.preferences.REMINDER_RATE_VALS["Once A Day"]  =     24 * 60 * 60 * 1000;
  $scope.preferences.REMINDER_RATE_VALS["Once A Week"] = 7 * 24 * 60 * 60 * 1000;
  $scope.preferences.REMINDER_RATE_VALS["Never"]       = Infinity;
  // Build the list that will be displayed.
  $scope.preferences.selectedReminderString = "Time is an illusion.";
  $scope.preferences.unselectedReminderStrings = [];
  for(var x in $scope.preferences.REMINDER_RATE_VALS){
    if($scope.preferences.reminderRate === $scope.preferences.REMINDER_RATE_VALS[x]) {
      $scope.preferences.selectedReminderString = x;
    }
    $scope.preferences.unselectedReminderStrings.push(x);
  }

  // Build functions.
  $scope.preferences.apply = function() {
    console.log('TODO:  Put in database userName = ' + $scope.preferences.userName);
    console.log('TODO:  Put in database password = ' + $scope.preferences.password);
    console.log('TODO:  Put in database contact = ' + $scope.preferences.helpContact);
    console.log('TODO:  Put in database splashScreen = ' + $scope.preferences.splashScreen);
    console.log('TODO:  Put in database reminder rate = ' + $scope.preferences.REMINDER_RATE_VALS[$scope.preferences.selectedReminderString]);
  }
  $scope.preferences.deleteAll = function() {
    if(confirm('Are you sure?  If you delete your mood logs, they are gone.  This action cannot be undone!')) {
              console.log('TODO:  Delete all mood logs in the database!');
    }
  }
});

app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

app.controller('GetHelpCtrl', function($scope, GetHelp, $ionicPopup, sqlService, $ionicLoading) {
  $scope.help = "no help yet yo";
  $scope.retrieveGoodStrategies = function () {
    $ionicLoading.show({});
    console.log('called good');
    $scope.specificStrats = null;
    $scope.goodStrats = []
    sqlService.executeQuery('SELECT * FROM feedback').then(function(result){
			for (var i = 0; i < result.rows.length; i++) {
				console.log("Query result", result.rows.item(i));
				if (result.rows.item(i).response === 1) {
					$scope.goodStrats.push(result.rows.item(i));
				}
        $ionicLoading.hide();
			}
    console.log($scope.goodStrats);
    }),
    (err) => console.log("Query error", err)
  };
  $scope.retrieveSpecificStrategies = function () {
    console.log('called specific');
    $scope.goodStrats = null;
    $scope.specificStrats = GetHelp.specificStrategies();
    console.log(JSON.stringify($scope.specificStrats));
  }
  $scope.rate = function (strategy) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Does this stragegy work for you?',
     template: 'Your feedback helps us help you!',
     cancelText: 'No',
     OkText: 'Yes'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('They like the strategy');
       sqlService.executeQuery('UPDATE feedback SET response = 1 WHERE name = ?', [strategy.name]).then(
         (result) => console.log("Query result", result.rows.item(0)),
         (err) => console.log("Query error", err)
       );
     } else {
       console.log('They dont like the strategy');
       sqlService.executeQuery('UPDATE feedback SET response = 0 WHERE name = ?', [strategy.name]).then(
         (result) => console.log("Query result", result.rows.item(0)),
         (err) => console.log("Query error", err)
       );
     }
   });
 };
});

app.controller('LineCtrl', function($scope) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Angry', 'Happy'];
  $scope.data = [
    [0, 5, 7, 9, 6, 7, 8],
    [0, 3, 3, 5, 4, 5, 5]
  ];
});

app.controller('TrackProgressCtrl', function($scope) {
  $scope.moods = ['Happiness',
                  'Disgust',
                  'Fear',
                  'Saddness',
                  'Angry',
                  'Suprise'];
});

app.controller('ProgressDetailCtrl', function($scope, $stateParams, $ionicPlatform, sqlService) {
  $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  $scope.series = ['Angry', 'Happy'];
  $scope.data = [
    [0, 5, 7, 9, 6, 7, 8],
    [0, 3, 3, 5, 4, 5, 5]
  ];

  $scope.mood = $stateParams.mood.toLowerCase();

  const showMood = (name) => {
    $ionicPlatform.ready(function(){
        sqlService.init().then((res) => {
          sqlService.executeQuery(`SELECT * FROM mood_logs WHERE name=${name}`).then(
            (result) => {
              console.log("Query result", result.rows.item(0))
            },
            (err) => console.log("Query error", err)
          );
        });
    });
  };
  showMood($scope.mood);
});
