'use strict';

import _ from 'lodash';

class ApiService {

    constructor($http, BaseUrl, socket) {
        this.host = BaseUrl.host;
        this.$http = $http;
        this.socket = socket;
        this.matches = {};
        this.apiWatching = false;
        this.updatesList = [];
        this.updateWatching = false;
    }
    apiCalls(callback) {
        if(!this.apiWatching){
            this.socket.on('api', function(data) {
                callback(data);
            });
            this.apiWatching = true;
        }
    }
    updates(callback) {
        var that = this;
        if(!this.updateWatching){
            this.$http.get(`${this.host}/recentPlayers/`).success((res)=>{
                that.updatesList = that.updatesList.concat(res);
                callback(that.updatesList);
            });
            this.socket.on('update', function(data) {
                that.updatesList.unshift(data);
                that.updatesList = _.dropRight(that.updatesList);
                callback(that.updatesList);
            });
            this.updateWatching = true;
        }
        callback(this.updatesList);
    }
    counts(){
        return this.$http.get(`${this.host}/counts/`);
    }
    singlePlayer(nickname) {
        return this.$http({
            method: 'GET',
            url: `${this.host}/player/${nickname}/`,
            cache: true
        });
    }
    bulkPlayers(pids){
        return this.$http.get(`${this.host}/bulkPlayers/${pids}/`);
    }
    history(pid, mode, page) {
        return this.$http.get(`${this.host}/history/${pid}/${page}/${mode}/`);
    }
    match(id, callback) {
        if (!this.matches[id]) {
             this.$http.get(`${this.host}/match/${id}/`).success(res => {
                this.matches[id] = res;
                callback(res);
             });
        } else {
            callback(this.matches[id]);
        }
    }
    saveMatches(data){
        var that = this;
        _.forEach(data, function(n){
            that.matches[n.id] = n;
        });
    }
}

ApiService.$inject = ['$http', 'BaseUrl', 'socket'];

export default ApiService;