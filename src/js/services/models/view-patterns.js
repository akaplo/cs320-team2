/* jshint esversion:6 */
app.service('ViewPatterns', function(sqlService, PatternThetas) {

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
    return sqlService.executeQuery('SELECT * FROM patterns', true)
    .then((arr) => arr.sort((a, b) => a.strength < b.strength));
  }

  function swap(key, mood, theta) {
    var origin;
    var word;
    return PatternThetas.get_view_patterns_size().then((size) => {
      if(key / size < 1) origin = 'trigger';
      else if(key / size < 2) origin = 'belief';
      else if(key / size < 3) origin = 'behavior';
      key = key % size + 1;
      return sqlService.executeQuery(`SELECT word FROM pattern_features WHERE id = ${key}`, true);
    }).then((obj) => word = obj[0].word).catch((e) => console.log('pattern theta word', e)).then(() => {
      sqlService.executeQuery(`INSERT OR REPLACE INTO patterns(mood, strength, word, origin) `+
      `VALUES("${mood}", ${theta}, "${word}", "${origin}")`, true);
    }).catch((e) => console.log('swap', e));
  }

  return {
    all: all,
    swap: swap
  };
});
