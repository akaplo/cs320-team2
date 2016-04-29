app.controller('TrackProgressCtrl', function($scope, $state) {
  console.log('aaa');
  $scope.showMood = function(mood){
    console.log('show');
    $state.go('tab.progress-detail', {mood: mood});
  };
});

app.controller('ProgressDetailCtrl', function($scope, $stateParams) {
  $scope.mood = $stateParams.mood;
  console.log('detail');
});
