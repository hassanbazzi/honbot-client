'use strict';

class AnalyticsCtrl {
    constructor($routeParams, ApiService, ModeService, $location, $alert, BaseUrl) {
        let vm = this;
        vm.m = ModeService.modeNameFromPath;
        vm.s = {};
        vm.BaseUrl = BaseUrl.host;
        vm.nickname = $routeParams.player;
        vm.historyPage = 0;
        vm.history = [];
        vm.page = 'analtycs';

        vm.changeMode = function(newmode) {
            $location.path(`${newmode}player/${vm.nickname}/`);
        };

        vm.changePage = function(page) {
            if (vm.m === 'rnk') {
                $location.path(`/${page}/${vm.nickname}/`);
            } else if (vm.m === 'cs') {
                $location.path(`/c/${page}/${vm.nickname}/`);
            } else if (vm.m === 'acc') {
                $location.path(`/p/${page}/${vm.nickname}/`);
            }
        };

        ApiService.singlePlayer(vm.nickname).success(res => {
            vm.s = res;
            if (vm.s.fallback) {
                $alert({
                    title: 'Warning:',
                    content: 'Stats failed to update. This could be because the HoN api is currently busy or down.',
                    placement: 'top',
                    container: 'alert',
                    type: 'warning',
                    show: true
                });
            }
        }).error((res) => {
            $alert({
                title: 'ERROR:',
                content: res.error,
                placement: 'top',
                container: 'alert',
                type: 'danger',
                show: true
            });
        });
    }
}

AnalyticsCtrl.$inject = ['$routeParams', 'ApiService', 'ModeService', '$location', '$alert', 'BaseUrl'];

export default AnalyticsCtrl;