(function () {
    "use strict";

    angular.module('pFile')
            .controller('FileInfoModalController', FileInfoModalController);

    FileInfoModalController.$inject = ['$log', '$scope', '$timeout', 'FileService'];

    function FileInfoModalController($log, $scope, $timeout, FileService)
    {
        var vm = this;
        vm.file;
        vm.closeModal = closeModal;

        (function init()
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
                    }
                }
            });
        })();
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////

        function closeModal()
        {
            vm.$close("Close Modal");
        }
    }
})();