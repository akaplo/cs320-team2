/* jshint esversion:6 */
app.controller('PatternsCtrl', ($scope, ViewPatterns) =>
  ViewPatterns.all().then((patterns) => $scope.patterns = console.log(patterns)));
