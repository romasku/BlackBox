angular.module('starter.controllers.LevelListCtrl', ['starter.factories.LevelFactory'])

    .controller('LevelListCtrl', function ($scope, $LevelFactory, $Keyboard) {
        $scope.levelCount = 24;
        $scope.levelsInLine = 3;
        $scope.levelsOnScreen = 12;
        $LevelFactory.init($scope.levelCount);
        $scope.levels = $LevelFactory.levels;
    });