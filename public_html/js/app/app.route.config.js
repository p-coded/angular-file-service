(function () 
{
    "use strict";
    angular.module('app')
            .config(AppRoutingConfiguration);

    AppRoutingConfiguration.$inject = ['$routeProvider'];

    function AppRoutingConfiguration($routeProvider)
    {
        $routeProvider.otherwise({
            templateUrl: 'views/404.html',
            reloadOnSearch: false
        });
    }
})();