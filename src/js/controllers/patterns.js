/* jshint esversion:6 */
app.controller('PatternsCtrl', ($scope, ViewPatterns) => {
  ViewPatterns.all()
  .then((patterns) => {
    if(patterns.length !== 0) {
      var min = patterns[0].strength;
      var max = patterns[0].strength;
      patterns.forEach((pattern) => {
        if(min > pattern.strength) min = pattern.strength;
        if(max < pattern.strength) max = pattern.strength;
      });
      patterns.forEach((pattern) => pattern.strength = Math.round((pattern.strength - min) * 100 / ((max - min === 0)?1:(max - min))));
    }
    return patterns;
  })
  .then((patterns) => $scope.patterns = patterns);
});
