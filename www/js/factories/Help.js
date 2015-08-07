angular.module('starter.factories.Help', [])
    .factory('$Help', ['$window', '$compile', '$timeout', '$ionicPopup','$filter',
        function ($window, $compile, $timeout, $ionicPopup, $filter) {
            var factory = {};

            factory.points;
            factory.template = '<p>{{\'Help_text\' | translate}}</p>' 
                    + '<div class="button-bar">'
                    + '<button class="button button-positive button-outline">{{\'Get_small_hint\' | translate}}</button>' 
                    + '<button class="button button-positive button-outline">{{\'Get_big_hint\' | translate}}</button>'
                    + '</div>'
                    + '<button class="button button-positive button-full">{{\'Get_answer\' | translate}}</button>'
                    + '<p class="text-center">{{\'Points\'|translate}}: {{data.points+data.extra}}</p>'
                    + '{{\'Not_enough\' | translate}}<br><br>'
                    + '<div class="button-bar">'
                    + '<button class="button button-positive button-outline" ng-click="addExtra();">{{\'Buy\' | translate}}</button>'
                    + '<button class="button button-positive button-outline">{{\'Ad\' | translate}}</button>'
                    + '</div>';

            factory.clear = function () {
                $window.localStorage["points"] = JSON.stringify(0);
            }

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

            factory.show = function () {
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