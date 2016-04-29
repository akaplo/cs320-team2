app.controller('PreferencesCtrl', function($scope, sqlService, $ionicPlatform) {
  // Insert safety values.
  $scope.preferences = {};

//  $ionicPlatform.ready(function() {
//    // initialize database 
//    sqlService.init().then((res) => {
//      // run a view query
//      sqlService.viewTable('preferences_table').then(
//        (result) => {
//          old = result.rows[0].cells;
//          $scope.preferences.userName     = old[0];
//          $scope.preferences.password     = old[1];
//          $scope.preferences.helpContact  = old[2];
//          $scope.preferences.splashScreen = old[3];
//          $scope.preferences.reminderRate = old[4];
//        }, 
//        (err) => {
//          $scope.preferences.userName = "";
//          $scope.preferences.password = "";
//          $scope.preferences.helpContact = "";
//          $scope.preferences.splashScreen = "https://s3.amazonaws.com/codecademy-blog/assets/puppy-main_zps26d178c5.jpg";
//          $scope.preferences.reminderRate = Infinity;
//        }
//      );
//    })
//  });


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

