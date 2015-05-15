'use strict';

import MainCtrl from './main/main.controller';
import NavbarCtrl from './components/navbar/navbar.controller';
import PlayerCtrl from './player/player.controller';
import HistoryCtrl from './player/history.controller';
import MatchCtrl from './match/match.controller';
import BaseUrl from './services/baseurl';
import ApiService from './services/api.service';
import ModeService from './services/mode.service';
import adsense from './directives/adsense';
import socket from './factories/socket';
import largeHero from './largeHero';
import heroData from './heroData';

angular.module('client', ['ngRoute', 'mgcrea.ngStrap', 'angularMoment', 'btford.socket-io', 'ngNumeraljs', 'angulartics', 'angulartics.google.analytics'])
    .controller('MainCtrl', MainCtrl)
    .controller('NavbarCtrl', NavbarCtrl)
    .controller('PlayerCtrl', PlayerCtrl)
    .controller('MatchCtrl', MatchCtrl)
    .controller('HistoryCtrl', HistoryCtrl)
    .factory('socket', socket)
    .service('BaseUrl', BaseUrl)
    .service('ApiService', ApiService)
    .service('ModeService', ModeService)
    .directive('adsense', adsense)
    .constant('largeHero', largeHero)
    .constant('heroData', heroData)
    .config(['$routeProvider', '$locationProvider', '$numeraljsConfigProvider', AppController])
    .run(['$rootScope', AppRunner]);

function AppController($routeProvider, $locationProvider, $numeraljsConfigProvider) {
    $numeraljsConfigProvider.setDefaultFormat('0.0 $');
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
        .when('/', {
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl',
            controllerAs: 'ctrl',
        })
        .when('/player/:player/', {
            templateUrl: 'app/player/player.html',
            controller: 'PlayerCtrl',
            controllerAs: 'ctrl'
        })
        .when('/c/player/:player/', {
            templateUrl: 'app/player/player.html',
            controller: 'PlayerCtrl',
            controllerAs: 'ctrl'
        })
        .when('/p/player/:player/', {
            templateUrl: 'app/player/player.html',
            controller: 'PlayerCtrl',
            controllerAs: 'ctrl'
        })
        .when('/match/:match/', {
            templateUrl: 'app/match/match.html',
            controller: 'MatchCtrl',
            controllerAs: 'ctrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}

function AppRunner($rootScope) {
    $rootScope.$on('$routeChangeStart', function(){
        // Object.keys(window).filter(function(k) { return /google/.test(k) }).forEach(
        //     function(key) {
        //         console.log(key)
        //         console.log(window[key])
        //         delete(window[key]);
        //     }
        // );
    })
}