// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var starter = angular.module('starter', ['ionic', 'starter.controllers']);

starter.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window && window.plugins && window.plugins.orientationLock) {
            window.plugins.orientationLock.lock("portrait");
        }
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

starter.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('left-menu', {
            url:'/left-menu',
            abstract: true,
            templateUrl: 'templates/left-menu.html'
        })
        .state('left-menu.play', {
            cache: false,
            url: '/play/:level',
            views: {
                'main' : {
                    templateUrl : 'templates/play.html',
                    controller: 'PlayCtrl'
                }
            }
        })
        .state('left-menu.level-list', {
            url: '/level-list',
            views: {
                'main' : {
                    templateUrl: 'templates/level-list.html',
                    controller: 'LevelListCtrl'
                }
            }
        });
    $urlRouterProvider.otherwise('/left-menu/level-list');
});