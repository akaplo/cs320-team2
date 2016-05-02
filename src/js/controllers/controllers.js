app.controller('DashCtrl', function($scope, sqlService, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    console.log("ionicPlatform ready");
    // initialize database
    sqlService.init().then((res) => {
      // run a view query
      sqlService.viewTable('feedback').then(
        (result) => console.log("View result", result.rows.item(1)),
        (err) => console.log("View error", err)
      );

      sqlService.executeQuery('SELECT * FROM mood_logs').then(
        (result) => console.log("Query result", result.rows.item(0)),
        (err) => console.log("Query error", err)
      );

    }, (err) => console.log(err));
  });

  $scope.splashScreen = "https://s3.amazonaws.com/codecademy-blog/assets/puppy-main_zps26d178c5.jpg";
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
       sqlService.executeQuery(`UPDATE feedback SET response = 1 WHERE name = ${strategy.name}`).then(
         (result) => console.log("Query result", result.rows.item(0)),
         (err) => console.log("Query error", err)
       );
     } else {
       console.log('They dont like the strategy');
       sqlService.executeQuery(`UPDATE feedback SET response = 0 WHERE name = ${strategy.name}`).then(
         (result) => console.log("Query result", result.rows.item(0)),
         (err) => console.log("Query error", err)
       );
     }
   });
 };
});

app.controller('LineCtrl', function($scope) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Angry', 'Happy'];
  $scope.data = [
    [0, 5, 7, 9, 6, 7, 8],
    [0, 3, 3, 5, 4, 5, 5]
  ];
});
