app.controller('PreferencesCtrl', function($scope, sqlService, $ionicPlatform) {
  // Set values to that of last session.
  $scope.preferences = {};
  var database_query = 'SELECT * FROM preferences_table';
  console.log(`Execute: ${database_query}`); // TODO:  Remove after debug.
  sqlService.executeQuery(database_query).then(function(result){
    // TODO:  I don't think we reach here.
    console.log('Setting stuff to initial values!');
    old = result.rows[0].cells;
    $scope.preferences.userName     = old[0];
    $scope.preferences.password     = old[1];
    $scope.preferences.helpContact  = old[2];
    $scope.preferences.splashScreen = old[3];
    $scope.preferences.reminderRate = old[4];
  });

  // Let the user select their reminder rate.
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
    var database_query = 'DELETE * FROM preferences_table';
    console.log(`Execute: ${database_query}`); // TODO:  Remove after debug.
    sqlService.executeQuery(database_query);

    database_query = `INSERT INTO preferences_table (name, password, contact, backgroundURL, reminderRate) VALUES ('${$scope.preferences.userName}', '${$scope.preferences.password}' ,'${$scope.preferences.helpContact}', '${$scope.preferences.splashScreen}', ${$scope.preferences.REMINDER_RATE_VALS[$scope.preferences.selectedReminderString]})`;
    console.log(`Execute: ${database_query}`); // TODO:  Remove after debug.
    sqlService.executeQuery(database_query);
  }
  $scope.preferences.deleteAll = function() {
    if(confirm('Are you sure?  If you delete your mood logs, they are gone.  This action cannot be undone!')) {
      // TODO:  Make sure this happens!
      database_query = 'DELETE * FROM mood_logs';
      console.log(`Execute: ${database_query}`); // TODO:  Remove after debug.
      sqlService.executeQuery(database_query);
    }
  }
});

