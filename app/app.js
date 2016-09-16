'use strict';

// Declare app level module which depends on views, and components
angular.module('rpgBuddy', [
  'ui.router',
  'ngMaterial',
  'ngAnimate',
  'bsLoadingOverlay',
  'md.data.table',
  'rpgBuddy.home',
  'rpgBuddy.navigation',
  'rpgBuddy.version',
  'rpgBuddy.notes',
  'rpgBuddy.identity',
  'socket',
  'git'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'home/home.html'
    })
}])
.run(function(bsLoadingOverlayService) {
    bsLoadingOverlayService.setGlobalConfig({
        templateUrl: 'loader-template.html'
    });
})

