angular.module('starter.controllers.PlayCtrl', [])
    .factory('$localstorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])

    .controller('PlayCtrl', function ($scope, $http, $ionicPopup, $state, $filter, $localstorage) {
        $scope.level = $state.params.level;
        //$window.localStorage.clear();
        if (isNaN($localstorage.getObject($scope.level).level)) {
            $localstorage.setObject($scope.level, {
                level: $scope.level,
                isCompleted: false,
                moves: 0,
                stars: 0
            });
        }
        $scope.stats = $localstorage.getObject($scope.level);

        $scope.attempts = [];
        var url = '/';
        if (ionic.Platform.isAndroid()) url = '/android_asset/www/';
        $http.get(url + 'js/levels/' + $scope.level + '.js').then(
            function (resp) {
                var fn = resp.data;
                while(1) {
                    var fn2 = fn.replace('RAND', '' + Math.floor(Math.random() * 1e9));
                    if (fn2 == fn) break;
                    fn = fn2;
                }
                $scope.fn = fn;
            }
        );

        $scope.calc = function (val) {
            return eval($scope.fn + 'calc(' + val + ')');
        };

        var translate = $filter('translate');

        $scope.model = {};
        $scope.model.input = "";

        $scope.add = function () {
            var val = parseInt($scope.model.input);
            $scope.model.input = '';
            if (val >= 1e9) {
                $ionicPopup.alert({
                    title: translate('Incorrect_number'),
                    template: translate('Please_lower_number')
                });
            }
            else if (val < 0) {
                $ionicPopup.alert({
                    title: translate('Incorrect_number'),
                    template: translate('Please_greater_number')
                });
            }
            else if (isNaN(val)) {
                $ionicPopup.alert({
                    title: translate('Incorrect_number'),
                    template: translate('Please_valid_number')
                });
            }
            else {
                $scope.attempts.unshift({question: val, answer: $scope.calc(val)});
                if (!$scope.stats.isCompleted) {
                    $scope.stats.moves++;
                    $localstorage.setObject($scope.level,$scope.stats);
                }
            }
        };

        $scope.rand = function () {
            return Math.floor(Math.random() * 1e3);
        };

        $scope.showPopup = function (title, task, num) {
            $scope.data = {};
            var canceled = true;
            var myPopup = $ionicPopup.show({
                template: '<p style="text-align: center;">' + task + '</p><input type="number" ng-model="data.ans" autofocus>',
                title: title,
                scope: $scope,
                buttons: [
                    {text: translate('Cancel')},
                    {
                        text: '<b>' + translate('Answer') + '</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.data.ans) {
                                e.preventDefault();
                            }
                            else {
                                canceled = false;
                                return $scope.data.ans;
                            }
                        }
                    }
                ]
            }).then(function (res) {
                if (canceled) {
                    if (window.cordova && cordova.plugins && cordova.plugins.Keyboard)
                        cordova.plugins.Keyboard.close();
                }
                else {
                    $scope.answer(num + 1, task, $scope.data.ans);
                }
            });
            if (window.cordova && cordova.plugins && cordova.plugins.Keyboard)
                cordova.plugins.Keyboard.show();
            //return '';
        };

        $scope.answer = function (num, ptask, pans) {
            if (ptask != '') {
                var correctAns = $scope.calc(ptask);
                if (pans != correctAns) {
                    if (window.cordova && cordova.plugins && cordova.plugins.Keyboard)
                        cordova.plugins.Keyboard.close();
                    setTimeout(function () {
                        $ionicPopup.alert({
                            title: translate('Wrong_answer'),
                            template: translate('Correct_answer_was') + ' ' + correctAns
                        });
                    }, 100);
                    return;
                }
            }
            if (num < 3) {
                var task = $scope.rand();
                var ans = $scope.showPopup(translate('Question') + ' ' + (num + 1), '' + task, num);
            }
            else {
                if (window.cordova && cordova.plugins && cordova.plugins.Keyboard)
                    cordova.plugins.Keyboard.close();
                $scope.stats.isCompleted = true;
                $localstorage.setObject($scope.level,$scope.stats);
                setTimeout(function () {
                    $ionicPopup.alert({
                        title: translate('Congratulations') + '!',
                        template: '<p style="text-align: center;">' + translate('Level_complete') + '!</p>'
                    }).then(function () {
                        window.history.back();
                    });
                }, 100);
            }
        }
    });