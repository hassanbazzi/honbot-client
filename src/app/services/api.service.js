'use strict';

import _ from 'lodash';

class ApiService {

    constructor($http, BaseUrl, socket, $analytics) {
        this.$analytics = $analytics;
        this.$http = $http;
        this.apiWatching = false;
        this.host = BaseUrl.host;
        this.matches = {};
        this.socket = socket;
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
            this.$analytics.eventTrack('api', {category: 'main', label: 'recentPlayers'});
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
            this.$analytics.eventTrack('api', {category: 'main', label: 'counts'});
        return this.$http.get(`${this.host}/counts/`);
    }
    singlePlayer(nickname) {
        this.$analytics.eventTrack('api', {category: 'player', label: nickname});
        return this.$http({
            method: 'GET',
            url: `${this.host}/player/${nickname}/`,
            cache: true
        });
    }
    bulkPlayers(pids){
            this.$analytics.eventTrack('api', {category: 'players', label: 'bulk'});
        return this.$http.get(`${this.host}/bulkPlayers/${pids}/`);
    }
    history(pid, mode, page) {
        this.$analytics.eventTrack('api', {category: 'history', label: pid});
        return this.$http.get(`${this.host}/history/${pid}/${page}/${mode}/`);
    }
    match(id, callback) {
        this.$analytics.eventTrack('api', {category: 'match', label: id});
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

ApiService.$inject = ['$http', 'BaseUrl', 'socket', '$analytics'];

export default ApiService;