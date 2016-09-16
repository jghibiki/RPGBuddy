'use strict';

angular.module('socket')
.factory('socket', function (socketFactory) {
    var mySocket = socketFactory();
    mySocket.forward('error');
    return mySocket;
})
