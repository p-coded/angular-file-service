(function () {
    "use strict";
    
    angular.module('pFile.directives')
            .directive('fileList', FileListDirective);
    
    FileListDirective.$inject = ['$log'];
    /*
     * Directive that shows a list of imported files and provides methods to view and delete imported Files
     */
    function FileListDirective($log)
    {
        return {
            restrict: 'EA',
            replace: false,
            scope: {
                files: "=data"
            },
            templateUrl: "js/directives/file-list.directive.html",
            controller: FileListController,
            controllerAs: 'vm',
            bindToController: true
        };

    }

    FileListController.$inject = ['$log', 'FileService'];

    function FileListController($log, FileService)
    {
        var vm = this;

        vm.getFileTypeIconClass = getFileTypeIconClass;
        vm.openFileInfoModal = FileService.openFileInfoModal;
        vm.removeFileFromArray = removeFileFromArray;
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        function removeFileFromArray(file)
        {
            var idx = vm.files.indexOf(file);
            vm.files.splice(idx, 1);
        }

        function getFileTypeIconClass(type)
        {
            switch (type)
            {
                case 'image/png':
                case 'image/jpeg':
                    return 'glyphicon-picture';
                case 'application/json':
                    return 'glyphicon-console';
                case 'application/html':
                case 'application/htm':
                    return 'glyphicon-globe';
                default:
                    return 'glyphicon-file';
            }
        }
    }
})();