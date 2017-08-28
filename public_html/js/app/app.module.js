(function ()
{
    "use strict";
    // Lade alle abhängigen Module (dependencies)
    angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'app.views', 'pFile']);

    // AngularJS bootstrap an Dokument binden; Alternativ zu ng-app='app' in der index.html
    angular.element(document).ready(function () {
        console.log("document ready. starting angular.bootstrap", new Date());
        angular.bootstrap(document, ['app']);
    });
})();