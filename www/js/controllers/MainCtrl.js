angular.module('starter.controllers.MainCtrl', ['starter.factories.LevelFactory'])

    .controller('MainCtrl', function ($scope, $http, $LevelFactory, $window) {
    	if (!$window.localStorage["id"]) {
    		$http.get("http://blackboxgame.ddns.net:8888/register")
    			.success(function(data){
    				$window.localStorage["id"] = data;
    			});
    	}
    	if (!$window.localStorage["name"]) {
    		$http.get("http://blackboxgame.ddns.net:8888/get_username", {params : {id :$LevelFactory.get("id",null)}})
    			.success(function(data){
    				window.localStorage["name"] = data;
    			});
    	}
    	console.log($window.localStorage["name"]);
    });
      