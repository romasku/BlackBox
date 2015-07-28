angular.module('starter.controllers.MainCtrl', ['starter.factories.LevelFactory'])

    .controller('MainCtrl', function ($scope, $http, $LevelFactory, $window) {
    	if (!$LevelFactory.get("id",null)) {
    		$http.get("http://blackboxgame.ddns.net:8888/register")
    			.success(function(data){
    				$LevelFactory.set("id",data);
    			});
    	}
    	if (!$LevelFactory.get("name",null)) {
    		$http.get("http://blackboxgame.ddns.net:8888/get_username", {params : {id :$LevelFactory.get("id",null)}})
    			.success(function(data){
    				$LevelFactory.set("name",data);
    			});
    	}
    	console.log($LevelFactory.get("id",null));
    });