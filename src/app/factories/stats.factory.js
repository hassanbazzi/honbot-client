'use strict';

class stats {
    constructor(socket, baseURL, $http) {
        var recent = [];
        var isWatching = false;
        return {
            get: function(callback) {
                if (recent.length !== 0) {
                    callback(recent);
                } else {
                    $http.get(baseURL + '/recentBPM')
                        .success(function(data) {
                            angular.forEach(data, function(obj) {
                                obj.xmSongID = obj.xmSongID.replace('#', '-');
                            });
                            recent = data;
                            callback(recent);
                        });
                }
                if (!isWatching) {
                    isWatching = true;
                    socket.on('bpm', function(data) {
                        data.xmSongID = data.xmSongID.replace('#', '-');
                        recent.unshift(data);
                    });
                }
            }
        };
    }
}

stats.$inject = ['socket', 'baseURL', '$http'];

export default stats;