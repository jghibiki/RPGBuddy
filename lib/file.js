var fs = require('fs');
var path = require('path');
var ss = require('socket.io-stream');

module.exports = function(opts, modules){

    var fileManager = {
        bindListeners: bindListeners,
        verifyManifestFiles: verifyManifestFiles,
        verifyFiles: verifyFiles,
    }; 

    return fileManager;


    function bindListeners(opts, socket){

        socket.on("note:create", createNote);

        ss(socket).on("file:upload", function(stream, data){

            var user = modules.users.getUser(data.username);
            console.log("User " + data.username + " uploading file " + data.name);
            var filename = path.join(opts.data, "users", data.username, data.name);

            user.files.push({
                "name": data.name,
                "collection": "uploads",
                "type": data.type,
                "share": []
            });
            

            stream.pipe(fs.createWriteStream(filename));

            modules.users.updateUser(user);

            console.log("File " + data.file + " uploaded successfully.");
        });

        function createNote(req){
            var owner = req.owner;
            var name = req.name;
            var collection = req.collection;

            // todo: work on ading create notcard
            var user = modules.users.getUser(req.owner);


            socket.emit("update:user", user);
            socket.emit("note:create::response");
        }
    }



    function verifyManifestFiles(rootPath, username, manifest){
        /* Verify manifest */
          var recursiveResult = fileManager.verifyFiles(path.join(rootPath, username), manifest.files);
          var succeeded = recursiveResult.succeeded;
          var failed = recursiveResult.failed;
          var added = recursiveResult.added;

          console.log("Validation Results: ");

          /* remove failed files */
          if(failed.length > 0) {
            console.log(" Failed:");
            failed.forEach(function(file){ console.log("  " + file.name + " (" + file.type + ")" ); });
          }

          manifest.files = manifest.files.filter(function(el){
            return failed.indexOf(el) == -1;
          })

          /* list verified files if debug */
          if(succeeded.length > 0) {
            console.log(" Succeeded:");
            succeeded.forEach(function(file){ console.log("  " + file.name + " (" + file.type + ")" ); });
          }

          /* list added files */
          if(added.length > 0) {
            console.log(" Added:");
            added.forEach(function(file){ console.log("  " + file.name + " (" + file.type + ")" ); });
          }

          added.forEach(function(file){
            manifest.files.push(file);
          });

          /* if changed, save updated manifest */
          if( added.length > 0 || failed.length > 0){
              if (opts.debug) console.log("Updating user " + username + "'s manifest file to include changes.");
              var manifestPath = path.join(path.join(rootPath, username), "manifest.json");
              fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 4));
          }

          return manifest;
    }

    /* verify files */
    function verifyFiles(rootPath, files) {
        var failed = [];
        var succeeded = [];
        var added = [];

        files.forEach(function(file){
            var filePath = path.join(rootPath, file.name);
            if(fs.existsSync(filePath)){
                succeeded.push(file);
            }
            else{
                failed.push(file);
            }
        });

        /* Discover new files */

        var filelist = syncWalk(rootPath);

        filelist.forEach(function(file){
            if( file !== 'manifest.json'
                && file !== '.'
                && file !== '..'){

                var split = file.split(".");
                var type = null;
                if(split.length === 2){

                    if(split[1] === "jpg" ||
                        split[1] === "png" ||
                        split[1] === "gif"){
                        type = "image";
                    }
                    else if(split[1] === "wav" ||
                         split[1] === "mp3"){
                        type = "audio";
                    }
                    else{
                        type = "unknown";
                    }
                }
                if(split.length === 3){
                    type = split[1];
                }

                added.push({ name: file, collection: "default", type: type, share: [] });
            }
        });
        var succeededNames = succeeded.map(function(el){ return el.name });
        added = added.filter(function(el){
            return succeededNames.indexOf(el.name) === -1;
        })

        return { failed: failed, succeeded: succeeded, added: added};
    }


    function syncWalk(dir, filelist){
        var files = fs.readdirSync(dir);

        filelist = filelist || [];

        files.forEach(function(file){
            var filePath = path.join(dir, file);
            if(fs.statSync(filePath).isDirectory()){
                filelist = syncWalk(filePath, filelist);
            }
            else{
                filelist.push(file);
            }
        });
        return filelist;
    };

}
