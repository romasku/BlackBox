// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var starter = angular.module('starter', ['ionic']);

starter.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

starter.controller('PlayCtrl', function ($scope, $http, $ionicPopup) {
    $scope.attempts = [];
    var fn;
    var url = '/';
    if (ionic.Platform.isAndroid()) url = '/android_asset/www/';
    $http.get(url + 'js/levels/1.js').then(
        function (resp) {
            fn = resp.data;
        }
    );
    $scope.add = function () {
        var input = document.getElementById('input');
        var val = parseInt(input.value);
        input.value = '';
        if (val >= 1e9) {
            $ionicPopup.alert({
                title: 'Incorrect number',
                template: 'Please, enter a lower number'
            });
        }
        else if (val < 0) {
            $ionicPopup.alert({
                title: 'Incorrect number',
                template: 'Please, enter a greater number'
            });
        }
        else if (isNaN(val)) {
            $ionicPopup.alert({
                title: 'Incorrect number',
                template: 'Please, enter a valid number'
            });
        }
        else {
            $scope.attempts.unshift({question: val, answer: eval(fn + 'calc(' + val + ')')});
        }
    };
});