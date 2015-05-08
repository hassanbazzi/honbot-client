'use strict';

class HistoryCtrl {
    constructor($routeParams, ApiService, ModeService, $location) {
        let vm = this;
        vm.nickname = $routeParams.player;
        vm.historyPage = 0;
        vm.history = [];

        vm.goMatch = function(match) {
            $location.path(`/match/${match}`);
        };

        var filterMatches = function(matches, account_id) {
            angular.forEach(matches, (n) => {
                var temp = _.find(n.players, 'player_id', account_id);
                temp.date = n.date;
                vm.history.push(temp);
            });
            vm.loading = false;
        };

        vm.more = function() {
            vm.loading = true;
            vm.historyPage += 1;
            ApiService.history(vm.nickname, ModeService.modeNameFromPath, vm.historyPage).success(res => {
                if (res.matches.length > 0) {
                    filterMatches(res.matches, res.account_id);
                }
                if (res.matches.length < 25) {
                    vm.loading = false;
                    vm.nomore = true;
                }
                ApiService.saveMatches(res.matches);
            }).error(function() {
                vm.nomore = true;
                vm.loading = false;
            });
        };
        vm.more();
    }
}

HistoryCtrl.$inject = ['$routeParams', 'ApiService', 'ModeService', '$location'];

export default HistoryCtrl;