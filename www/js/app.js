// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.log_mood', {
    url: '/log_mood',
    views: {
      'tab-log_mood': {
        templateUrl: 'templates/tab-log_mood.html',
        controller: 'Log_moodCtrl'
      }
    }
  })

  .state('tab.find_patterns', {
    url: '/find_patterns',
    views: {
      'tab-find_patterns': {
        templateUrl: 'templates/tab-find_patterns.html',
        controller: 'Find_patternsCtrl'
      }
    }
  })

    .state('tab.track_progress', {
    url: '/track_progress',
    views: {
      'tab-track_progress': {
        templateUrl: 'templates/tab-track_progress.html',
        controller: 'Track_progressCtrl'
      }
    }
  })

  .state('tab.get_help', {
    url: '/get_help',
    views: {
      'tab-get_help': {
        templateUrl: 'templates/tab-get_help.html',
        controller: 'Get_helpCtrl'
      }
    }
  })

  .state('tab.preferences', {
    url: '/preferences',
    views: {
      'tab-preferences': {
        templateUrl: 'templates/tab-preferences.html',
        controller: 'PreferencesCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
