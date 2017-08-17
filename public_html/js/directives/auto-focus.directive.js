(function () {
    "use strict";

    angular.module('pFile')
            .directive('autoFocus', AutoFocusDirective);

    AutoFocusDirective.$inject = ['$log', '$timeout'];

    function AutoFocusDirective($log, $timeout)
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
                }, 0);
            }
        }
    }
})();