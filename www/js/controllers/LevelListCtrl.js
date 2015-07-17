angular.module('starter.controllers.LevelListCtrl', []).controller('LevelListCtrl', function ($scope) {
    $scope.levelCount = 3;
    $scope.levels = [];
    for (var i = 1; i <= $scope.levelCount; i++)
        $scope.levels.push(i);
});