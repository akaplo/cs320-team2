app.controller('LogMoodCtrl', function($scope, sqlService, $ionicPlatform, $ionicPopup){
  $scope.formData = {};

  $scope.logMood = function(){
    let data = $scope.formData;
    $ionicPlatform.ready(function() {
      let qry = `INSERT INTO mood_logs (mood, intensity, trigger, behavior, belief) VALUES ('${data.mood.name}', ${parseInt(data.intensity, 10)}, '${data.trigger}', '${data.behavior}', '${data.belief}')`;

      sqlService.executeQuery(qry).then(
        (result) => {
          console.log("insert result", result, result.rows.item(0))
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