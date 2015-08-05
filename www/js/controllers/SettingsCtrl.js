angular.module('starter.controllers.SettingsCtrl', ['starter.factories.LevelFactory'])

    .controller('SettingsCtrl', function ($scope, $LevelFactory, $translate, $ionicPopup, $window, $filter, $http) {
        var isConnected=false;
        $http.get("http://blackboxgame.ddns.net:8888/get_username", {params : {id :$window.localStorage["id"]}})
            .success(function(data){
                        window.localStorage["name"] = data;
                        isConnected=true;
                    })
            .error(function(data){
                        isConnected=false;
                    });
        $scope.reset = function () {
            $LevelFactory.clear(24);
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
                id : $window.localStorage["id"],
                username : name
            }})
            .success(function(data){
                console.log(data);
            })
            $window.localStorage["name"] = name;
        }
        var translateText = $filter('translate');

        $scope.showPopup = function (title) {
            if (isConnected) {
                $scope.data = {};
                var canceled = true;
                var myPopup = $ionicPopup.show({
                    template: '<input type="text" ng-model="data.ans" placeholder = "' + $window.localStorage["name"] + '" autofocus>',
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
                                } else {
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
                    } else {
                        $scope.setName(res);
                    }
                });
                if (window.cordova && cordova.plugins && cordova.plugins.Keyboard)
                    cordova.plugins.Keyboard.show();
            } else {
                $ionicPopup.alert({
                    title: translateText('No_connection'),
                    template: translateText('No_connection_text')
                });
            }
        };

    });