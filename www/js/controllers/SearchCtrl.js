angular.module('starter.controllers.SearchCtrl', ['starter.factories.LevelFactory'])

    .controller('SearchCtrl', function ($scope, $LevelFactory, $http) {
    	$http.get("http://blackboxgame.ddns.net:8888/find_replay")
    	.success(function(data) {
        	$http.get("http://blackboxgame.ddns.net:8888/get_username", {params : {id : data["players_id"]}})
        	.success(function(name) {
        		var search_text = angular.element(document.getElementById("search_text"));
        		search_text.css("visibility","hidden");
        		var spinner = angular.element(document.getElementById("spinner"));
        		spinner.css("visibility","hidden");
        		var oponent_name = angular.element(document.getElementById("oponent_name"));
        		oponent_name.html(name);
        		oponent_name.css("visibility","visible");
        		var button_accept = angular.element(document.getElementById("button_accept"));
        		button_accept.css("visibility","visible");
        		$scope.levelnum = data["game_id"];
        		$scope.log = data["log"];
        		$scope.time_won = data["time_won"];
        	})
        	.error(function(data){

        		console.log("error while searching name");
        	})
   		})
    	.error(function(data) {
        	console.log("error while searching replay");
   		});
    });
