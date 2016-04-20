angular.module('starter.services', [])
.service('TrackProgress', function() {
  var moods = [{
    id: 0,
    moodType: 'Happy'
    date: '2016-01-01',
  }];
  return {
    all: function() {
      return moods;
    },
    getChart: function(moodType) {
      for (var i = 0; i < chats.length; i++) {
        if (moods[i].moodType === moodType) {
          return moods[i];
        }
      }
      return null;
    }
  };
})
.services('ProgressDetail', function(mood){
  
})
;
