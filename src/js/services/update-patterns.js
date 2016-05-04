/* jshint esversion:6 */
app.service('UpdatePatterns', function(PatternThetas, ViewPatterns) {
  // Change me! eventually...
  const learningRate = 1;

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
      PatternThetas.get_view_patterns_key_by_word(word))).then((mapped) => {
        return Promise.all([mapped, PatternThetas.get_view_patterns_size()]);
      }).then((spoils) => {
        var vector = Array.apply(null, Array(spoils[1])).map(Number.prototype.valueOf, 0);
        for(var i = 0; i < spoils[0].length; i++) vector[spoils[0][i] - 1] = 1;
        return vector;
      });
  }

  function sigmoid(x) {
    return 1.0 / (1.0 + Math.exp(-x));
  }

  function predict(x, theta) {
    return sigmoid(numeric.dot(x, theta));
  }

  function gradientDescent(mood, x, y, alpha) {
    return PatternThetas.get_mood_thetas(mood).then((thetas) => {
      var promises = [];
      thetas.forEach((theta, i) => {
        var difference = (predict(x, thetas) - y) * x[i];
        if(difference !== 0) {
          promises.push(PatternThetas.set_theta(i, mood, theta - difference));
          promises.push(ViewPatterns.swap(i, mood, theta - difference));
        }
      });
      return Promise.all(promises);
    });
  }

  function even(arr) {
    'use strict';
    arr.sort((a, b) => a.length > b.length);
    for(let i = arr.length - 2; i >= 0; i--){
      while(arr[i].length < arr[i + 1].length) arr[i].push(0);
    }
    return arr;
  }

  function masterVector(moodLog) {
    return featureVector(stopFilter(rawText(moodLog.trigger).split(" "))).then((trigger) =>
      featureVector(stopFilter(rawText(moodLog.belief).split(" "))).then((belief) =>
      featureVector(stopFilter(rawText(moodLog.behavior).split(" "))).then((behavior) =>
        even([trigger, belief, behavior]).reduce((a, b) => a.concat(b))
      ))).catch((e) => console.log('feat', e));
  }

  return {
    update: (moodLog) => {
      return masterVector(moodLog).then((x) =>
        gradientDescent(rawText(moodLog.mood), x, moodLog.intensity / 10, learningRate));
    }
  };
});
