(function () {
    "use strict";

    angular.module('app')
            .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['$log', '$scope', '$location', '$interval'];

    function NavigationController($log, $scope, $location, $interval) {

        var vm = this;

        var resetActiveClass = resetActiveClass;
        vm.pathSearchValue = "";
        vm.changeLocation = changeLocation;
        vm.changeLocationPath = changeLocationPath;

        vm.activeHome = undefined;

        //////////////////////////////////////////////////////////////////////////////////////

        (function init()
        {
            resetActiveClass();
        })();

        //////////////////////////////////////////////////////////////////////////////////////

        function changeLocation(path)
        {
            $location.path(path);
        }

        function changeLocationPath()
        {
            $location.path(vm.pathSearchValue);
        }

        function resetActiveClass()
        {
            vm.activeHome = undefined;
        }

        //////////////////////////////////////////////////////////////////////////////////////

        // Reaktion auf Änderungen im Routing zur Formatierung der Menüelemente        
        $scope.$root.$on('$routeChangeSuccess', function (event, curr, prev)
        {
            vm.pathSearchValue = $location.path();
            resetActiveClass();

            if (curr.$$route)
            {
                if (curr.originalPath === '/home')
                {
                    vm.activeHome = 'active';
                }
            }
        });
    }
})();
