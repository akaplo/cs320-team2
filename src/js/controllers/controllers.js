app.controller('DashCtrl', function($scope, sqlService, $ionicPlatform) {
  $scope.$on('$ionicView.enter', function() {
    refreshName();
  })
  function refreshName () {
    $ionicPlatform.ready(function() {
        // run a view query
        sqlService.viewTable('preferences_table', true).then(
          (result) => {
            let userObj = result[0];
            $scope.name = userObj.name;
            $scope.splashScreen = userObj.backgroundURL;

          },
          (err) => console.log("View error", err)
        );
    });
  }
  // $scope.splashScreen = "http://abcnews.go.com/images/Lifestyle/GTY_yawning_dog_dm_130807.jpg";
});


app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

app.controller('GetHelpCtrl', function($scope, GetHelp, $ionicPopup, sqlService, $ionicLoading) {
  $scope.help = "no help yet yo";
  $scope.retrieveGoodStrategies = function () {
    $ionicLoading.show({});
    console.log('called good');
    $scope.specificStrats = null;
    $scope.goodStrats = []
    sqlService.executeQuery('SELECT * FROM feedback').then(function(result){
			for (var i = 0; i < result.rows.length; i++) {
				console.log("Query result", result.rows.item(i));
				if (result.rows.item(i).response === 1) {
					$scope.goodStrats.push(result.rows.item(i));
				}
        $ionicLoading.hide();
			}
    console.log($scope.goodStrats);
    }),
    (err) => console.log("Query error", err)
  };
  $scope.retrieveSpecificStrategies = function () {
    console.log('called specific');
    $scope.goodStrats = null;
    $scope.specificStrats = GetHelp.specificStrategies();
    console.log(JSON.stringify($scope.specificStrats));
  }
  $scope.rate = function (strategy) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Does this stragegy work for you?',
     template: 'Your feedback helps us help you!',
     cancelText: 'No',
     OkText: 'Yes'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('They like the strategy');
       sqlService.executeQuery(`UPDATE feedback SET response = 1 WHERE name = '${strategy.name}'`).then(
         (result) => console.log("Query result", result.rows.item(0)),
         (err) => console.log("Query error", err)
       );
     } else {
       console.log('They dont like the strategy');
       sqlService.executeQuery(`UPDATE feedback SET response = 0 WHERE name = '${strategy.name}'`).then(
         (result) => console.log("Query result", result.rows.item(0)),
         (err) => console.log("Query error", err)
       );
     }
   });
 };
});

app.controller('TrackProgressCtrl', function($scope) {
  $scope.moods = ['happiness',
                  'disgust',
                  'fear',
                  'saddness',
                  'angry',
                  'suprise'];
});

app.controller('ProgressDetailCtrl', function($scope, $stateParams, $ionicPlatform, sqlService) {
  $scope.mood = $stateParams.mood.toLowerCase();

  const showMood = (name) => {
    $ionicPlatform.ready(function(){
          sqlService.executeQuery(`SELECT * FROM mood_logs WHERE mood='${name}'`, true).then(
            (result) => {
              console.log("Query result", result)
              let data = new Array([]);
              let labels = [];

              result.forEach((mood_log, i) => {
                data[0].push(mood_log.intensity);
                labels.push(i + 1);
              });

              $scope.data = data;
              $scope.labels = labels;
              $scope.series = [name];
            },
            (err) => console.log("Query error", err)
          );
    });
  };
  showMood($scope.mood);
});
