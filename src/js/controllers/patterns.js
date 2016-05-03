/* jshint esversion:6 */
app.controller('PatternsCtrl', ($scope, ViewPatterns) => {
  ViewPatterns.all()
  .then((patterns) => {
    patterns.forEach((pattern) => pattern.strength = Math.round(pattern.strength * 100) / 100);
    return patterns;
  })
  .then((patterns) => $scope.patterns = patterns);
});
