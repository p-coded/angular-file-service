(function () {
    "use strict";
    angular.module('pFile')
            .directive('fileManagement', FileManagementDirective);
    FileManagementDirective.$inject = ['$log'];
    function FileManagementDirective($log)
    {
        return {
            restrict: 'EA',
            replace: false,
            scope: {
                files: "=data"
            },
            templateUrl: "js/directives/file-management.directive.html",
            controller: FileManagementController,
            controllerAs: 'vm',
            bindToController: true,
            link: link
        };
        function link(scope, element, attrs, $ctrl) {

        }
    }

    FileManagementController.$inject = ['$log', 'FileService'];

    function FileManagementController($log, FileService)
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