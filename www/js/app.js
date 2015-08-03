// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var starter = angular.module('starter', ['ionic', 'starter.controllers', 'starter.translations']);

starter.run(function ($ionicPlatform, $translate) {
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
        if (typeof navigator.globalization !== "undefined") {
            navigator.globalization.getPreferredLanguage(function (language) {
                $translate.use((language.value).split("-")[0]).then();
            }, null);
        }
    });
});

starter.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i++)
            input.push(i);
        return input;
    };
});

starter.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('header', {
            url: '/header',
            abstract: true,
            templateUrl: 'templates/header.html'
        })
        .state('header.play', {
            url: '/play/:level',
            views: {
                'main': {
                    templateUrl: 'templates/play.html',
                    controller: 'PlayCtrl'
                }
            }
        })
        .state('header.multiplayer', {
            url: '/multiplayer?level&log&time_won',
            views: {
                'main': {
                    templateUrl: 'templates/multiplayer.html',
                    controller: 'MultiPlayCtrl'
                }
            }
        })
        .state('header.level-list', {
            url: '/level-list',
            views: {
                'main': {
                    templateUrl: 'templates/level-list.html',
                    controller: 'LevelListCtrl'
                }
            }
        })
          .state('header.opponent-search', {
            url : '/opponent-search',
            views : {
                'main': {
                    templateUrl: 'templates/opponent-search.html',
                    controller: "SearchCtrl"
                }
            }
        })
        .state('header.chapter-list', {
            url : '/chapter-list',
            views : {
                'main': {
                    templateUrl: 'templates/chapter-list.html'
                }
            }
        })
        .state('header.settings', {
            url: '/settings',
            views: {
                'main': {
                    templateUrl: 'templates/settings.html',
                    controller: 'SettingsCtrl'
                }
            }
        })
        .state('header.main-menu', {
            url: '/main-menu',
            views: {
                'main': {
                    templateUrl: 'templates/main-menu.html',
                    controller: 'MainCtrl'
                }
            }
        });
    $urlRouterProvider.otherwise('/header/main-menu');
});