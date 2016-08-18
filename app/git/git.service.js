'use strict';

var gitService = angular.module('rpgBuddy.git', []);

gitService.factory("gitManager", ["socket", "$q", function(socket, $q){
    var gitManager = {};

    gitManager.promise = null;

    
    /* Commit */
    gitManager.commit = function(message){
		$q(function(resolve, reject){
			socket.on("git:commit::response", function(){
				alert("Changes Committed.");
				socket.leave("git:commit::response");
				resolve();
			});
			socket.emit("git:commit", message);
		});
    };


    /* Clone */
    gitManager.clone = function(repo){
		$q(function(resolve, reject){
			socket.on("git:clone::response", function(){
				alert("Finished Cloning Repository.");
				socket.leave("git:clone::response");
				resolve();
			});
		});
        socket.emit("git:clone", repo);
    };



    /* Pull */
    gitManager.pull = function(){
		$q(function(resolve, reject){
			socket.on("git:pull::response", function(){
				alert("Finished Pulling Repository.");
				socket.leave("git:pull::response");
				resolve();
			});
		});
        socket.emit("git:pull");
    };


    /* Push */
    gitManager.push = function(){
		$q(function(resolve, reject){
			socket.on("git:push::response", function(){
				alert("Finished Pushing Repository.");
				socket.leave("git:push::response");
				resolve();
			});
		});
        socket.emit("git:push");
    };


    /* Status */
    gitManager.status = function(){
		$q(function(resolve, reject){
			socket.on("git:status::response", function(status){
				socket.leave("git:push::response");
				resolve(status);
			});
		});
        socket.emit("git:status");
    }

    return gitManager;
}]);
