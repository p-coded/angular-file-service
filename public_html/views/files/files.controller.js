(function () {
    "use strict";
    angular.module('pFile.files')
            .controller('FilesController', FilesController);

    FilesController.$inject = ['$log', '$scope', 'FileService', '$uibModal'];
    function FilesController($log, $scope, FileService, $uibModal) {

        var vm = this;

        vm.files = undefined;
        vm.openFileImportModal = openFileImportModal;

        //////////////////////////////////////////////////////////////////////////////////////

        (function init()
        {
            vm.files = FileService.getFiles();
        })();

        //////////////////////////////////////////////////////////////////////////////////////        

        function openFileImportModal()
        {
            FileService.openFileImportModal()
                    .then(function (result) {
                        FileService.addFiles(result);
                    });
        }
    }
})();
