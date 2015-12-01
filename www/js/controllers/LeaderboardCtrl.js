angular.module('starter.controllers.LeaderboardCtrl', ['starter.factories.LevelFactory'])
    .controller('LeaderboardCtrl', function ($scope, $http, $window, $ionicPopup, $filter, $timeout, $ionicHistory) {
        var translateText = $filter('translate');
        var title;
        $http.get("http://blackboxservermobile.azurewebsites.net/leaderboardgame")
            .success(function(data){
                $scope.table = data;
                $timeout($scope.update,1000);
                title = $ionicHistory.currentTitle();
            })
            .error(function(){
                $ionicPopup.alert({
                    title: translateText('No_connection'),
                    template: translateText('No_connection_text')
                }).then(function () {
                        window.history.back();
                    });
            });
        $scope.update = function(){
            $http.get("http://blackboxservermobile.azurewebsites.net/leaderboardgame")
            .success(function(data){
                for (var i = 0; i < $scope.table.length; i++){
                    if ($scope.table[i]["username"]!=data[i]["username"]){
                        angular.element(document.getElementById(i+"_name")).addClass("is-updating");
                    }
                    if ($scope.table[i]["score"]!=data[i]["score"]){
                        angular.element(document.getElementById(i+"_score")).addClass("is-updating");
                    }
                }
                $scope.newTable = data;
                $timeout($scope.endUpdating,500);
                //create next update if we didn't leave this page
                if ($ionicHistory.currentTitle()==title) $timeout($scope.update,5000);
            })
        }
        $scope.endUpdating = function(){
            for (var i = 0; i < $scope.table.length; i++){
                    angular.element(document.getElementById(i+"_name")).removeClass("is-updating");
                    angular.element(document.getElementById(i+"_score")).removeClass("is-updating");
                }
            $scope.table=$scope.newTable;
        };
    });