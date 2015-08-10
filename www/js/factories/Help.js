angular.module('starter.factories.Help', [])
    .factory('$Help', ['$window', '$compile', '$timeout', '$ionicPopup','$filter', '$LevelFactory',
        function ($window, $compile, $timeout, $ionicPopup, $filter, $LevelFactory) {
            var factory = {};

            factory.points;

            factory.template = '<p>{{\'Help_text\' | translate}}</p>' 
                    + '<div class="button-bar">'
                    + '<button class="button button-positive button-outline" ng-click="getSmallHint();">{{\'Get_small_hint\' | translate}}</button>'
                    + '<button class="button button-positive button-outline" ng-click="getBigHint();">{{\'Get_big_hint\' | translate}}</button>'
                    + '</div>'
                    + '<button class="button button-positive button-full" ng-click="getSolution();">{{\'Get_answer\' | translate}}</button>'
                    + '<p class="text-center">{{\'Points\'|translate}}: {{data.points+data.extra}}</p>'
                    + '{{\'Not_enough\' | translate}}<br><br>'
                    + '<div class="button-bar">'
                    + '<button class="button button-positive button-outline" ng-click="addExtra();">{{\'Buy\' | translate}}</button>'
                    + '<button class="button button-positive button-outline">{{\'Ad\' | translate}}</button>'
                    + '</div>';

            factory.clear = function () {
                $window.localStorage["points"] = JSON.stringify(0);
            };

            factory.initPoints = function () {
                //$window.localStorage.clear();
                var points = JSON.parse($window.localStorage["points"] || 0);
                if (!points) $window.localStorage["points"] = JSON.stringify(0);
                factory.points = points;
            };

            factory.addPoints = function (val) {
                var points = JSON.parse($window.localStorage["points"] || 0);
                $window.localStorage["points"] = JSON.stringify(points+val);
            };

            factory.show = function (level, levelsData, language) {
                var translate = $filter('translate');
                factory.initPoints();
                //init popup scope
                $scope = factory.scope;
                $scope.data = {};
                $scope.data.points = parseInt($window.localStorage["points"]);
                $scope.data.extra = 0;

                $scope.addExtra = function () {
                    $scope.data.extra += 100;
                }

                $scope.getSmallHint = function () {
                    $scope.level = level;
                   if ($scope.data.points + $scope.data.extra < 50) {
                        $ionicPopup.alert({
                            title: translate('Oops'),
                            template: translate('No_points') + '<br><br>'
                            + '<b>' + translate('Points') + '</b>: ' + ($scope.data.points + $scope.data.extra) + '<br>'
                            + '<b>' + translate('Price') + '</b>: 50'
                        });
                    } else {
                        $scope.data.points -= 50;
                       var hint = '';
                       if (levelsData[level-1].smallHintType == 'template') hint = translate(levelsData[level-1].smallHint);
                       else {
                           if (language == 'en') hint = levelsData[level-1].enSmallHint;
                           else if (language == 'ru') hint = levelsData[level-1].ruSmallHint;
                           else hint = levelsData[level-1].uaSmallHint;
                       }
                       $ionicPopup.alert({
                           title: translate('Get_small_hint') + ' ' + translate('Hint'),
                           template: '<p class="text-center">' + hint + '</p>'
                        });
                    }
                }

                $scope.getBigHint = function () {
                    $scope.level = level;
                    if ($scope.data.points + $scope.data.extra < 75) {
                        $ionicPopup.alert({
                            title: translate('Oops'),
                            template: translate('No_points') + '<br><br>'
                            + '<b>' + translate('Points') + '</b>: ' + ($scope.data.points + $scope.data.extra) + '<br>'
                            + '<b>' + translate('Price') + '</b>: 75'
                        });
                    } else {
                        $scope.data.points -= 75;
                        var hint = '';
                        if (levelsData[level-1].bigHintType == 'template') hint = translate(levelsData[level-1].bigHint);
                        else {
                            if (language == 'en') hint = levelsData[level-1].enBigHint;
                            else if (language == 'ru') hint = levelsData[level-1].ruBigHint;
                            else hint = levelsData[level-1].uaBigHint;
                        }
                        $ionicPopup.alert({
                            title: translate('Get_big_hint') + ' ' + translate('Hint'),
                            template: '<p class="text-center">' + hint + '</p>'
                        });
                    }
                }

                $scope.getSolution = function () {
                    $scope.level = level;
                    if ($scope.data.points + $scope.data.extra < 75) {
                        $ionicPopup.alert({
                            title: translate('Oops'),
                            template: translate('No_points') + '<br><br>'
                            + '<b>' + translate('Points') + '</b>: ' + ($scope.data.points + $scope.data.extra) + '<br>'
                            + '<b>' + translate('Price') + '</b>: 100'
                        });
                    } else {
                        $scope.data.points -= 100;
                        var hint = '';
                        if (language == 'en') hint = levelsData[level-1].enSolution;
                        else if (language == 'ru') hint = levelsData[level-1].ruSolution;
                        else hint = levelsData[level-1].uaSolution;
                        $ionicPopup.alert({
                            title: translate('Solution'),
                            template: '<p class="text-center">' + hint + '</p>'
                        });
                    }
                }

                //save and hide Keyboard;
                var keyboardSave = $scope.Keyboard.save();
                $scope.Keyboard.hide();

                var isBought = false;
                var myPopup = $ionicPopup.show({
                    template: factory.template,
                    title: translate('Help'),
                    scope: $scope,
                    buttons: [
                        {
                            type: 'button_ok',
                            text: 'OK'
                        }
                    ]
                }).then(function (res) {
                        var points = JSON.parse($window.localStorage["points"] || 0);
                        $window.localStorage["points"] = JSON.stringify(eval(points)+eval($scope.data.extra));
                        $scope.Keyboard.show($scope);
                        $scope.Keyboard.load(keyboardSave);
                });
            };

            return factory;
        }]);