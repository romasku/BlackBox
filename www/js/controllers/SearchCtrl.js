angular.module('starter.controllers.SearchCtrl', ['starter.factories.LevelFactory'])

    .controller('SearchCtrl', function ($scope, $LevelFactory, $http) {
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
