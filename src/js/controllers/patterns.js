/* jshint esversion:6 */
app.controller('PatternsCtrl', ($scope, ViewPatterns) =>
  ViewPatterns.all().then((patterns) => $scope.patterns = [patterns.rows.item(0)]));
