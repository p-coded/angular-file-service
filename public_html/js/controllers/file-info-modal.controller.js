(function () {
    "use strict";

    angular.module('pFile')
            .controller('FileInfoModalController', FileInfoModalController);

    FileInfoModalController.$inject = ['$log', '$scope', 'FileService', '$timeout', 'MyBase64'];

    function FileInfoModalController($log, $scope, FileService, $timeout, MyBase64)
    {
        var vm = this;
        vm.file;
        vm.closeModal = closeModal;
        vm.decode = decode;

        (function activate()
        {
            vm.file = $scope.$resolve.file;
            $timeout(function () {

                if (vm.file && angular.isDefined(vm.file) && angular.isDefined(vm.file.data))
                {
                    switch (vm.file.properties.type)
                    {
                        case "text/plain":
                        case "application/json":
                            return FileService.getFileData(vm.file.data)
                                    .then(function successCallback(response) {
                                        /* Überschreiben des Base64-Streams mit dem eigentlichen Datei-Inhalt */
                                        vm.file.data = response.data;
                                        vm.file.isLoaded = true;
                                    }, function errorCallback(response) {
                                        $log.debug("Fehler beim Lesen der Datei", response);
                                    })
                                    .catch(function (e) {
                                        $log.debug("Bad data", vm.file);
                                    });
                        default:
                            $log.info("Datentyp wird verarbeitet ", vm.file.properties.type, vm.file.properties.dataType, vm.file);
                    }
                }
            });
        })();
        /////////////////////////////////////////////////////////////////////////////////////////////////////

        function closeModal()
        {
            vm.$close("Close Modal");
        }

        function decode(data)
        {
            return MyBase64.decode(data);
        }
    }
})();