angular.module('starter.factories.LevelFactory', [])
    .factory('$LevelFactory', ['$window', '$http','$ionicPopup', function ($window, $http, $ionicPopup) {
        var factory = {};
        factory.levels = [];

        factory.init = function (levelCount, chapter) {
            factory.levels.splice(0, factory.levels.length);
            for (var i = 0; i < levelCount; i++) {
                var level = JSON.parse($window.localStorage[chapter + '-' + (i + 1)] || '{}');
                if (level.numInChapter != i + 1) {
                    level = {
                        level: chapter + '-' + (i + 1),
                        chapter: chapter,
                        numInChapter: i + 1,
                        RAND: Math.floor(Math.random() * 1e9),
                        isCompleted: false,
                        moves: 0,
                        penalty: 0,
                        stars: 0,
                        points: 0,
                        smallHint: false,
                        bigHint: false,
                        solution: false
                    };
                    $window.localStorage[level.level] = JSON.stringify(level);
                }
                factory.levels.push(level);
            }
        };

        factory.getLevel = function (level) {
            return factory.levels[level - 1];
        };

        factory.setLevel = function (level) {
            factory.levels[level.numInChapter - 1] = level;
            $window.localStorage[level.level] = JSON.stringify(level);
        };

        factory.clear = function () {
            $window.localStorage.clear();
        };

        return factory;
    }]);