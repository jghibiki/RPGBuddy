'use strict';

angular.module('rpgBuddy.files')


.controller('EditFilesCtrl', EditFilesCtrl);

EditFilesCtrl.$inject = [
    "$scope",
    "socket",
    "$state",
    "$stateParams",
    "$window",
	"$mdDialog"
]
function EditFilesCtrl($scope, socket, $state, $stateParams, $window, $mdDialog) {

    $scope.data = "";
    $scope.fileName = null;
	$scope.permissions = null;
    
    if($state.current.name == "files.new"){
        $scope.fileName = "Untitled Note Sheet";
    }
    else if($state.current.name == "files.edit"){
        $scope.fileName = $stateParams.file;
        //load file
    }


	$scope.quill = new Quill('#editor-container', {
	  modules: {
		toolbar: [
		  [{ header: [1, 2, false] }],
		  ['bold', 'italic', 'underline'],
		  ['code-block', 'image']
		]
	  },
	  placeholder: 'Compose an epic...',
	  theme: 'snow' // or 'bubble'
	});

    $scope.save = function(){
        var data = $scope.quill.getContent();
        var serialized = JSON.stringify(data);
    }

    $scope.undo = function(){
        $scope.quill.history.undo();
    }

    $scope.redo = function(){
        $scope.quill.history.redo();
    }


	$scope.rename = function(ev){
		var confirm = $mdDialog.prompt()
						  .title('Rename File')
						  .placeholder("Name")
						  .ariaLabel('rename')
						  .initialValue($scope.fileName)
						  .targetEvent(ev)
						  .ok('Accept')
						  .cancel('Cancel');

		$mdDialog.show(confirm).then(function(result){
			$scope.fileName = result;

			//todo: finish renaming by propogating to server
		});
	}
}
