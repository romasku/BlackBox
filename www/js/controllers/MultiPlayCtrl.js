angular.module('starter.controllers.MultiPlayCtrl', ['starter.factories.LevelFactory'])

    .controller('MultiPlayCtrl', function ($scope, $http, $ionicPopup, $state, $filter, $LevelFactory, $window, $timeout) {
        $scope.level = $state.params.level;
        var log =$state.params.log;
        var pr = 0;
        $scope.log = "";
        $scope.timeWon = -1;
        $scope.opState = "Oponent_guessing";
        $scope.timeBeg = (new Date()).getTime();
        $scope.changeOpState = function() {
            if ($scope.opState == "Oponent_guessing") {
                $scope.opState = "Oponent_answering";
                angular.element(document.getElementById("oponent_state")).addClass("warning");
            }
            else { 
                $scope.opState = "Oponent_guessing";
                angular.element(document.getElementById("oponent_state")).removeClass("warning");
            }
        }
        for (var i = 0; i<log.length; i++)
        {
            if (log.charAt(i)=='a')
            {
                var time = parseInt(log.substr(pr,i-pr));
                $timeout($scope.changeOpState,time);
                pr = i + 1; 
            }
        }
        $scope.setOpWon = function(){
            $scope.opState ="Oponent_won";
        }
        $scope.submitReplay = function() {
            $http.get("http://blackboxgame.ddns.net:8888/upload_replay", {params:{
                players_id : $window.localStorage["id"],
                time_won : $scope.time_won,
                log : $scope.log,
                game_id : $scope.level 
            }})
            .success(function(data){
                console.log("Submited!\n" + data);
            });
        }
        $timeout($scope.setOpWon,$state.params.time_won);
     
        $scope.input = document.getElementById("play-input");

        $scope.showKeyboard = function () {
            if (window.cordova && cordova.plugins && cordova.plugins.Focus)
                cordova.plugins.Focus.focus($scope.input);
        };

        $timeout($scope.showKeyboard, 400);


        $scope.attempts = [];
        var url = '/';
        if (ionic.Platform.isAndroid()) url = '/android_asset/www/';
        $http.get(url + 'js/levels/' + $scope.level + '.js').then(
            function (resp) {
                var fn = resp.data;
                while (1) {
                    var fn2 = fn.replace('RAND', '' + Math.floor(Math.random() * 1e9));
                    if (fn2 == fn) break;
                    fn = fn2;
                }
                $scope.fn = fn;
            }
        );
        $http.get(url + 'js/levels/levelsData.json').success(
            function (data) {
                var levelsData = data;
                $scope.levelsData = levelsData;
            }
        );

        $scope.calc = function (val) {
            return eval($scope.fn + 'calc(' + val + ')');
        };

        $scope.countStars = function (userData) {
            var good = $scope.levelsData[$scope.level - 1].good;
            var exellent = $scope.levelsData[$scope.level - 1].exellent;
            if (userData.moves <= exellent) return 3;
            if (userData.moves <= good) return 2;
            return 1;
        };

        $scope.countPenalty = function (num) {
            var complexity = $scope.levelsData[$scope.level - 1].complexity;
            return (11 - complexity) * (4 - num);
        };

        $scope.countPoints = function (userData) {
            var ans = 0;
            if (userData.stars == 3) ans = 100 - userData.penalty;
            else if (userData.stars == 2) ans = 75 - userData.penalty;
            else ans = 50 - userData.penalty;
            if (ans < 0) ans = 0;
            return ans;
        };

        var translate = $filter('translate');

        $scope.model = {};
        $scope.model.input = "";

        $scope.showError = function (msg) {
            $ionicPopup.alert({
                title: translate('Incorrect_number'),
                template: translate(msg)
            }).then(function () {
                setTimeout($scope.showKeyboard, 400);
            });
        };

        $scope.add = function () {
            var val = parseInt($scope.model.input);
            $scope.model.input = '';
            if (val >= 1e9) {
                $scope.showError('Please_lower_number');
            }
            else if (val < 0) {
                $scope.showError('Please_greater_number');
            }
            else if (isNaN(val)) {
                $scope.showError('Please_valid_number');
            }
            else {
                $scope.attempts.unshift({question: val, answer: $scope.calc(val)});
            }
            $scope.showKeyboard();
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
                    $scope.newState();
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
        $scope.newState = function() {
            var time = (new Date()).getTime();
            time = time - $scope.timeBeg;
            console.log(time);
            $scope.log += time;
            $scope.log += 'a';
            console.log($scope.log);
        }
        $scope.answer = function (num, ptask, pans) {
            if (ptask == '') $scope.newState();
            if (ptask != '') {
                var correctAns = $scope.calc(ptask);
                if (pans != correctAns) {
                    $scope.newState();
                    if (window.cordova && cordova.plugins && cordova.plugins.Keyboard)
                        cordova.plugins.Keyboard.close();
                    setTimeout(function () {
                        $ionicPopup.alert({
                            title: translate('Wrong_answer'),
                            template: translate('Correct_answer_was') + ' ' + correctAns
                        }).then(function () {
                            setTimeout($scope.showKeyboard, 400);
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
                var time = (new Date()).getTime();
                $scope.time_won = (-$scope.timeBeg + time);
                $scope.submitReplay();
                if (window.cordova && cordova.plugins && cordova.plugins.Keyboard)
                    cordova.plugins.Keyboard.close();
                var msg = "Lose";
                if ($scope.time_won < $state.params.time_won) msg = "Won";
                setTimeout(function () {
                    $ionicPopup.alert({
                        title: translate('Congratulations') + '!',
                        template: '<p style="text-align: center;">' + translate(msg) + '!</p>'
                    }).then(function () {
                        window.history.back();
                    });
                }, 100);
            }
        }
    });