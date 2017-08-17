"use strict";

(function ()
{
    // Lade alle abhängigen Module (dependencies)
    angular.module('pFile', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'pFile.filter', 'pFile.services', 'pFile.views']);

    
    // AngularJS bootstrap an Dokument binden; Alternativ zu ng-app='app' in der index.html
    angular.element(document).ready(function () {
        console.log("document ready. starting angular.bootstrap", new Date());
        angular.bootstrap(document, ['pFile']);
    });
})();