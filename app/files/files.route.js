

'use strict';

angular.module('rpgBuddy.files')
.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('files', {
        url:'/files',
        abstract: true,
        template: '<div ui-view></div>'
    })
    .state('files.list', {
        url: '/list',
        templateUrl: 'files/list.files.html',
        controller: 'ListFilesCtrl',
        controllerAs: 'vm'
    })
    .state('files.edit', {
        url: '/edit',
        templateUrl: 'files/edit.files.html',
        controller: 'EditFilesCtrl',
        controllerAs: 'vm'
    })
    .state('files.new', {
        url: '/new',
        templateUrl: 'files/edit.files.html',
        controller: 'EditFilesCtrl',
        controllerAs: 'vm'
    })
    .state('files.upload', {
        url: '/upload',
        templateUrl: 'files/upload.files.controller.html',
        controller: 'UploadFilesCtrl',
        controllerAs: 'vm'
    })
}])
