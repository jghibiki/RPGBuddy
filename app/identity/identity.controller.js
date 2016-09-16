

angular.module("rpgBuddy.identity")
.controller("IdentityCtrl", IdentityCtrl);

IdentityCtrl.$inject = [
    "$scope",
    "$stateParams",
    "$identity",
    "$mdDialog",
	"$state"
]

function IdentityCtrl($scope, $stateParams, $identity, $mdDialog, $state){
    $scope.login_username = "";
    $scope.login_pin = "";

    $scope.register_username = "";
    $scope.register_password = "";

    $scope.login = function(){
        $identity.authenticate($scope.login_username, $scope.login_pin)
        .then(function(){
			$mdDialog.show(
			  $mdDialog.alert()
				.clickOutsideToClose(true)
				.title('Login Success')
				.textContent("Successfully logged in.")
				.ariaLabel('Login Success Alert')
				.ok('Ok')
			  );

			$state.go("home");
				
        })
        .catch(function(err){
			$mdDialog.show(
			  $mdDialog.alert()
				.clickOutsideToClose(true)
				.title('Login Failed')
				.textContent(err)
				.ariaLabel('Login Failed Alert')
				.ok('Ok')
			  );
		});
    }

    $scope.register = function(){
        $identity.register($scope.register_username, $scope.register_pin)
        .then(function(){
			$mdDialog.show(
			  $mdDialog.alert()
				.clickOutsideToClose(true)
				.title('Registration Success')
				.textContent("Successfully Registered User.")
				.ariaLabel('Registration Success Alert')
				.ok('Ok')
			  );

			$state.go("home");
        })
        .catch(function(err){
			$mdDialog.show(
			  $mdDialog.alert()
				.clickOutsideToClose(true)
				.title('Failed to Register User')
				.textContent(err)
				.ariaLabel('Registration Failed Alert')
				.ok('Ok')
			  );
        });

    }
      
}
