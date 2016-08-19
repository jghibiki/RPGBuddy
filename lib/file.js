var fs = require('fs');
var path = require('path');

module.exports = function(opts, modules){

    var fileManager = {
        bindListeners: bindListeners,
        verifyManifestFiles: verifyManifestFiles,
        verifyFiles: verifyFiles
    }; 

    return fileManager;


    function bindListeners(opts, socket){

    }


    function verifyManifestFiles(rootPath, manifest){
        /* Verify manifest */
          var recursiveResult = fileManager.verifyFiles(rootPath, manifest.files);
          var succeeded = recursiveResult.succeeded;
          var failed = recursiveResult.failed;
          var added = recursiveResult.added;

          console.log("Validation Results: ");

          /* remove failed files */
          if(failed.length > 0) {
            console.log(" Failed:");
            failed.forEach(function(file){ console.log("  " + file); });
          }

          /* list verified files if debug */
          if(succeeded.length > 0) {
            console.log(" Succeeded:");
            succeeded.forEach(function(file){ console.log("  " + file); });
          }

          /* list added files */
          if(added.length > 0) {
            console.log(" Added:");
            added.forEach(function(file){ console.log("  " + file); });
          }
    }

    /* verify files recusively */
    function verifyFiles(rootPath, node) {
      var failed = [];
      var succeeded = [];
      var added = [];

      /* Verify node exists */
      var expandedPath = path.resolve(path.join(rootPath, node.path));
      if (opts.debug) console.log("Node path: " + expandedPath);
      if(fs.existsSync(expandedPath)) {

        /* If node is a dir, validate fils in it */
        if(fs.lstatSync(expandedPath).isDirectory()) {
            
            /* detect new files in the dir */
            var ls = fs.readdirSync(expandedPath);

            /* Get list of files that aren't in the manifest */
            var filePaths = node.files.map(function(childNode){ return '../' + childNode.path});
            console.log("file paths " + filePaths);
            ls.forEach(function(file){
              file = path.relative(opts.data,
                      path.join(node.path, file))

              filePaths.forEach(function(trackedPath) {
                if( file !== trackedPath
                    && file !== '.'
                    && file !== '..'
                    && file !== path.relative(opts.data, 
                      path.join(node.path, 'manifest.json'))) {

                    /* Add the path reletive to the data dir */
                    added.push(file);
                }
              });
            });
             
            /* validate recursive dirs/files */
            

            node.files.forEach(function(childNode){ 
              var recursiveResult = fileManager.verifyFiles(rootPath, childNode);

              /* Merge recursive results */
              recursiveResult.succeeded.forEach(function(node) {
                succeeded.push(node);
              });

              recursiveResult.failed.forEach(function(node) {
                failed.push(node);
              });

              recursiveResult.added.forEach(function(node) {
                added.push(node);
              });
            });
        }
        else {
          succeeded.push(node.path);
        }
      }
      else {
        failed.push(node.path);
      }

      return { failed: failed, succeeded: succeeded, added: added};
    }

}
