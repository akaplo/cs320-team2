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
});


app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

app.controller('GetHelpCtrl', function($scope) {
  $scope.help = "no help yet yo";

});
