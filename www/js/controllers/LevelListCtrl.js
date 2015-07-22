angular.module('starter.controllers.LevelListCtrl', [])
    .factory('$localstorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])

    .controller('LevelListCtrl', function ($scope, $localstorage) {
        $scope.levelCount = 6;
        $scope.levels = [];
        $scope.stats = [];
        for (var i = 1; i <= $scope.levelCount; i+=3) {
             for (var j = i; j <= i+2; j++) {
                 if (isNaN($localstorage.getObject(j).level)) {
                     $localstorage.setObject(j, {
                         level: j,
                         isCompleted: false,
                         moves: 0,
                         stars: 0
                     });
                 }
             }
             $scope.stats.push({col1: $localstorage.getObject(i), col2: $localstorage.getObject(i+1), col3: $localstorage.getObject(i+2)});
             $scope.levels.push({col1: i, col2: i + 1, col3: i + 2});
        }
});