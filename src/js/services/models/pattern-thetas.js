/* jshint esversion:6 */
app.service('PatternThetas', function(sqlService) {

  function ThetaRow(key, word, happy_trigger_theta, sad_trigger_theta, happy_belief_theta, sad_belief_theta, happy_behavior_theta, sad_behavior_theta) {
    this.key = key;
    this.word = word;
    this.happy_trigger_theta = happy_trigger_theta;
    this.sad_trigger_theta = sad_trigger_theta;
    this.happy_belief_theta = happy_trigger_theta;
    this.sad_belief_theta = sad_trigger_theta;
    this.happy_behavior_theta = happy_trigger_theta;
    this.sad_behavior_theta = sad_trigger_theta;
  }

  var theta_table = [];

  var database = {};
  database.get_view_patterns_key_by_word = (word) => {
    'use strict';
    var result = theta_table.filter((row) => row.word === word)[0];
    if(result) return new Promise((resolve, reject) => resolve(result.key));
    else {
      theta_table.push(new ThetaRow(theta_table.length, word, 0, 0, 0, 0, 0, 0));
      return new Promise((resolve, reject) => resolve(theta_table.length - 1));
    }
  };

  database.get_view_patterns_size = () => {
    return new Promise((resolve, reject) => resolve(theta_table.length));
  };

  database.set_theta = (key, mood, theta) => {
    return new Promise((resolve, reject) => {
      if(key / theta_table.length < 1) {
        if(mood === 'happy') theta_table[key].happy_trigger_theta = theta;
        if(mood === 'sad') theta_table[key].sad_trigger_theta = theta;
      } else if(key / theta_table.length < 2) {
        if(mood === 'happy') theta_table[key % theta_table.length].happy_belief_theta = theta;
        if(mood === 'sad') theta_table[key % theta_table.length].sad_belief_theta = theta;
      } else if(key / theta_table.length < 3) {
        if(mood === 'happy') theta_table[key % theta_table.length].happy_behavior_theta = theta;
        if(mood === 'sad') theta_table[key % theta_table.length].sad_behavior_theta = theta;
      }
      resolve(theta);
    });
  };

  database.get_mood_thetas = (mood) => {
    if(mood === 'happy') return new Promise((resolve, reject) =>
      resolve(theta_table.map((row) => row.happy_trigger_theta).concat(
        theta_table.map((row) => row.happy_belief_theta)).concat(
        theta_table.map((row) => row.happy_behavior_theta)))
    );
    else if(mood === 'sad') return new Promise((resolve, reject) =>
      resolve(theta_table.map((row) => row.sad_trigger_theta).concat(
        theta_table.map((row) => row.sad_belief_theta)).concat(
        theta_table.map((row) => row.sad_behavior_theta)))
    );
  };

  function getPatterns(word) {
    return sqlService.executeQuery(
      `INSERT OR IGNORE INTO pattern_features(id, word) VALUES((SELECT max(id) from pattern_features) + 1, ${word}) ` +
      `SELECT * from pattern_features ` +
      `WHERE word = ${word}`, true);
  }

  function getSize() {
    return sqlService.executeQuery('SELECT max(id) FROM pattern_features', true);
  }

  function setTheta(key, mood, theta) {
    return sqlService.executeQuery('SELECT max(id) FROM pattern_features', true).then((size) => {
      var origin;
      if(key / size < 1) origin = 'trigger';
      if(key / size < 2) origin = 'belief';
      if(key / size < 3) origin = 'behavior';
      key = key % size;
      return sqlService.executeQuery(
        `UPDATE pattern_features ` +
        `SET ${mood}_${origin}_theta ` +
        `WHERE id = ${key}`, true);
    });
  }

  function moodThetas(mood) {
    return Promise.all([
      sqlService.executeQuery(`SELECT ${mood}_trigger_theta FROM pattern_features`, true).then((arr) => arr.map((obj) => obj[`${mood}_trigger_theta`])),
      sqlService.executeQuery(`SELECT ${mood}_belief_theta FROM pattern_features`, true).then((arr) => arr.map((obj) => obj[`${mood}_belief_theta`])),
      sqlService.executeQuery(`SELECT ${mood}_behavior_theta FROM pattern_features`, true).then((arr) => arr.map((obj) => obj[`${mood}_behavior_theta`]))]).then((arr) => arr.reduce((a, b) => a.concat(b)));
  }

  return {
    get_view_patterns_key_by_word: getPatterns,
    get_view_patterns_size: getSize,
    set_theta: setTheta,
    get_mood_thetas: moodThetas,
  };
});
