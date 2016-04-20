angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('LogMoodCtrl', function($scope){
  $scope.logmood = {};
  $scope.moods = [
    {'mood':'Anger'},
    {'mood':'Disgust'},
    {'mood':'Fear'},
    {'mood':'Happiness'},
    {'mood':'Sadness'},
    {'mood':'Surprise'}
  ];

  $scope.moodIntensity = [
      {'intensity':'1 - ???'};
      {'intensity':'2 - ???'};
      {'intensity':'3 - ???'};
      {'intensity':'4 - ???'};
      {'intensity':'5 - ???'};
  ];

  $scope.belief = '';
  $scope.behavior = '';
  $scope.trigger = '';

  $scope.inputBelief = function(){
    $scope.push($scope.belief);
  }

  $scope.inputBehavior = function(){
    $scope.push($scope.behavior);
  }

  $scope.inputTrigger = function(){
    $scope.push($scope.trigger);
  }

  $scope.submitForm = function(){
    ???
  }

})

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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
