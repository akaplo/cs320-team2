angular.module('starter.services', [])
.service('TrackProgress', function() {
  var moods = [{
    id: 0,
    moodType: 'Happy',
    intensity: 5,
    date: '2016-01-01',
  },
  {
    id: 0,
    moodType: 'Angry',
    intensity: 3,
    date: '2016-02-02',
  }];
  return {
    all: function() {
      return moods;
    },
    get: function(type) {
      for (var i = 0; i < chats.length; i++) {
        if (moods[i].moodType === type) {
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
