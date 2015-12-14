angular.module('starter.factories.Help', [])
    .factory('$Help', ['$window', '$compile', '$timeout', '$ionicPopup','$filter', '$LevelFactory',
        function ($window, $compile, $timeout, $ionicPopup, $filter, $LevelFactory) {
            var factory = {};

            factory.points;

            factory.template = '<p>{{\'Help_text\' | translate}}</p>' 
                    + '<div class="button-bar">'
                    + '<button class="button button-positive button-outline" ng-click="getSmallHint();">{{\'Get_small_hint\' | translate}}<i ng-if="levelData.smallHint" class="icon positive ion-checkmark-circled padding-left"></i></button>'
                    + '<button class="button button-positive button-outline" ng-click="getBigHint();">{{\'Get_big_hint\' | translate}}<i ng-if="levelData.bigHint" class="icon positive ion-checkmark-circled padding-left"></i></button>'
                    + '</div>'
                    + '<button class="button button-positive button-full" ng-click="getSolution();">{{\'Get_answer\' | translate}}<i ng-if="levelData.solution" class="icon ion-checkmark-circled padding-left"></i></button>'
                    + '<p class="text-center">{{\'Points\'|translate}}: {{data.points}}</p>'
                    + '{{\'Not_enough\' | translate}}<br><br>'
                    + '<div class="button-bar">'
                    + '<button class="button button-positive button-outline" ng-click="change(100);">{{\'Buy\' | translate}}</button>'
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

            factory.show = function (level, chapter, levelsData, language) {
                var translate = $filter('translate');
                factory.initPoints();
                //init popup scope
                $scope = factory.scope;
                $scope.data = {};
                $scope.data.points = parseInt($window.localStorage["points"]);
                $scope.lvl = levelsData[chapter - 1][level - 1].level;
                $scope.levelData = JSON.parse($window.localStorage[$scope.lvl]);

                $scope.change = function (val) {
                    var points = JSON.parse($window.localStorage["points"] || 0);
                    $window.localStorage["points"] = JSON.stringify(eval(points) + eval(val));
                    $scope.data.points = parseInt($window.localStorage["points"]);
                }

                $scope.getSmallHint = function () {
                    var hint = '';
                    if (levelsData[chapter - 1][level - 1].smallHintType == 'template') hint = translate(levelsData[chapter - 1][level - 1].smallHint);
                    else hint = translate('Small_' + $LevelFactory.levels[level - 1].chapter + '_' + level);
                    if (levelsData[chapter - 1][level - 1].hasConst && levelsData[chapter - 1][level - 1].smallHintType == "template")
                        if (levelsData[chapter - 1][level - 1].smallHint == "Hint_number") hint += levelsData[chapter - 1][level - 1].const;
                    if (levelsData[chapter - 1][level - 1].hasRand && levelsData[chapter - 1][level - 1].smallHintType == "template")
                        if (levelsData[chapter - 1][level - 1].smallHint == "Hint_number") hint += $LevelFactory.levels[level - 1].RAND % levelsData[chapter - 1][level - 1].maxRand + 1;
                    if ($scope.levelData.smallHint) {
                        $ionicPopup.alert({
                            title: translate('Get_small_hint') + ' ' + translate('Hint'),
                            template: '<p class="text-center">' + hint + '</p>'
                        });
                    }
                    else if ($scope.data.points < 50) {
                        $ionicPopup.alert({
                            title: translate('Oops'),
                            template: translate('No_points') + '<br><br>'
                            + '<b>' + translate('Points') + '</b>: ' + $scope.data.points + '<br>'
                            + '<b>' + translate('Price') + '</b>: 50'
                        });
                    } else {
                        $scope.change(-50);
                        $scope.levelData.smallHint = true;
                        $window.localStorage[$scope.lvl] = JSON.stringify($scope.levelData);
                        $ionicPopup.alert({
                            title: translate('Get_small_hint') + ' ' + translate('Hint'),
                            template: '<p class="text-center">' + hint + '</p>'
                        });
                    }
                }

                $scope.getBigHint = function () {
                    var hint = '';
                    if (levelsData[chapter - 1][level - 1].bigHintType == 'template') hint = translate(levelsData[chapter - 1][level - 1].bigHint);
                    else hint = translate('Big_' + $LevelFactory.levels[level - 1].chapter + '_' + level);
                    if (levelsData[chapter - 1][level - 1].hasConst && levelsData[chapter - 1][level - 1].bigHintType == "template")
                        if (levelsData[chapter - 1][level - 1].bigHint == "Hint_number") hint += levelsData[chapter - 1][level - 1].const;
                    if (levelsData[chapter - 1][level - 1].hasRand && levelsData[chapter - 1][level - 1].bigHintType == "template")
                        if (levelsData[chapter - 1][level - 1].bigHint == "Hint_number") hint += $LevelFactory.levels[level - 1].RAND % levelsData[chapter - 1][level - 1].maxRand + 1;
                    if ($scope.levelData.bigHint) {
                        $ionicPopup.alert({
                            title: translate('Get_big_hint') + ' ' + translate('Hint'),
                            template: '<p class="text-center">' + hint + '</p>'
                        });
                    }
                    else if ($scope.data.points < 75) {
                        $ionicPopup.alert({
                            title: translate('Oops'),
                            template: translate('No_points') + '<br><br>'
                            + '<b>' + translate('Points') + '</b>: ' + $scope.data.points + '<br>'
                            + '<b>' + translate('Price') + '</b>: 75'
                        });
                    } else {
                        $scope.change(-75);
                        $scope.levelData.bigHint = true;
                        $window.localStorage[$scope.lvl] = JSON.stringify($scope.levelData);
                        $ionicPopup.alert({
                            title: translate('Get_big_hint') + ' ' + translate('Hint'),
                            template: '<p class="text-center">' + hint + '</p>'
                        });
                    }
                }

                $scope.getSolution = function () {
                    var hint = '';
                    hint = translate('Sol_' + $LevelFactory.levels[level - 1].chapter + '_' + level);
                    hint = hint.replace('RAND', '' + ($LevelFactory.levels[level - 1].RAND % levelsData[chapter - 1][level - 1].maxRand + 1));
                    if ($scope.levelData.solution) {
                        $ionicPopup.alert({
                            title: translate('Solution'),
                            template: '<p class="text-center">' + hint + '</p>'
                        });
                    }
                    else if ($scope.data.points < 100) {
                        $ionicPopup.alert({
                            title: translate('Oops'),
                            template: translate('No_points') + '<br><br>'
                            + '<b>' + translate('Points') + '</b>: ' + $scope.data.points + '<br>'
                            + '<b>' + translate('Price') + '</b>: 100'
                        });
                    } else {
                        $scope.change(-100);
                        $scope.levelData.solution = true;
                        $window.localStorage[$scope.lvl] = JSON.stringify($scope.levelData);
                        $ionicPopup.alert({
                            title: translate('Solution'),
                            template: '<p class="text-center">' + hint + '</p>'
                        });
                    }
                }

                //save and hide Keyboard
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
                        $scope.Keyboard.show($scope);
                        $scope.Keyboard.load(keyboardSave);
                });
            };

            return factory;
        }]);