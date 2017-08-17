(function () {
    "use strict";

    angular.module('pFile')
            .controller('FileManagementModalController', FileManagementModalController);

    FileManagementModalController.$inject = ['$log', '$scope'];

    function FileManagementModalController($log, $scope)
    {
        var vm = this;
        vm.files = undefined;
        
        (function init()
        {
            $log.debug("Scope", $scope);
            $log.debug("Vm", vm);
            setFiles($scope.$resolve.files);
            $log.debug("Files", vm.files);
        })();

        /////////////////////////////////////////////////////////////////////////////////////////////////////
        
        function setFiles(files)
        {
            vm.files = files;
        }
         

        /////////////////////////////////////////////////////////////////////////////////////////////////////

        function closeModal()
        {
            vm.$close("Close Modal");
        }

    }
})();