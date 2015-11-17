angular.module('starter.controllers.MainCtrl', ['starter.factories.LevelFactory'])

    .controller('MainCtrl', function ($scope, $http, $LevelFactory, $window) {
    	if (!$window.localStorage["id"]) {
    		$http.get("http://blackboxservermobile.azurewebsites.net/register")
    			.success(function(data){
    				$window.localStorage["id"] = data;
    			});
    	}
    	if (!$window.localStorage["name"]) {
    		$http.get("http://blackboxservermobile.azurewebsites.net/get_username", {params : {id :$window.localStorage["id"]}})
    			.success(function(data){
    				window.localStorage["name"] = data;
    			})
                .error(function(data){
                        console.log(data);
                });
    	}
    });
      
