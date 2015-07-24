angular.module('starter.controllers.LevelListCtrl', ['starter.factories.LevelFactory'])

    .controller('LevelListCtrl', function ($scope, $LevelFactory) {
        $scope.levelCount = 6;
        $scope.levelsInLine = 3;
        $scope.levelsOnScreen = 3;
        $LevelFactory.init($scope.levelCount);
        $scope.levels = $LevelFactory.levels;
    });