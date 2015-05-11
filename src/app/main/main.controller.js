'use strict';

class MainCtrl {
    constructor($scope, $http, $location, largeHero, $interval, ApiService) {

        let vm = this;
        vm.apiCount = 0;
        vm.success = 0;
        vm.failure = 0;

        // set background image
        var image = largeHero[_.random(0, largeHero.length)];
        vm.jumbostyle = {
            'background-image': `url(assets/images/largehero/${image}.png)`
        };

        ApiService.apiCalls(res=>{
            if(res.success){
                vm.success += 1;
            }
            if(res.failure){
                vm.failure += 1;
            }
            vm.apiCount += 1;
        });

        ApiService.updates(update=>{
            vm.updates = update;
        });

        ApiService.counts().success(res=>{
            vm.count = res;
            vm.apiCount += res.api;
            vm.success += res.apiSuccess;
            vm.failure += res.apiFail;
        });

        vm.search = function() {
            if (vm.nickname) {
                $location.path(`/player/${vm.nickname}/`);
            }
        };

    }
}

MainCtrl.$inject = ['$scope', '$http', '$location', 'largeHero', '$interval', 'ApiService'];

export default MainCtrl;