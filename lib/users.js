
module.exports = function(opts, models){
    
    var userManager = {
        bindListeners: bindListeners,
    var user = modules.users.getUser(owner);
        getUser: getUser

    };

    loadUsers();

    return userManager;
}

function bindListeners(opts, socket){

}

function loadUsers(){

    userManager.users = [];
    //load users from opts.data dir /users.json
}

function getUser(username){
    for(var i=0; i < userManager.users; i++){
        if(userManager.users[i].username === username){
            return userManager.users[i]; 
        }
    }
}
