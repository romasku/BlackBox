angular.module('starter.controllers.MultiPlayCtrl', ['starter.factories.LevelFactory', 'starter.factories.Calculator', 'starter.factories.Keyboard'])

    .controller('MultiPlayCtrl', function ($scope, $rootScope, $http, $ionicPopup, $state, $filter, $LevelFactory, $window, $timeout, $Calculator, $Keyboard) {
    
        levelInfoArr = $rootScope.levelnum.split("-");
        $scope.level = levelInfoArr[1];
        $scope.chapter = levelInfoArr[0];

        var log = $rootScope.log;
        $scope.askCnt = 0;
        $scope.ansCnt = 0;
        $scope.log = "";
        $scope.timeWon = -1;
        $scope.opState = "Opponent_guessing";
        $scope.timeBeg = (new Date()).getTime();
        $scope.Keyboard = $Keyboard;
        $scope.input = document.getElementById("play-input");
        $scope.input.onfocus = function () {
            $scope.input.blur();
        };

        //init calc
        $Calculator.scope = $scope;
        $Calculator.Keyboard = $Keyboard;
        $Calculator.setResult = function(val){
            $scope.data.ans = val;
        }
        $scope.showCalc = $Calculator.show;

        $scope.changeOpState = function() {
            if ($scope.opState == "Opponent_guessing") {
                $scope.opState = "Opponent_answering";
                angular.element(document.getElementById("opponent_state")).addClass("warning");
            }
            else { 
                $scope.opState = "Opponent_guessing";
                angular.element(document.getElementById("opponent_state")).removeClass("warning");
            }
        }
        $scope.setOpWon = function(){
            $scope.opState ="Opponent_won";
        }

        //parse log
        var logList = log.split("\n");

        for (var i = 0; i < logList.length; i++)
        {
            logEntry = logList[i].split(" ");
            time = parseInt(logEntry[0]);
            if (logEntry[1] === "guesingMode") $timeout($scope.changeOpState, time);
            if (logEntry[1] === "answeringMode") $timeout($scope.changeOpState, time);
            if (logEntry[1] === "won") 
            {
                $timeout($scope.setOpWon, time);
                $scope.timeOpWon = time;
            }
        }

        //init log
        $scope.log = "";
        $scope.timeBeg = (new Date()).getTime();
        $scope.answering = false;
        // log functions
        logGuesingMode = function() {
            var time = (new Date()).getTime();
            time = time - $scope.timeBeg;
            $scope.log += time + " guesingMode\n";
        }
        logAnsweringMode = function() {
            var time = (new Date()).getTime();
            time = time - $scope.timeBeg;
            $scope.log += time + " answeringMode\n";
        }
        logAsk = function(num, ans) {
            var time = (new Date()).getTime();
            time = time - $scope.timeBeg;
            $scope.log += time + " ask " + num + " " + ans + "\n";
        }
        logAns = function(num, pans, cans) {
            var time = (new Date()).getTime();
            time = time - $scope.timeBeg;
            $scope.log += time + " ask " + num + " " + pans + " " + cans + "\n";
        }
        logWon = function() {
            var time = (new Date()).getTime();
            time = time - $scope.timeBeg;
            $scope.log += time + " won\n";
            //It must be last loging command, so send to server it
            $http.get("http://blackboxservermobile.azurewebsites.net/upload_replay", {params:{
                players_id : $window.localStorage["id"],
                log : $scope.log,
                game_id : $rootScope.levelnum,
                is_multiplay : "true",
                rand : $rootScope.rand   
            }});
        }
        // end log functions
     
        $scope.input = document.getElementById("play-input");

        $scope.showKeyboard = function () {
            $Keyboard.setValue = function (value){
                $scope.model.input = parseInt(value);
            }
            $Keyboard.getValue = function () {
                return $scope.model.input.toString();
            }
            $Keyboard.button = angular.element(document.getElementById("button_ask"));
            $Keyboard.show($scope);
        };

        $timeout($scope.showKeyboard, 400);


        $scope.attempts = [];
        var url = "/";
        if (window.cordova) url = cordova.file.applicationDirectory + "/www/";
        $http.get(url + 'js/levels/' + $scope.chapter + '/' + $scope.level + '.js').then(
            function (resp) {
                var fn = resp.data;
                while (1) {
                    var fn2 = fn.replace('RAND', '' + $rootScope.rand);
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

        $scope.calc = function (val) {
            return eval($scope.fn + 'calc(' + val + ')');
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

                //add ask to log (not best way, but saving $scope.calc(val) is ugly)
                logAsk(val, $scope.calc(val));
                $scope.askCnt++;

                $scope.attempts.unshift({question: val, answer: $scope.calc(val)});
            }
            $scope.showKeyboard();
        };

        $scope.rand = function () {
            return Math.floor(Math.random() * 1e3);
        };

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
                    //Log return to guesing
                    logGuesingMode();
                    $scope.answering = false;
                }
                else {
                    $scope.answer(num + 1, task, $scope.data.ans);
                }
            });
            //return '';
        };
        $scope.answer = function (num, ptask, pans) {

            //Log answering mode
            if (!$scope.answering)
            {
                logAnsweringMode();
                $scope.answering = true;
            }

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

                //add ans to log
                logAns(ptask, pans, correctAns);
                $scope.ansCnt++;

                if (pans != correctAns) {
                    setTimeout(function () {
                        $ionicPopup.alert({
                            title: translate('Wrong_answer'),
                            template: translate('Correct_answer_was') + ' ' + correctAns
                        }).then(function () {
                            setTimeout($scope.showKeyboard, 400);
                        });
                    }, 100);

                    //Log return to guesing
                    logGuesingMode();
                    $scope.answering = false;
                    
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
                var msg = "Lose";
                if ($scope.time_won < $scope.timeOpWon) 
                {
                    msg = "Won";
                    //add score to user
                    var wtime = $scope.time_won;
                    score = 60 * ( 1 - (2 * Math.atan(wtime/1000))/Math.PI);
                    score += 10 * ( 1 - (2 * Math.atan($scope.askCnt))/Math.PI);
                    score += 30 * ( 1 - (2 * Math.atan($scope.ansCnt - 3))/Math.PI);
                    score *= Math.pow($scope.timeOpWon / wtime, 1.0/2.0);
                    $http.get("http://blackboxservermobile.azurewebsites.net/add_score", {params:{
                            id : $window.localStorage["id"],
                            score : score  
                    }});
                }
                setTimeout(function () {
                    $ionicPopup.alert({
                        title: translate('Congratulations') + '!',
                        template: '<p style="text-align: center;">' + translate(msg) + '!</p>'
                    }).then(function () {
                        window.history.back();
                    });
                }, 100);

                //log won, even if player losed
                logWon();
            }
        }
    });
