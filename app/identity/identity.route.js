
angular.module("rpgBuddy.identity")
.config(['$stateProvider', function($stateProvider) {

  $stateProvider
   .state('identity', {
       url: '/identity',
	   params: {
			"from": null
		},
       templateUrl: 'identity/identity.controller.html',
       controller: 'IdentityCtrl',
       controllerAs: 'vm'
   });
}])
.run(["$state", "$identity", "$rootScope", function($state, $identity, $rootScope){

    $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){

        if($identity.user == null && toState.name !== "identity"){
            event.preventDefault();
            $state.go("identity");
        }
        
     })
}]);
