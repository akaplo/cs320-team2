/* jshint esversion:6 */
angular.module('starter.services', [])

.service('Update Patterns', function() {

  // Change me! eventually...
  const learningRate = 1;

  const numeric = require('numeric');

  // Dummy Constructor
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

  // Dummy Data
  /*var theta_table = [
    new ThetaRow(0, 'exam', 0.1, 0.9, 0.1, 0.9, 0.1, 0.9),
    new ThetaRow(1, 'icecream', 0.9, 0.1, 0.9, 0.1, 0.9, 0.1)
  ];*/

  var theta_table = [];

  // Dummy calls
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

  database.insert_view_pattern_word = (word) => {
    theta_table.push(new ThetaRow(theta_table.length, word, 0, 0, 0, 0, 0, 0));
    return new Promise((resolve, reject) => resolve(theta_table.length - 1));
  };

  database.get_view_patterns_size = () => {
    return new Promise((resolve, reject) => resolve(theta_table.length));
  };

  database.set_theta = (key, origin, mood, theta) => {
    return new Promise((resolve, reject) => {
      if(origin === 'trigger') {
        if(mood === 'happy') theta_table[key].happy_trigger_theta = theta;
        if(mood === 'sad') theta_table[key].sad_trigger_theta = theta;
      } else if(origin === 'belief') {
        if(mood === 'happy') theta_table[key].happy_belief_theta = theta;
        if(mood === 'sad') theta_table[key].sad_belief_theta = theta;
      } else if(origin === 'behavior') {
        if(mood === 'happy') theta_table[key].happy_behavior_theta = theta;
        if(mood === 'sad') theta_table[key].sad_behavior_theta = theta;
      }
      resolve(theta);
    });
  };

  database.get_thetas_by_origin_and_mood = (origin, mood) => {
    return new Promise((resolve, reject) => {
      if(origin === 'trigger') {
        if(mood === 'happy') resolve(theta_table.map((row) => row.happy_trigger_theta));
        else if(mood === 'sad') resolve(theta_table.map((row) => row.sad_trigger_theta));
      } else if(origin === 'belief') {
        if(mood === 'happy') resolve(theta_table.map((row) => row.happy_belief_theta));
        else if(mood === 'sad') resolve(theta_table.map((row) => row.sad_belief_theta));
      } else if(origin === 'behavior') {
        if(mood === 'happy') resolve(theta_table.map((row) => row.happy_behavior_theta));
        else if(mood === 'sad') resolve(theta_table.map((row) => row.sad_behavior_theta));
      }
    });
  };

  function stopFilter(arr) {
    var stopwords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours	ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"];
    var myStopwords = ["will"];
    stopwords = stopwords.concat(myStopwords);
    var filtered = [];
    arr.forEach((word) => {if(stopwords.indexOf(word) === -1) filtered.push(word);});
    return filtered;
  }

  function rawText(str) {
    return str.slice(0).replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
  }

  function featureVector(arr) {
    return Promise.all(arr.map((word) =>
      database.get_view_patterns_key_by_word(word))).then((mapped) => {
        return [mapped, database.get_view_patterns_size()];
      }).then((spoils) => {
        return spoils[1].then((size) => {
          var vector = Array.apply(null, Array(size)).map(Number.prototype.valueOf, 0);
          spoils[0].forEach((key) => vector[key] = 1);
          return vector;
        });
      });
  }

  function sigmoid(x) {
    return 1.0 / (1.0 + Math.exp(-x));
  }

  function predict(x, theta) {
    // Make sure to import numeric somehow
    return sigmoid(numeric.dot(x, theta));
  }

  function gradientDescent(origin, mood, x, y, alpha) {
    return database.get_thetas_by_origin_and_mood(origin, mood).then((thetas) => {
      var promises = [];
      thetas.forEach((theta, i) =>
        promises.push(database.set_theta(i, origin, mood, theta - ((predict(x, thetas) - y) * x[i]))));
      return Promise.all(promises);
    });
  }

  return {
    update: (moodLog) => {
      return Promise.all([
      featureVector(stopFilter(rawText(moodLog.belief).split(" "))).then((x) =>
        gradientDescent('belief', moodLog.mood, x, moodLog.intensity / 10, learningRate)),
      featureVector(stopFilter(rawText(moodLog.behavior).split(" "))).then((x) =>
        gradientDescent('behavior', moodLog.mood, x, moodLog.intensity / 10, learningRate)),
      featureVector(stopFilter(rawText(moodLog.trigger).split(" "))).then((x) =>
        gradientDescent('trigger', moodLog.mood, x, moodLog.intensity / 10, learningRate))
      ]);
    }
  };
});