angular.module('starter.controllers.SearchCtrl', ['starter.factories.LevelFactory'])

    .controller('SearchCtrl', function ($scope, $rootScope, $LevelFactory, $http) {
    	$http.get("http://blackboxservermobile.azurewebsites.net/find_replay")
    	.success(function(data) {
        	$http.get("http://blackboxservermobile.azurewebsites.net/get_username", {params : {id : data["players_id"]}})
        	.success(function(name) {
        		var search_text = angular.element(document.getElementById("search_text"));
        		search_text.css("visibility","hidden");
        		var spinner = angular.element(document.getElementById("spinner"));
        		spinner.css("visibility","hidden");
        		var opponent_name = angular.element(document.getElementById("opponent_name"));
        		opponent_name.html(name);
        		opponent_name.css("visibility","visible");
        		var button_accept = angular.element(document.getElementById("button_accept"));
        		button_accept.css("visibility","visible");
        		$rootScope.levelnum = data["game_id"];
        		$rootScope.log = data["log"];
                $rootScope.rand = data["rand"];
        	})
        	.error(function(data){

        		console.log("error while searching name");
        	})
   		})
    	.error(function(data) {
        	console.log("error while searching replay");
   		});
    });
