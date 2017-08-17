(function () {
    "use strict";

    angular.module('pFile.demo')
            .config(DemoRouteConfiguration);

    DemoRouteConfiguration.$inject = ['$routeProvider'];

    function DemoRouteConfiguration($routeProvider)
    {
        $routeProvider
                .when('/demo', {
                    controller: 'DemoController',
                    templateUrl: 'views/demo/demo.view.html',
                    controllerAs: 'vm'
                })
                .when('/', {
                    redirectTo: '/demo'
                });
    }

})();