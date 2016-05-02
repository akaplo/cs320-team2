/* jshint esversion:6 */
app.service('ViewPatterns', function(sqlService) {

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

  function all() {
    return sqlService.executeQuery('SELECT * FROM patterns');
  }

  function swap(key, mood, theta) {
    var origin;
    var word;
    return sqlService.executeQuery(`SELECT max(id) FROM pattern_features`).then((size) => {
      if(key / size < 1) origin = 'trigger';
      if(key / size < 2) origin = 'belief';
      if(key / size < 3) origin = 'behavior';
      key = key % size;
      return sqlService.executeQuery(`SELECT word FROM pattern_features WHERE id = ${key}`);
    }).then((obj) => word = obj.word).then(() => {
      sqlService.executeQuery(`SELECT min(strength) FROM patterns`).then((min) => {
        if(min.strength < pattern.strength)
          return sqlService.executeQuery(
            `UPDATE patterns` +
            `SET mood = ${mood}, strength = ${theta}, word = ${word}, origin = ${origin}`).then(() => pattern.strength);
        else
          return min.strength;
      });
    });
  }

  return {
    all: all,
    swap: swap
  };
});
