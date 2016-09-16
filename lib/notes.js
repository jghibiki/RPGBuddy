
module.exports = function(opts, modules){

    var noteManager = {
        bindListeners: bindListeners,

    }; 

    return noteManager;

}

function bindListeners(opts, socket){
    if (opts.debug) console.log('Binding note listeners');

}



