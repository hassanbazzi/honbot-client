'use strict';

class ModeService {

    constructor($location) {
        this.$location = $location;
    }
    get modeNameFromPath(){
        var loc = this.$location.path();
        if(loc.indexOf('/c/') !== -1){
            return 'cs';
        }
        else if(loc.indexOf('/p/') !== -1){
            return 'acc';
        }
        return 'rnk';
    }
}

ModeService.$inject = ['$location'];

export default ModeService;