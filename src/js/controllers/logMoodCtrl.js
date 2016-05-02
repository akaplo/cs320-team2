app.controller('LogMoodCtrl', function($scope, sqlService, $ionicPlatform, $ionicPopup, UpdatePatterns){
  $scope.formData = {};

  $scope.logMood = function(){
    let data = $scope.formData;
    data.mood = data.mood.name;
    data.intensity = parseInt(data.intensity, 10);

    $ionicPlatform.ready(function() {
      let qry = `INSERT INTO mood_logs (mood, intensity, trigger, behavior, belief) VALUES ('${data.mood}', ${data.intensity}, '${data.trigger}', '${data.behavior}', '${data.belief}')`;

      sqlService.executeQuery(qry).then(
        (result) => {
          debugger;
          UpdatePatterns.update(data);
          queryAlert();
        },
        (err) => console.log("insert error", err)
      );
    });
  }
  
  $scope.moods = [
    {id:'1', name:'Anger'},
    {id:'2', name:'Disgust'},
    {id:'3', name:'Fear'},
    {id:'4', name:'Happiness'},
    {id:'5', name:'Sadness'},
    {id:'6', name:'Surprise'}
  ];

  function queryAlert(){
    let myPopup = $ionicPopup.show({
      title: 'Mood Logged',
      scope: $scope,
      buttons: [
        {
          text: '<b>Thanks</b>',
          type: 'button-positive'
        }
      ]
    });

    myPopup.then(function(res) {
      $scope.formData = {};
    });
  }

})