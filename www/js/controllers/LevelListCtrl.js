angular.module('starter.controllers.LevelListCtrl', ['starter.factories.LevelFactory'])

    .controller('LevelListCtrl', function ($scope, $LevelFactory, $state) {
        $scope.chapter = $state.params.chapter;
        if ($scope.chapter > 1) $scope.levelCount = 24;
        else $scope.levelCount = 12;
        $scope.levelsInLine = 3;
        $scope.levelsOnScreen = 12;
        $LevelFactory.init($scope.levelCount, $scope.chapter);
        $scope.levels = $LevelFactory.levels;
    });