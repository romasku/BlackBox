angular.module('starter.factories.Calculator', [])
    .factory('$Calculator', ['$window', '$compile', '$timeout', '$ionicPopup','$filter',
        function ($window, $compile, $timeout, $ionicPopup, $filter) {
        //Must be set: Keyboard, [setResult]
        var factory = {};

        factory.template = '<input id="calc-input" type="tel" ng-model="data.calc">'
        +  ' <br> <div class="button-bar" ng-repeat="line in [] | range: lines">' 
        +  '<button ng-repeat="sign in signs" class="button button-positive button-outline" '
        +  'ng-click="addSign(sign[line]);"> {{sign[line]}} </button>' 
        + '</div>'
        + '<button id="button_calc" class="button button-positive" '
        + 'style="width: 100%" ng-click="calculate();">=</button>';

        factory.show = function (val) {
             var translate = $filter('translate');

            $timeout(function() {document.getElementById("calc-input").onfocus = function() {
                document.getElementById("calc-input").blur();
            }}, 400); //Cancel standart input

            //init Keyboard
            // factory.Keyboard must be set outside
            var keyboardSave = factory.Keyboard.save();
            factory.Keyboard.getValue = function(){
                return $scope.data.calc;
            }
            factory.Keyboard.setValue = function(value){
                $scope.data.calc=value;
            }
            $timeout(function() { 
                factory.Keyboard.button=angular.element(document.getElementById("button_calc"));
            }, 400);

            //init poput scope
            $scope = factory.scope;
            $scope.data = {};
            $scope.data.calc = val;
            $scope.addSign = function (sign) {
                if (sign == 'C') $scope.data.calc = '';
                else $scope.data.calc += sign;
            }
            $scope.calculate = function () {
                $scope.data.calc = Math.floor(eval($scope.data.calc));
            };
            $scope.lines = 2;
            $scope.signs = [['+','%'],['-','('],['*',')'],['/','C']];

            var myPopup = $ionicPopup.show({
                template: factory.template,
                title: translate('Calculator'),
                scope: $scope,
                buttons: [
                    {
                        type: 'button_ok',
                        text: translate('Back')
                    }
                ]
            }).then(function (res) {
                factory.setResult($scope.data.calc);
                factory.Keyboard.load(keyboardSave);
            });
        };

        return factory;
    }]);