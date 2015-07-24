angular.module('starter.controllers.SettingsCtrl', ['starter.factories.LevelFactory'])

    .controller('SettingsCtrl', function ($scope, $LevelFactory) {

        $scope.reset = function() {
            $LevelFactory.clear(24);
            window.history.back();
        }
    });