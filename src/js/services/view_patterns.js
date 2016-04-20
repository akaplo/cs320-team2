app.service('View Patterns', function() {

  // Constructor for pattern objects, might delete
  function Pattern(keyword, origin, mood, intensity) {
    this.keyword = keyword;
    this.origin = origin;
    this.mood = mood;
    this.intensity = intensity;
  }

  // Dummy pattern data
  var patterns =
  [
    new Pattern('exam', 'belief', 'stressed', 0.9),
    new Pattern('chocolate', 'behavior', 'happy', 0.7)
  ];

  return {
    all: function() {
      return patterns;
    }
  };
});
