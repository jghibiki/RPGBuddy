
angular.module('rpgBuddy.files')
.controller("UploadFilesCtrl", UploadFilesCtrl)

UploadFilesCtrl.$inject = [
    "$scope",
    "socket",
    "$window",
    "$identity"
]
function UploadFilesCtrl($scope, socket, $window, $identity){

	$scope.files = []

    /* file drop section */
    if ($window.File && $window.FileReader && $window.FileList && $window.Blob) {
      // Great success! All the File APIs are supported.
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }

    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.

        // files is a FileList of File objects. List some properties.
        for (var i = 0, f; f = files[i]; i++) {
          $scope.files.push(f);
        }
        $scope.$apply(); // call apply to propogate dom changes
    }

    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    // Setup the dnd listeners.
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

    /* remove file from upload list */
    $scope.remove = function(index){
        $scope.files.pop(index); 
    };
    
    $scope.upload = function(){
        var stream = ss.createStream();

        for(var i=0; i < $scope.files.length; i++){
            var file = $scope.files[i];
            ss(socket).emit('file:upload', stream, {
                size: file.size, 
                name: file.name, 
                type: file.type,
                username: $identity.user.username
            });
            ss.createBlobReadStream(file).pipe(stream);
        }
    };

}
