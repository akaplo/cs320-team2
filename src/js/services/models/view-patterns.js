/* jshint esversion:6 */
app.service('ViewPatterns', function() {

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

  // Dummy calls
  var database = {};

  database.get_pattern_cache = () => new Promise((resolve, reject) => resolve(patterns));

  return {
    all: function() {
      return database.get_pattern_cache();
    }
  };
});