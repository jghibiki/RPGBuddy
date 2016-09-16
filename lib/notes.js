
module.exports = function(opts, modules){

    var noteManager = {
        bindListeners: bindListeners,

        createNotesheet: createNotesheet
    }; 

    return noteManager;

}

function bindListeners(opts, socket){
    if (opts.debug) console.log('Binding note listeners');

    socket.on("notesheet:create", createNotesheet);
}


function createNotesheet(req){
    var owner = req.owner;
    var name = req.name;
    var collection = req.collection;

    // todo: work on ading create notcard
    var user = modules.users.getUser(req.owner);


    socket.emit("update:user", user);
    socket.emit("notesheet:create::response");
}

