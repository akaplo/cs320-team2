angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('TrackProgressCtrl', function($scope, Moods) {
  $scope.progress = Moods.all();
})
.controller('ProgressDetailCtrl', function($scope, $stateParams, Moods) {
  $scope.mood = Moods.get($stateParams.moodType);  
})
;
