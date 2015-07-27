angular.module('starter.controllers.SettingsCtrl', ['starter.factories.LevelFactory'])

    .controller('SettingsCtrl', function ($scope, $LevelFactory, $translate) {
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
    });