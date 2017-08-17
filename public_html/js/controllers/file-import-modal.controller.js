(function () {
    "use strict";

    angular.module('pFile')
            .controller('FileImportModalController', FileImportModalController);

    FileImportModalController.$inject = ['$log', '$scope'];

    function FileImportModalController($log, $scope)
    {
        var vm = this;

        vm.importedFilesArray = [];

        vm.allowedFileTypes = undefined;
        vm.allowedFileTypeExtensions = undefined;

        vm.removeFileFromArray = removeFileFromArray;
        vm.importSelectedFiles = importSelectedFiles;
        vm.storeImportedFilesAndCloseModal = storeImportedFilesAndCloseModal;
        vm.emptyImportedFiles = emptyImportedFiles;
        vm.closeModal = closeModal;

        //////////////////////////////////////////////////////////////////////////////////////////
        (function init()
        {
            // Init something
            vm.allowedFileTypes = $scope.$resolve.allowedFileTypes;
            vm.allowedFileTypeExtensions = $scope.$resolve.allowedFileTypeExtensions;
            $log.debug("Data", $scope.$resolve);

        })();
        //////////////////////////////////////////////////////////////////////////////////////////

        function removeFileFromArray(file)
        {
            var idx = vm.importedFilesArray.indexOf(file);
            vm.importedFilesArray.splice(idx, 1);
        }

        function importSelectedFiles(files)
        {
            for (var file in files)
            {
                vm.importedFilesArray.push(files[file]);
            }
        }

        function storeImportedFilesAndCloseModal()
        {
            vm.closeModal();
        }


        function emptyImportedFiles()
        {
            vm.importedFilesArray = [];
        }

        function closeModal()
        {
            vm.$close(vm.importedFilesArray);
        }
    }
})();
