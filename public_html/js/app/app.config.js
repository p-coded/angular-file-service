(function () 
{
    "use strict";
    angular.module('app')
            .config(AppConfiguration)
            .run(AppRun);

    AppConfiguration.$inject = ['$locationProvider', '$logProvider', '$compileProvider'];
    AppRun.$inject = ['$log', '$rootScope'];

    function AppConfiguration($locationProvider, $logProvider, $compileProvider) {
        // https://docs.angularjs.org/guide/$location
        // html5Mode in Kombination mit dem base-Tag <base href="/"> im <head> der index.html
        $locationProvider.html5Mode({enabled: false});

        // Angular doesn't add scope related properties and css classes to DOM elements
        $compileProvider.debugInfoEnabled(false);

        // Log-Debug Mode aktivieren/deaktivieren
        $logProvider.debugEnabled(true);
    }

    function AppRun($log, $rootScope) {
        $rootScope.config = {
            templates: {
                app: {
                    navigation: "templates/navigation.template.html"
                }
            }
        };
    }
})();