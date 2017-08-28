(function () {
    "use strict";
    
    angular.module('app.files')
            .config(FilesRouteConfiguration);
    
    FilesRouteConfiguration.$inject = ['$routeProvider'];
    
    function FilesRouteConfiguration($routeProvider)
    {
         $routeProvider.when('/files', {
            templateUrl: 'views/files/files.view.html',
            controller: 'FilesController',
            controllerAs: 'fvm',
            reloadOnSearch: false
        });
    }
    
})();