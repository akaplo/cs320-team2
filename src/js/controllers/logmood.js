
angular.module('starter.controllers', [])
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

  $scope.belief = element(by.model('inbelief'));
  $scope.behavior = element(by.model('inbehavior'));
  $scope.trigger = element(by.model('intrigger'));
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

  $scope.submit = function(){
    ???
  };

})
