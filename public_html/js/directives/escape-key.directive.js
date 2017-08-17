"use strict";
(function ()
{
    angular.module('pFile')
            .directive('escapeKey', ['$log', EscapeKeyDirective]);
    
    function EscapeKeyDirective($log)
    {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('keydown keypress', function (event) {
                    if (event.which === 27) { // 27 = esc key
                        scope.$apply(function () {
                            scope.$eval(attr.escapeKey);
                        });
                    }
                });
            }
        };
    }
})();
