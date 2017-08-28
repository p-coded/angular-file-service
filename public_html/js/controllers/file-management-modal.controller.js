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
            setFiles($scope.$resolve.files);
        })();

        /////////////////////////////////////////////////////////////////////////////////////////////////////
        
        function setFiles(files)
        {
            vm.files = files;
        }
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////

        function closeModal()
        {
            // evtl. Rückggabewert
            vm.$close("Close Modal");
        }
    }
})();