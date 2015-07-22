angular.module('starter.factories.LevelFactory', [])
    .factory('$LevelFactory', ['$window', function ($window) {
        var factory = {};
        factory.levels = [];

        factory.init = function (levelCount) {
            for (var i = 0; i < levelCount; i++) {
                var level = JSON.parse($window.localStorage[i + 1] || '{}');
                if (level.level != i + 1) {
                    level = {
                        level: i + 1,
                        isCompleted: false,
                        moves: 0,
                        stars: 0
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
            factory.levels[level.level - 1] = level;
            $window.localStorage[level.level] = JSON.stringify(level);
        };

        return factory;
    }]);