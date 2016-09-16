
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
.run(["$state", "$identity", "$rootScope", "$mdDialog", function($state, $identity, $rootScope, $mdDialog){

    $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){

        if($identity.user == null && toState.name !== "identity"){
			$mdDialog.show(
			  $mdDialog.alert()
				.clickOutsideToClose(true)
				.title('Please Log In First')
				.textContent("Redirecting to login.")
				.ariaLabel('Login Redirect Alert')
				.ok('Ok')
			);
            event.preventDefault();
            $state.go("identity");
        }
        
     })
}]);
