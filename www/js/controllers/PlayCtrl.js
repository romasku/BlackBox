angular.module('starter.controllers.PlayCtrl', ['starter.factories.LevelFactory', 'starter.factories.Keyboard', 'starter.factories.Calculator'])

    .controller('PlayCtrl', function ($scope, $http, $ionicPopup, $state, $filter, $LevelFactory, $Keyboard, $timeout, $translate, $Calculator) {
        var translate = $filter('translate');

        $scope.level = $state.params.level;
        $scope.language = $translate.use();
        $scope.phrases = [];
        $scope.phrases.push(translate('Go'));
        $scope.numPhrase = 0;
        $scope.model = {};
        $scope.model.input = "";
        $scope.input = document.getElementById("play-input");
        $scope.input.onfocus = function () {
            $scope.input.blur();
        };
        
        $scope.Keyboard = $Keyboard;

        $scope.showKeyboard = function () {
            console.log("showKeyboard");
            $Keyboard.setValue = function (value){
                console.log(value);
                $scope.model.input = parseInt(value);
            }
            $Keyboard.getValue = function () {
                return $scope.model.input.toString();
            }
            $Keyboard.button = angular.element(document.getElementById("button_ask"));
            $Keyboard.show($scope);
        };

        setTimeout($scope.showKeyboard, 400);

        $scope.stats = $LevelFactory.getLevel($scope.level);
        if (!$scope.stats) {
            $scope.stats = {
                isCompleted: false,
                moves: 0,
                penalty: 0,
                stars: 0,
                points: 0
            }
        }

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
        $http.get(url + 'js/data/levelsData.json').success(
            function (data) {
                var levelsData = data;
                $scope.levelsData = levelsData;
            }
        );
        $http.get(url + 'js/data/phrases.json').success(
            function (data) {
                var allPhrases = data;
                $scope.allPhrases = allPhrases;
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

        $scope.getNumPhrase = function () {
            return Math.floor(Math.random() * 20);
        }



        $scope.showError = function (msg) {
            $Keyboard.hide();
            $ionicPopup.alert({
                title: translate('Incorrect_number'),
                template: translate(msg)
            }).then(function () {
                setTimeout($scope.showKeyboard, 400);
            });
        };

        $scope.add = function () {
            if ($scope.language == 'en') $scope.phrases = $scope.allPhrases.en;
            else if ($scope.language == 'ru') $scope.phrases = $scope.allPhrases.ru;
            else $scope.phrases = $scope.allPhrases.ua;
            $scope.prevNum = $scope.numPhrase;
            $scope.numPhrase = $scope.getNumPhrase();
            if ($scope.numPhrase == $scope.prevNum) $scope.numPhrase = ($scope.numPhrase+1)%20;
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
                if (!$scope.stats.isCompleted) {
                    $scope.stats.moves++;
                    $LevelFactory.setLevel($scope.stats);
                }
            }
        };

        $scope.rand = function () {
            return Math.floor(Math.random() * 1e3);
        };

        //init calc
        $Calculator.scope = $scope;
        $Calculator.Keyboard = $Keyboard;
        $Calculator.setResult = function(val){
            $scope.data.ans = val;
        }
        $scope.showCalc = $Calculator.show;

        $scope.showPopup = function (title, task, num) {
            $scope.data = {};
            $scope.task = task;
            var canceled = true;
            var myPopup = $ionicPopup.show({
                template: '<p style="text-align: center;">' + task + '</p><div class="button-bar"><input id="popup-input" type="number" style="width: 90%; font-size: 1rem;" ng-model="data.ans">' +
                '<button class="button button-positive button-outline" ng-click="showCalc(task);"> <i class="icon ion-calculator"></i></button></div>',
                title: title,
                scope: $scope,
                buttons: [
                    {text: translate('Cancel')},
                    {
                        text: '<b>' + translate('Answer') + '</b>',
                        type: 'button-positive button_ok',
                        onTap: function (e) {
                            if (!$scope.data.ans && $scope.data.ans !== 0) {
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
                    $Keyboard.hide();
                    $scope.showKeyboard();
                }
                else {
                    $scope.answer(num + 1, task, $scope.data.ans);
                }
            });
            //return '';
        };

        $scope.answer = function (num, ptask, pans) {
            $Keyboard.setValue = function(value){
                $scope.data.ans = parseInt(value);
            }
            $Keyboard.getValue = function(){
                if (!$scope.data.ans) $scope.data.ans="";
                return $scope.data.ans.toString();
            }
            $timeout(function() {$Keyboard.button=angular.element(document.getElementsByClassName("button_ok")[0]);}, 400);
            $timeout(function() {document.getElementById("popup-input").onfocus = function() {
                document.getElementById("popup-input").blur();
            }}, 400);
            if (ptask != '') {
                var correctAns = $scope.calc(ptask);
                if (pans != correctAns) {
                    $Keyboard.hide();
                    if (!$scope.stats.isCompleted) {
                        $scope.stats.penalty += $scope.countPenalty(num);
                        $LevelFactory.setLevel($scope.stats);
                    }
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
                $Keyboard.hide();
                $scope.stats.isCompleted = true;
                $scope.stats.stars = $scope.countStars($scope.stats);
                $scope.stats.points = $scope.countPoints($scope.stats);
                console.log($scope.stats);
                $LevelFactory.setLevel($scope.stats);
                setTimeout(function () {
                    $ionicPopup.alert({
                        title: translate('Congratulations') + '!',
                        template: '<p style="text-align: center;">' + translate('Level_complete') + '!</p><p style="text-align: center;">' + translate('Stars') + ': ' + $scope.stats.stars + '<br>' + translate('Points') + ': ' + $scope.stats.points + '</p>'
                    }).then(function () {
                        window.history.back();
                    });
                }, 100);
            }
        }
    });