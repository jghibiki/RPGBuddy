'use strict';

angular.module('rpgBuddy.userSelect', ['ngRoute', angularDragula(angular)])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'userSelect/userSelect.html',
    controller: 'UserSelectCtrl'
  });
}])

.controller('UserSelectCtrl', ["$scope", "socket", HomeCtrl]);

function UserSelectCtrl($scope, socket) {

}
