angular.module('starter.controllers.PlayCtrl', []).controller('PlayCtrl', function ($scope, $http, $ionicPopup, $state) {
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
        var canceled = true;
        var myPopup = $ionicPopup.show({
            template: '<p style="text-align: center;">'+task+'</p><input type="number" ng-model="data.ans" autofocus>',
            title: title,
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: '<b>Answer</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.ans) {
                            e.preventDefault();
                        }
                        else
                        {
                            canceled = false;
                            return $scope.data.ans;
                        }
                    }
                }
            ]
        }).then(function(res) {
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

    $scope.answer = function(num, ptask, pans) {
        if (ptask != '')
        {
            var correctAns = eval($scope.fn + 'calc(' + ptask + ')');
            if (pans != correctAns) {
                if (window.cordova && cordova.plugins && cordova.plugins.Keyboard)
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
            var ans = $scope.showPopup('Question ' + (num + 1), '' + task, num);
        }
        else {
            if (window.cordova && cordova.plugins && cordova.plugins.Keyboard)
                cordova.plugins.Keyboard.close();
            setTimeout(function () {
                $ionicPopup.alert({
                    title: 'Congratulations!',
                    template: '<p style="text-align: center;">You successfully completed this level!</p>'
                }).then(function () {
                    window.history.back();
                });
            }, 100);
        }
    }
});