angular.module('starter.factories.Help', [])
    .factory('$Help', ['$window', '$compile', '$timeout', '$ionicPopup','$filter',
        function ($window, $compile, $timeout, $ionicPopup, $filter) {
            //Must be set: [setResult]
            var factory = {};

            factory.points;

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

                $timeout(function() {document.getElementById("calc-input").onfocus = function() {
                    document.getElementById("calc-input").blur();
                }}, 400); //Cancel standart input


                //init poput scope
                $scope = factory.scope;
                $scope.data = {};
                $scope.data.extra = 0;

                $scope.addExtra = function () {
                    $scope.data.extra += 100;
                }

                var isBought = false;
                var myPopup = $ionicPopup.show({
                    template: '<p>' + translate('Help_text') + '</p>' + '<div class="button-bar"><button class="button button-positive button-outline">' + translate('Get_small_hint') + '</button>' +
                    '<button class="button button-positive button-outline">' + translate('Get_big_hint') + '</button>' +
                    '</div> <button class="button button-positive button-full">' + translate('Get_answer') + '</button> <p class="text-center">' + translate('Points') + ': ' + factory.points
                    + '</p>' + translate('Not_enough') + '<br><br><div class="button-bar"><button class="button button-positive button-outline" ng-click="addExtra();">' + translate('Buy') + '</button>' +
                    '<button class="button button-positive button-outline">' + translate('Ad') + '</button> </div>',
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
                });
            };

            return factory;
        }]);