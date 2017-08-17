(function () {
    "use strict";
    angular.module('pFile')
            .directive('enterKey', ['$log', EnterKeyDirective]);

    function EnterKeyDirective($log)
    {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attr) {
            element.bind('keydown keypress', function (event) {
                if (event.which === 13) { // 27 = esc key
                    scope.$apply(function () {
                        scope.$eval(attr.enterKey);
                    });
                }
            });
        }
    }
})();
