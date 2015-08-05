angular.module('starter.factories.Keyboard', [])
    .factory('$Keyboard', ['$window', '$compile', '$timeout', function ($window, $compile, $timeout) {
        var factory = {};
        factory.template = '<table id="keyboard" class="keyboard positive">'
        +'<tr>'
        +'<td id="button_1" ng-click="Keyboard.click(1);">1</td>'
            +'<td id="button_2" ng-click="Keyboard.click(2);">2</td>'
            +'<td id="button_3" ng-click="Keyboard.click(3);">3</td>'
        +'</tr>'
        +'<tr>'
            +'<td id="button_4" ng-click="Keyboard.click(4);">4</td>'
            +'<td id="button_5" ng-click="Keyboard.click(5);">5</td>'
            +'<td id="button_6" ng-click="Keyboard.click(6);">6</td>'
            +'</tr>'
        +'<tr>'
            +'<td id="button_7" ng-click="Keyboard.click(7);">7</td>'
            +'<td id="button_8" ng-click="Keyboard.click(8);">8</td>'
            +'<td id="button_9" ng-click="Keyboard.click(9);">9</td>'
        +'</tr>'
        +'<tr>'
            +'<td id="button_del" ng-click="Keyboard.click(\'del\');">del</td>'
            +'<td id="button_0" ng-click="Keyboard.click(0);">0</td>'
            +'<td id="button_ok" ng-click="Keyboard.click(\'ok\');">ok</td>'
        +'</tr>'
        +'</table>';
        factory.submit = function(){
            $timeout(function() {
                factory.button.triggerHandler('click');
            }, 0);
        }
        factory.show = function($scope){
            var body = document.getElementsByTagName("body");
            body=body[body.length-1];
            body = angular.element(body);
            body.addClass("keyboard-showing");
            ionView = document.getElementsByTagName("ion-view");
            ionView = ionView[ionView.length-1];
            ionView = angular.element(ionView);
            ionView.append($compile(angular.element(factory.template))($scope));
        }
        factory.hide = function(){
            var body = document.getElementsByTagName("body");
            body = body[0];
            body = angular.element(body);
            body.removeClass("keyboard-showing");
            var keyboard = angular.element(document.getElementById("keyboard"));
            keyboard.remove();
        }
        factory.click = function(char){
            var button = angular.element(document.getElementById("button_" + char));
            button.addClass("button-activated");
            $timeout(function(){
                var button = angular.element(document.getElementById("button_" + char));
                button.removeClass("button-activated");
            },200);
            if (char == "del") {
                var value=factory.getValue();
                value = value.substr(0,value.length-1);
                factory.setValue(value);
            }
            else if (char == 'ok') factory.submit();
            else {
                console.log(factory.getValue());
                if (!factory.getValue()) factory.setValue("");
                var value=factory.getValue();
                if (value=="NaN") value=0;
                console.log(value);
                value += char;
                factory.setValue(value);
            }
        }
        return factory;
    }]);