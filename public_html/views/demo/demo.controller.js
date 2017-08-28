(function () {
    "use strict";

    angular.module('app.demo')
            .controller('DemoController', DemoController);

    DemoController.$inject = ['$log', '$scope', '$rootScope', 'FileService'];

    function DemoController($log, $scope, $rootScope, FileService)
    {
        var vm = this;
        vm.title = "Meine Anwendung";
        vm.data = undefined;
        vm.openModal = openModal;
        vm.save = save;

        //////////////////////////////////////////////////////////////////////////////////////

        (function init()
        {

        })();

        //////////////////////////////////////////////////////////////////////////////////////
        function save(data) {
            vm.data = data;
            for(var obj in data)
            {
                FileService.getFiles().push(data[obj]);
            }
        }

        function openModal()
        {
            FileService.openFileManagementModal(FileService.getFiles());
        }
    }
})();
