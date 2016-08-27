
module.exports = function(opts, modules){

    var noteManager = {
        bindListeners: bindListeners,

        addToCollection: addToCollection,

        createNotecard: createNotecard,

        createNotesheet: createNotesheet
    }; 

    return noteManager;

}

function bindListeners(opts, socket){
    if (opts.debug) console.log('Binding note listeners');

    socket.on("collection:add", addToCollection);

    socket.on("notecard:create", createNotecard);

    socket.on("notesheet:create", createNotecard);
}

function addToCollection(config){
    var path = confg.path;
    var owner = config.owner;
    var collection = config.collection;


}

function createNotecard(config){
    var owner = config.owner;
    var name = config.name;
    var path = config.path;

    //verify user permissions for path
}

function createNotesheet(config){
    var owner = config.owner;
    var name = config.name;
    var path = config.path;

    //verify user permissions for path
}
