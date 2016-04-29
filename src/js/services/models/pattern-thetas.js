/* jshint esversion:6 */
app.service('PatternThetas', function() {

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

  return {
    get_view_patterns_key_by_word: database.get_view_patterns_key_by_word,
    get_view_patterns_size: database.get_view_patterns_size,
    set_theta: database.set_theta,
    get_mood_thetas: database.get_mood_thetas,
  };
});
