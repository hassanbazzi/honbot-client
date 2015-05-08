'use strict';

var socket = function(socketFactory, BaseUrl) {
    return socketFactory({
        ioSocket: io.connect(BaseUrl.host)
    });
};

socket.$inject = ['socketFactory', 'BaseUrl'];

export default socket;