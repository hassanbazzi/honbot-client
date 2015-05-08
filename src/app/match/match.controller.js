'use strict';

import _ from 'lodash';

class MatchCtrl {
    constructor($routeParams, ApiService, heroData, BaseUrl) {
        let vm = this;

        vm.BaseUrl = BaseUrl.host;
        vm.heroData = {};
        vm.team1 = {};
        vm.team2 = {};
        vm.ptips = {};

        var modes = {
            1: 'rnk',
            2: 'cs',
            3: 'acc'
        };


        _.forEach(heroData, function(n) {
            vm.heroData[_.keys(n)[0]] = n[_.keys(n)[0]];
        });

        ApiService.match($routeParams.match, res => {
            vm.match = res;
            vm.duration = moment.duration(res.length, 'seconds').format();
            vm.m = modes[res.mode];

            var pids = _.pluck(res.players, 'player_id').join(',');
            ApiService.bulkPlayers(pids).success(res => {
                _.forEach(res, (n) => {
                    vm.ptips[n.account_id] = n;
                });
            });
            vm.match.players = _.sortBy(vm.match.players, 'position');
            _.forEach(res.players, function(n) {
                _.forEach(n, function(j, key) {
                    j = Number(j);
                    if (angular.isNumber(j)) {
                        if (n.team === 1) {
                            if (!vm.team1[key]) {
                                vm.team1[key] = j;
                            } else {
                                vm.team1[key] += j;
                            }
                        } else {
                            if (!vm.team2[key]) {
                                vm.team2[key] = j;
                            } else {
                                vm.team2[key] += j;
                            }
                        }
                    }
                });
            });
            MG.data_graphic({
                title: "GPM",
                data: vm.match.players,
                chart_type: 'bar',
                x_accessor: 'nickname',
                y_accessor: 'gpm',
                full_width: true,
                height: 350,
                left: 30,
                right: 0,
                top: 10,
                target: '#gpm',
                color_accessor: 'color',
                bar_orientation: 'vertical',
            });
            MG.data_graphic({
                title: "APM",
                data: vm.match.players,
                chart_type: 'bar',
                x_accessor: 'nickname',
                y_accessor: 'apm',
                full_width: true,
                height: 350,
                left: 30,
                top: 10,
                right: 0,
                target: '#apm',
                bar_orientation: 'vertical',
            });
        });

    }
}

MatchCtrl.$inject = ['$routeParams', 'ApiService', 'heroData', 'BaseUrl'];

export default MatchCtrl;