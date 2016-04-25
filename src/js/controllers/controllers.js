angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('LogMoodCtrl', function($scope){
  $scope.logmood = {
  $scope.moods = [
    {id:'1', name:'Anger'},
    {id:'2', name:'Disgust'},
    {id:'3', name:'Fear'},
    {id:'4', name:'Happiness'},
    {id:'5', name:'Sadness'},
    {id:'6', name:'Surprise'}
  ];


  $scope.moodIntensity = [
      {id:'intensity1', name:'1 - Bad'};
      {id:'intensity2', name:'2 - Not OK'};
      {id:'intensity3', name:'3 - Neutral'};
      {id:'intensity4', name:'4 - Good'};
      {id:'intensity5', name:'5 - Excellent'};
  ];
};

  $scope.belief = '';
  $scope.behavior = '';
  $scope.trigger = '';
  $scope.date = new Date();

  $scope.inputBelief = function(){
    $scope.push($scope.belief);
  };

  $scope.inputBehavior = function(){
    $scope.push($scope.behavior);
  };

  $scope.inputTrigger = function(){
    $scope.push($scope.trigger);
  };

  $scope.submitForm = function(){
    ???
  };

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
