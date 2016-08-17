
module.exports = function(opts, modules){

    var noteManager = {
        bindListeners: bindListeners,

        createFoler: createFolder,

        createNotecard: createNotecard,

        createNotesheet: createNotesheet
    }; 

    return noteManager;

}

function bindListeners(opts, socket){
    if (opts.debug) console.log('Binding note listeners');

    socket.on("folder:create", createFolder);

    socket.on("notecard:create", createNotecard);

    socket.on("notesheet:create", createNotecard);
}

function createFolder(config){
    var path = confg.path;
    var owner = config.owner

    var user = modules.users.getUser(owner);
    // verify user permissions for path
}

function createNotecard(config){
    var owner = config.owner;
    var name = config.name;
    var path = config.path;

    var user = modules.users.getUser(owner);
    //verify user permissions for path
}

function createNotesheet(config){
    var owner = config.owner;
    var name = config.name;
    var path = config.path;

    var user = modules.users.getUser(owner);
    //verify user permissions for path
}
