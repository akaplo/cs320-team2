var module = angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('PreferencesCtrl', function($scope) {
  $scope.userName = "TODO:  CALL TO DATABASE!!!!";
  $scope.password = "TODO:  CALL TO DATABASE!!!!";
  $scope.helpContact = "TODO:  CALL TO DATABASE!!!!";
  $scope.splashScreen = "https://s3.amazonaws.com/codecademy-blog/assets/puppy-main_zps26d178c5.jpg"; //TODO:  Call to database!

  // Let the user select their reminder rate.
  // Fetch previous state.
  $scope.reminderRate = Infinity; //TODO:  Call to database!
  // Build a table of the reminder rates allowed.
  $scope.REMINDER_RATE_VALS = {};
  $scope.REMINDER_RATE_VALS["Twice A Day"] =     12 * 60 * 60 * 1000;
  $scope.REMINDER_RATE_VALS["Once A Day"]  =     24 * 60 * 60 * 1000;
  $scope.REMINDER_RATE_VALS["Once A Week"] = 7 * 24 * 60 * 60 * 1000;
  $scope.REMINDER_RATE_VALS["Never"]       = Infinity;
  // Build the list that will be displayed.
  $scope.selectedReminderString = "Time is an illusion.";
  $scope.unselectedReminderStrings = [];
  for(var x in $scope.REMINDER_RATE_VALS){
    if($scope.reminderRate === $scope.REMINDER_RATE_VALS[x]) {
      $scope.selectedReminderString = x;
    }
    else {
      $scope.unselectedReminderStrings.push(x);
    }
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
