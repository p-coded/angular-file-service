(function () {
    "use strict";

    angular.module('pFile')
            .directive('autoFocusSelect', AutoFocusSelectDirective);

    AutoFocusSelectDirective.$inject = ['$log', '$timeout'];

    function AutoFocusSelectDirective($log, $timeout)
    {
        return {
            restrict: 'AE',
            require: '?ngModel',
            link: link
        };

        function link(scope, element, attrs) {

            activate();

            function activate()
            {
                $timeout(function () {
                    element[0].focus();
                    element[0].select();
                    
                }, 0);
            }
        }
    }
})();