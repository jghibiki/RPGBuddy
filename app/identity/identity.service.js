
angular.module("rpgBuddy.identity")
.factory("$identity", IdentityService);

IdentityService.$inject = [
    "$q",
    "socket",
	"$mdDialog"
]
function IdentityService($q, socket, $mdDialog){
    
    identityService = {};

    identityService.user = null;

	identityService.promise = null;

    identityService.authenticate = function(username, pin){
		if(identityService.promise == null){
			identityService.promise = $q.defer();
			socket.emit("user:authenticate", {username: username, pin: pin});
			return identityService.promise.promise;
		}
    }

    socket.on("user:authenticate::response", function(user){
        identityService.user = user;
		identityService.promise.resolve(user);
		identityService.promise = null;
    });

    socket.on("user:authenticate::error", function(err){
		identityService.promise.reject(err);
		identityService.promise = null;
    });

    identityService.register = function(username, pin){
        if(identityService.promise == null){
            identityService.promise = $q.defer();
            socket.emit("user:add", {username: username, pin: pin});
            return identityService.promise.promise;
        }
    };

    socket.on("user:add::response", function(user){
        identityService.user = user;
		identityService.promise.resolve(user);
		identityService.promise = null;
    });

    return identityService;

}

