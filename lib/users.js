var fs = require('fs');
var path = require('path');

var utils = require('./utils.js');

module.exports = function(opts, modules){
    
    var userManager = {
        bindListeners: bindListeners,
    };

    userManager = loadUsers(userManager, opts, modules);

    return userManager;
}

function bindListeners(opts, socket){

}

function loadUsers(userManager, opts, modules){

    userManager.users = [];

    var userData = opts.data + '/users/';

    if(!fs.existsSync(userData)) {
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
      
      /* load user data*/
      for( var i = 0; i < dirs.length; i++) { 

        /* Load manifest */
        var manifest = JSON.parse(
          fs.readFileSync(userData + dirs[i] + '/manifest.json'));

        if(opts.debug) console.log("Loading user: " + manifest.username + ".");

        /* use files module to validate manifest */
        modules.file.verifyManifestFiles(userData, manifest); 

        /* if debug list loaded user */
        if(opts.debug) console.log("Loaded user: " + manifest.username + ".");
        userManager.users.push(manifest);
      }
    }

    return userManager;
}

function getUser(username){
    for(var i=0; i < userManager.users; i++){
        if(userManager.users[i].username === username){
            return userManager.users[i]; 
        }
    }
}
