'use strict';

angular.module('rpgBuddy.home', ['ngRoute', angularDragula(angular)])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ["$scope", "socket", HomeCtrl]);

function HomeCtrl($scope, socket) {

}
