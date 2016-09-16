
'use strict';

angular.module('rpgBuddy.navigation')

.controller("NavigationCtrl", NavigationCtrl)

NavigationCtrl.$inject = [
    "$scope",
    "$mdDialog"
]
function NavigationCtrl($scope, $mdDialog){

    $scope.showNewFileDialog = function(ev){
        $mdDialog.show({
            controller: DialogController,
			templateUrl: 'navigation/new-file.navigation.controller.html',
            targetEvent: ev,
            clickOutsidetoClose: true
        })
    }

	DialogController.$inject = [
		"$scope",
		"$mdDialog",
	]
	function DialogController($scope, $mdDialog) {

		$scope.hide = function() {
		  $mdDialog.hide();
		};

		$scope.cancel = function() {
		  $mdDialog.cancel();
		};

		$scope.answer = function(answer) {
		  $mdDialog.hide(answer);
		};
	}
}


