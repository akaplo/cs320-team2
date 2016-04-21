app.controller('TrackProgressCtrl', function($scope, $state) {
  console.log('aaa');
  $scope.showMood = function(moodType){

    $state.go('tab.progress-detail', {mood: moodType});
  };
})

.controller('ProgressDetailCtrl', function($scope, $stateParams, Moods) {

});
