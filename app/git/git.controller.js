
'use strict';

angular.module('git', [])

.controller("GitCtrl", ["$scope", "gitManager", GitCtrl ])

function GitCtrl($scope, gitManager){
    $scope.pull = function(){
        gitManager.pull();
    }

    $scope.push = function(){
        gitManager.push();
    }

    $scope.commit = function(){
        var msg = prompt("Please enter a commit message.", "");
        if(msg !== null &&  msg !== undefined && msg !== ""){
            gitManager.commit(msg);
        }
    }
}
