angular.module('starter.controllers.SettingsCtrl', ['starter.factories.LevelFactory'])

    .controller('SettingsCtrl', function ($scope, $LevelFactory, $translate, $ionicPopup, $filter, $http) {
        $scope.reset = function () {
            $LevelFactory.clear(18);
            window.history.back();
        }

        $scope.languages = [{abb: 'en', name: 'English'}, {abb: 'ru', name: 'Русский'}, {
            abb: 'ua',
            name: 'Українська'
        }];

        $scope.setLanguage = function (language) {
            $translate.use(language);
        }

        $scope.isCurrent = function (language) {
            return $translate.use() == language;
        }
        $scope.setName = function(name) {
            $http.get("http://blackboxgame.ddns.net:8888/set_name", {params : {
                id : $LevelFactory.get("id",null),
                username : name
            }})
            .success(function(data){
                console.log(data);
            })
            $LevelFactory.set("name",name);
        }
        var translateText = $filter('translate');

        $scope.showPopup = function (title) {
            $scope.data = {};
            var canceled = true;
            console.log(title);
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.ans" placeholder = "' + $LevelFactory.get("name",null) + '" autofocus>',
                title: translateText(title),
                scope: $scope,
                buttons: [
                    {text: translateText('Cancel')},
                    {
                        text: '<b>' + translateText('OK') + '</b>',
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
                    if (window.cordova && cordova.plugins && cordova.plugins.Keyboard)
                        cordova.plugins.Keyboard.close();
                }
                else {
                    $scope.setName(res);
                }
            });
            if (window.cordova && cordova.plugins && cordova.plugins.Keyboard)
                cordova.plugins.Keyboard.show();
        };

    });