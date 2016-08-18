'use strict';


FilesRouteConfig.$inject = [
    "$stateProvider",
    "$urlRouterProvider"
]

angular.module('rpgBuddy.files', [])
.config(FilesRouteConfig);

function FilesRouteConfig($stateProvider, $urlRouterProvider){
    $urlRouterProvider.when('/files', '/files/browse/~')

  $stateProvider
    .state('files', {
        template: '<div ui-view></div>',
        config: {
            abstract: true
        }
    }
    .state('files.browse', {
        url: '/files/browse/{path:.*}',
        templateUrl: 'files/browser/browser.html'
        controller: 'FileBrowserController',
        controllerAs: 'vm'
    })
    .state('files.view', {
        url: '/files/view/{path:.*}',
        templateUrl: 'files/viewer/viewer.html'
        controller: 'FileViewerController',
        controllerAs: 'vm'
    })
    .state('files.edit', {
        url: '/files/edit/{path:.*}',
        templateUrl: 'files/editor/editor.html',
        controller: 'FileEditorController',
        controllerAs: 'vm'

    })
}
