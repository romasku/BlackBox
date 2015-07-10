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

starter.controller('SelectLevelCtrl', function($scope){
    $scope.levelCount = 15;
});

starter.controller('PlayCtrl', function ($scope, $http, $ionicPopup, $state) {
    $scope.attempts = [];
    var url = '/';
    if (ionic.Platform.isAndroid()) url = '/android_asset/www/';
    $scope.level = $state.params.level;
    $http.get(url + 'js/levels/' + $scope.level + '.js').then(
        function (resp) {
            $scope.fn = resp.data;
        }
    );

    $scope.add = function () {
        var input = document.getElementById('play-input');
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
            $scope.attempts.unshift({question: val, answer: eval($scope.fn + 'calc(' + val + ')')});
        }
    };

    $scope.rand = function() {
        return Math.floor(Math.random() * 1e3);
    };

    $scope.showPopup = function(title, task, num) {
        $scope.data = {};
        var canceled = false;
        var myPopup = $ionicPopup.show({
            template: '<p style="text-align: center;">'+task+'</p><input type="number" ng-model="data.ans" autofocus>',
            title: title,
            scope: $scope,
            buttons: [
                {text: 'Cancel',
                onTap: function(e){
                        canceled = true;
                    }
                },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.ans) {
                            e.preventDefault();
                        }
                        else
                        {
                            return $scope.data.ans;
                        }
                    }
                }
            ]
        }).then(function(res) {
            if (canceled) {
                cordova.plugins.Keyboard.close();
            }
            else {
                $scope.answer(num + 1, task, $scope.data.ans);
            }
        });
        cordova.plugins.Keyboard.show();
        //return '';
    };

    $scope.answer = function(num, ptask, pans) {
        if (ptask != '')
        {
            var correctAns = eval($scope.fn + 'calc(' + ptask + ')');
            if (pans != correctAns) {
                cordova.plugins.Keyboard.close();
                setTimeout(function () {
                    $ionicPopup.alert({
                        title: 'Wrong answer',
                        template: 'Correct answer was ' + correctAns
                    });
                }, 100);
                return;
            }
        }
        if (num < 3) {
            var task = $scope.rand();
            var ans = $scope.showPopup('Question 1', '' + task, num);
        }
        else {
            $ionicPopup.alert({
                title: 'Congratulations!',
                template: 'You successfully complete this level'
            }).then(function() {
                window.history.back();
            });
        }
    }
});

starter.controller('LevelListCtrl', function($scope){
    $scope.levelCount = 3;
    $scope.levels = [];
    for (var i = 1; i <= $scope.levelCount; i++)
        $scope.levels.push(i);
});