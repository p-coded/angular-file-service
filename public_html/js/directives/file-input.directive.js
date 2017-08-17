(function () {
    "use strict";
    angular.module('pFile')
            .directive('fileInput', FileInputDirective);
    FileInputDirective.$inject = ['$log'];
    function FileInputDirective($log)
    {
        return {
            restrict: 'EA',
            replace: false,
            scope: {
                linkedSave: "&save",
                allowedFileTypes: "=",
                allowedFileTypeExtensions: "="
            },
            templateUrl: "js/directives/file-input.directive.html",
            controller: FileInputController,
            controllerAs: 'vm',
            bindToController: true,
            link: link
        };
        function link(scope, element, attrs, $ctrl) {

            var input = angular.element(element).find("input");
            /////////////////////////////////////////////////////////////////////////////////////////

            input.on("change", function (evt) {
                $ctrl.loadFiles(evt.target.files);
            });
        }
    }

    FileInputController.$inject = ['$log', '$q', '$scope', '$element', '$timeout', 'FileService'];
    function FileInputController($log, $q, $scope, $element, $timeout, FileService)
    {
        var vm = this;
        var allowedFileTypes;
        var allowedFileTypeExtensions;
        var fileList;
        var badFileList;
        var processFiles = processFiles;
        var isAllowedFileType = isAllowedFileType;
        var isAllowedFileTypeExtension = isAllowedFileTypeExtension;
        vm.loadFiles = loadFiles;
        vm.getFileList = getFileList;
        vm.getBadFileList = getBadFileList;
        ////////////////////////////////////////////////////////////////

        (function init() {
            fileList = new Array();
            $timeout(function () {
                if (angular.isDefined(vm.allowedFileTypeExtensions))
                    allowedFileTypeExtensions = vm.allowedFileTypeExtensions;
                else
                    allowedFileTypeExtensions = ["json", "txt", "png", "jpeg", "jpg"];
                if (angular.isDefined(vm.allowedFileTypes))
                    allowedFileTypes = vm.allowedFileTypes;
                else
                    allowedFileTypes = [];

                $scope.types = "";
                for (var i = 0; i < allowedFileTypeExtensions.length; i++)
                {

                    if (allowedFileTypeExtensions[i].charAt(0) !== ".")
                        $scope.types += "." + allowedFileTypeExtensions[i].toString();
                    else
                        $scope.types += allowedFileTypeExtensions[i].toString();

                    if (i < allowedFileTypeExtensions.length - 1)
                        $scope.types += ",";
                }
            });
        })();
        ////////////////////////////////////////////////////////////////

        function loadFiles(fList)
        {
            fileList = new Array();
            badFileList = new Array();
            if (angular.isDefined(fList))
            {
                for (var i = 0; i < fList.length; i++)
                {
                    if (angular.isDefined(fList[i].type) && isAllowedFileType(fList[i].type) || isAllowedFileTypeExtension(getFileTypeExtension(fList[i].name)))
                        fileList.push(fList[i]);
                    else
                        badFileList.push(fList[i]);
                }
            }
            
            if (angular.isDefined(fileList))
            {
                processFiles(fileList)
                        .then(function (response) {
                            vm.linkedSave({files: response.data});
                            $timeout(function () {
                                var input = angular.element($element).find("input");
                                input.wrap('<form>').closest('form').get(0).reset();
                                input.unwrap();
                                badFileList = new Array();
                                fileList = new Array();
                            }, 100);
                        });
            }
        }

        function processFiles(fileList)
        {
            var deferred = $q.defer();
            deferred.notify('Load Files from FileInput');
            if (angular.isDefined(fileList) && fileList.length > 0)
            {
                var length = fileList.length;
                var importedFilesArray = new Array();
                for (var i = 0; i < fileList.length; i++)
                {
                    var promise = FileService.readFileAsDataURL(fileList[i]);
                    promise.then(function success(file) {
                        importedFilesArray.push(file);
                        checkReadyState();
                    }, function error() {
                        length--;
                        checkReadyState();
                    });
                }

                function checkReadyState()
                {
                    if (fileList.length === importedFilesArray.length)
                        deferred.resolve({data: importedFilesArray});
                }
            } else
            {
                deferred.reject({data: undefined, message: "No Files available"});
            }
            return deferred.promise;
        }

        function getFileList()
        {
            return fileList;
        }

        function getBadFileList()
        {
            return badFileList;
        }

        function getFileTypeExtension(filename)
        {
            if (angular.isDefined(filename))
            {
                var lastDotIndex = filename.toString().lastIndexOf('.') + 1;
                var extension = filename.toString().slice(lastDotIndex, filename.length);
                return extension;
            } else
            {
                return "";
            }
        }

        function isAllowedFileType(data)
        {
            var data = data.toString().toLowerCase();
            var b = (allowedFileTypes.indexOf(data) > -1) ? true : false;
            return b;
        }

        function isAllowedFileTypeExtension(data)
        {
            var data = data.toString().toLowerCase();
            var b = (allowedFileTypeExtensions.indexOf(data) > -1) ? true : false;
            return b;
        }

    }
})();