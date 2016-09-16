var fs = require('fs');
var path = require('path');

var utils = require('./utils.js');

module.exports = function(opts, modules){
    
    var userManager = {
        bindListeners: bindListeners,
    };

    userManager = loadUsers(userManager, opts, modules);


    function bindListeners(opts, socket){;

        socket.on("user:add", addUser);
        socket.on("user:get", getUser);
        socket.on("user:rename", changeUsername);
        socket.on("user:update", updateUser);
        socket.on("user:authenticate", authenticateUser);

        userManager.getUser = getUser;
        userManager.addUser = addUser;
        userManager.changeUsername = changeUsername;

        function changeUsername(oldUsername, newUserName){
            
            for(var i=0; i < userManager.users; i++){
                if(userManager.users[i].username === oldUsername){

                    userManager.users[i].username = newUsername;

                    var oldUserPath = path.join(userDataLoc, oldUsername);
                    var newUserPath = path.join(userDataLoc, newUsername);

                    fs.renameSync(oldUserPath, newUserPath);

                    var manifestPath = path.join(newUserPath, "manifest.json");
                    fs.writeFileSync(manifestPath, JSON.stringify(userManager.users[i], null, 4));
                }
            }
        }

        function authenticateUser(auth){
            var username = auth.username;
            var pin = auth.pin;
            console.log("Authenticating user: " + username);
            for(var i=0; i<userManager.users.length; i++){
                if(username == userManager.users[i].username 
                    && pin == userManager.users[i].pin){
                    console.log("Sucessfully authenticated");
                    socket.emit("user:authenticate::response", userManager.users[i]);
                    return
                }
            }
            console.log("Failed to authenticate");
            socket.emit("user:authenticate::error", "Invalid username and pin combo");
        }

        function getUser(username){
            for(var i=0; i < userManager.users; i++){
                if(userManager.users[i].username === username){
                    return userManager.users[i]; 
                }
            }
        }

        function addUser(req){
            var username = req.username;
            var pin = req.pin;
            var role = req.role || "PC";
            var userPath = path.join(userDataLoc, username);
            fs.mkdirSync(userPath);
             
            /* write a new manifest for user */
            var baseManifest = 
            { 
                username: username, 
                pin: pin,
                files : [], 
                role: role 
            };
            var baseManifestPath = path.join(userPath, "manifest.json");
            fs.writeFileSync(baseManifestPath, JSON.stringify(baseManifest, null, 4));
        }

        function updateUser(updatedUser){
            for(var i=0; i < userManager.users; i++){
                if(userManager.users[i].username === updatedUser.username){
                    userManager.users[i] = updatedUser;

                    var userPath = path.join(userDataLoc, updatedUser.username);
                    var manifestPath = path.join(userPath, "manifest.json");
                    fs.writeFileSync(manifestPath, JSON.stringify(updatedUser, null, 4));
                }
            }
        }
    }

    return userManager;
}


function loadUsers(userManager, opts, modules){

    userManager.users = [];

    var userData = opts.data + '/users/';
    userManager.userDataLoc = userData;

    if(!fs.existsSync(userData)) {
        if (opts.debug) console.log("No user dir exists yet, creating one.");
        utils.mkdirSync(userData);
    }
    else{
      
      /* ls user data dir */
      var ls = fs.readdirSync(userData);

      /* filter out dirs */
      var dirs = [];
      for (var i = 0; i < ls.length; i++){
        if(fs.lstatSync(path.join(userData, ls[i])).isDirectory()
          && ls[i] !== '..'
          && ls[i] !== '.' ) { dirs.push(ls[i]); }
      }
      
      /* load user data if there are users defined */
      for( var i = 0; i < dirs.length; i++) { 

        /* Load manifest */
        var manifest = JSON.parse(
          fs.readFileSync(userData + dirs[i] + '/manifest.json'));

        if(opts.debug) console.log("Loading user: " + manifest.username + ".");

        /* use files module to validate manifest */
        manifest = modules.file.verifyManifestFiles(userData, dirs[i], manifest); 

        /* if debug list loaded user */
        if(opts.debug) console.log("Loaded user: " + manifest.username + ".");
        userManager.users.push(manifest);
      }
    }


    return userManager;
}


function deleteFolderRecursively(filePath){
    if(fs.existsSync(filePath)){
        fs.readdirSync(path).forEach(function(file, index){
            var curPath = path.join(filePath, file);
            if(fs.lstatSync(curPath).isDirectory()){
                deleteFolderRecutsively(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(filePath);
    }
}


