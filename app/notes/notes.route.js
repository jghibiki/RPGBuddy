

'use strict';

angular.module('rpgBuddy.notes')
.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('notes', {
        url:'/notes',
        abstract: true,
        template: '<div ui-view></div>'
    })
    .state('notes.list', {
        url: '/list',
        templateUrl: 'notes/notes.list.html',
        controller: 'ListNotesCtrl',
        controllerAs: 'vm'
    })
    .state('notes.edit', {
        url: '/edit',
        templateUrl: 'notes/notes.edit.html',
        controller: 'EditNotesCtrl',
        controllerAs: 'vm'
    })
    .state('notes.new', {
        url: '/new',
        templateUrl: 'notes/notes.edit.html',
        controller: 'EditNotesCtrl',
        controllerAs: 'vm'
    })
}])
