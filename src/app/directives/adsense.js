'use strict';

var adsense = function($timeout) {
    return {
        restrict: 'E',
        link: function(scope, element) {
            return $timeout(function() {
                var adsbygoogle, html, rand;
                rand = Math.random();
                html = "<ins class='adsbygoogle' style='display:block' data-ad-client='ca-pub-7640562161899788' data-ad-slot='7259870550' data-ad-format='auto' data-ad-region='page-" + rand + "'></ins>";
                element.append(html);
                return (adsbygoogle = window.adsbygoogle || []).push({});
            });
        }
    };
};

adsense.$inject = ['$timeout'];

export default adsense;
