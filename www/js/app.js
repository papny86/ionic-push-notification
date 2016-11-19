// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.config'])

.run(function($ionicPlatform, $cordovaPushV5, $cordovaToast, $cordovaDialogs, $rootScope) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  // Push notification
  $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data) {
    if (data.additionalData.foreground === false) {
      // For the case in app
      //$cordovaToast.showLongTop(data.message)
      $cordovaDialogs.alert(data.message, 'Notificación', 'OK')
      .then(function(success) {
          // $location.path('/app/notification');
          // $rootScope.$apply();
        }, function (error) {
          alert(error);
        });
    } else {
      // For the case out app
      //$cordovaToast.showLongCenter(data.message)
      $cordovaDialogs.alert(data.message, 'Notificación', 'OK')
      .then(function(success) {
          // $state.go('app.notification');
        }, function (error) {
          alert(error);
        });
    }

  });

  $rootScope.$on('$cordovaPushV5:errorOccurred', function(event, error) {
    alert(error);
  });

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro.html',
    controller: 'PushCtrl'
  })

  $urlRouterProvider.otherwise('/intro');
})
