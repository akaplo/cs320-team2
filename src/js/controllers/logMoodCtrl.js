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
          UpdatePatterns.update(data).catch((e) => console.log('patterns', e));
          queryAlert();
        },
        (err) => console.log("insert error", err)
      );
    });
  }

  $scope.moods = [
    {id:'1', name:'anger'},
    {id:'2', name:'disgust'},
    {id:'3', name:'fear'},
    {id:'4', name:'happiness'},
    {id:'5', name:'sadness'},
    {id:'6', name:'surprise'}
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
