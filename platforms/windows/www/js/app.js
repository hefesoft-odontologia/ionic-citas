﻿// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    /*/
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    */
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($compileProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
  
   $httpProvider.defaults.withCredentials = true;
   $httpProvider.interceptors.push('authInterceptorService');

   $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
   // // Use $compileProvider.urlSanitizationWhitelist(...) for Angular 1.2
   $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|x-wmapp0):|data:image\//);



  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.citas', {
    url: "/citas",
    views: {
      'menuContent': {
        templateUrl: "templates/views/prestador.html",
        controller : "prestadorCtrl"
      }
    }
  })

  .state('app.sigin', {
    url: "/sigin",
    views: {
        'menuContent': {
            templateUrl: "templates/views/Sign/SignIn.html",
        }       
        }
    })


.state('app.signup', {
    url: "/signup",
    views: {
        'menuContent': {
            templateUrl: "templates/views/Sign/SignUp.html",            
        }       
        }
    })

.state('app.prestadorFecha', {
    url: "/prestadorFecha/:prestadorId",
    views: {
        'menuContent': {
            templateUrl: "templates/views/prestadorFecha.html",
            controller : 'prestadorFechasCtrl',
        }       
        }
    })
  
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
