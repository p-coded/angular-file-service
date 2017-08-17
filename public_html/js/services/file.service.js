(function () {
    "use strict";
    angular.module('pFile.services')
            .factory('FileService', FileService);

    FileService.$inject = ['$http', '$log', '$q', '$uibModal', 'MyBase64'];

    function FileService($http, $log, $q, $uibModal, MyBase64)
    {
        var FileObj = FileObj;

        var fileImportModal = $uibModal;
        var fileInfoModal = $uibModal;
        var fileManagementModal = $uibModal;

        var files = new Array();

        var service = {
            getFiles: getFiles,
            setFiles: setFiles,
            addFiles: addFiles,
//            files: files,
            getFileData: getFileData,
            readFileAsDataURL: readFileAsDataURL,
            readFileAsBinaryString: readFileAsBinaryString,
            readFileAsArrayBuffer: readFileAsArrayBuffer,
            openFileImportModal: openFileImportModal,
            openFileInfoModal: openFileInfoModal,
            openFileManagementModal: openFileManagementModal,
            repair: repairFile,
            saveToFile: saveToFile
        };

        return service;
        //////////////////////////////////////////////////////

        function setFiles(f) {
            if (angular.isArray(f))
                files = f;
        }

        function addFiles(f)
        {
            if (angular.isDefined(f) && angular.isArray(f))
                for (var i = 0; i < f.length; i++)
                {
                    files.push(f[i]);
                }
        }

        function getFiles() {
            return files;
        }

        function getFileData(file)
        {
            var url = file;
            var config = {
                url: url,
                method: 'GET',
                headers: {
                    "Authorization": undefined
                }
            };

            return $http(config)
                    .then(function success(response) {
                        return response;
                    }, function error(response) {
                        $log.debug("FAILED", response);
                        return $q.reject(response);
                    })
                    .catch(function (e) {
                        $log.debug("FEHLER", file);
                        var newMessage = 'XHR Failed for getFile';

                        if (e.data && e.data.description) {
                            newMessage = newMessage + '\n' + e.data.description;
                            e.data.description = newMessage;
                        }

                        return $q.reject(e);
                    });
        }

        function readFileAsDataURL(file)
        {
            var deferred = $q.defer();
            deferred.notify('read file as data url');
            var reader = new FileReader();
            reader.onloadstart = function (evt)
            {
                // Vorgang gestartet
            };

            reader.onloadend = function (evt)
            {
                if (evt.target.readyState === FileReader.DONE)
                {
                    var fileObj = new FileObj(file, reader.result);
                    deferred.resolve(fileObj);
                }
            };

            reader.onerror = function (evt)
            {
                deferred.reject("error reading file as data url", reader.result);
            };
            reader.readAsDataURL(file);
            return deferred.promise;
        }

        function readFileAsBinaryString(file)
        {
            var deferred = $q.defer();

            var start = 0;
            var stop = file.size - 1;
            var blob = file.slice(start, stop + 1);

            deferred.notify('read file as binary string');

            var reader = new FileReader();
            reader.onloadstart = function (evt)
            {
                // Vorgang gestartet
            };
            reader.onloadend = function (evt)
            {
                if (evt.target.readyState === FileReader.DONE)
                {
                    var fileObj = new FileObj(file, reader.result);
                    deferred.resolve(fileObj);
                }
            };
            reader.onerror = function (evt)
            {
                deferred.reject("error reading file as binary string", reader.result);
            };
            reader.readAsBinaryString(blob);
            return deferred.promise;
        }

        /**
         * NOT YET IMPLEMENTED! Tests durchführen
         * @param {type} arrayBuffer
         * @returns {.$q@call;defer.promise}
         */
        function readFileAsArrayBuffer(arrayBuffer)
        {
            var deferred = $q.defer();

            var blob = new Blob(arrayBuffer, {type: 'application/octet-binary'});
            var url = URL.createObjectURL(blob);

            deferred.notify('read file as array buffer');

            var reader = new FileReader();

            reader.onloadstart = function (evt)
            {
                // Vorgang gestartet
            };

            reader.onloadend = function (evt)
            {
                if (evt.target.readyState === FileReader.DONE)
                {
                    var fileObj = new FileObj(undefined, reader.result);
                    deferred.resolve(fileObj);
                }
            };

            reader.onerror = function (evt)
            {
                deferred.reject("error reading file as array buffer", reader.result);
            };

            reader.readAsArrayBuffer(blob);
            return deferred.promise;

        }

        function repairFile(file)
        {
            var f = new FileObj(file.properties, file.original.data);
            return f;
        }

        /////////////////////////////////////////////////////////////////////////////////////////////

        function openFileImportModal(allowedTypes, allowedExtensions)
        {
            return fileImportModal.open({
                templateUrl: "js/controllers/file-import-modal.controller.html",
                controller: "FileImportModalController",
                backdrop: 'static',
                resolve: {
                    allowedFileTypes: function () {
                        return allowedTypes;
                    },
                    allowedFileTypeExtensions: function () {
                        return allowedExtensions;
                    }
                },
                size: "lg",
                controllerAs: 'fivm',
                bindToController: true
            }).result
                    .then(function (response) {
                        //SUCCESS
                        return response;
                    }, function (response) {
                        // ERROR
                        return $q.reject(response);
                    });
        }

        function openFileInfoModal(file)
        {
            return fileInfoModal.open({
                templateUrl: "js/controllers/file-info-modal.controller.html",
                controller: "FileInfoModalController",
                resolve: {
                    file: function () {
                        return file;
                    }
                },
                controllerAs: 'fivm',
                bindToController: true
            }).result
                    .then(function (response) {
                        //SUCCESS
//                        $log.debug("Modal (OK): ", response);
                    }, function (response) {
                        // ERROR
//                        $log.debug("Modal (ER): ", response);
                    });
        }

        function openFileManagementModal(files)
        {
            return fileManagementModal.open({
                size: "lg",
                templateUrl: "js/controllers/file-management-modal.controller.html",
                controller: "FileManagementModalController",
                resolve: {
                    files: function () {
                        return files || [];
                    }
                },
                controllerAs: 'fmvm',
                bindToController: true
            }).result
                    .then(function (response) {
                        //SUCCESS
//                        $log.debug("Modal (OK): ", response);
                    }, function (response) {
                        // ERROR
//                        $log.debug("Modal (ER): ", response);
                    });
        }

        function saveToFile(obj) {
            var filename;
            var ok = false;
            do
            {
                var name = prompt("Dateiname");
                if (name !== null && name !== "")
                {
                    filename = name;
                    ok = true;
                } else
                {
                    if (confirm(" 'my-export.json' verwenden [OK] | Speichervorgang abbrechen [ABBRECHEN]"))
                    {
                        ok = true;
                        filename = 'my-export';
                    } else
                    {
                        return;
                    }
                }
            } while (!ok)

            filename += "_" + (new Date()).getTime() + ".json";
            if (typeof obj === 'object')
            {
                var data = JSON.stringify(obj, undefined, 2);
            }

            var blob = new Blob([data], {type: 'text/json'});
            var e = document.createEvent('MouseEvents');
            var a = document.createElement('a');
            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        }


        function FileObj(File, data)
        {
            var lastDotIndex;
            var dataType;

            //Datentyp der ausgewählten Datei herausfiltern
            if (angular.isDefined(File))
            {
                if (angular.isDefined(File.name))
                {
                    lastDotIndex = File.name.toString().lastIndexOf('.') + 1;
                    dataType = File.name.toString().slice(lastDotIndex, File.name.length);
                }
            }

            var pub = {
                original: {
                    data: data
                },
                data: data,
                properties: {
                    name: (angular.isDefined(File)) ? File.name : undefined,
                    size: (angular.isDefined(File)) ? File.size : undefined,
                    type: (angular.isDefined(File)) ? File.type : undefined,
                    dataType: dataType || undefined,
                    lastModified: (angular.isDefined(File)) ? File.lastModified : undefined,
                    uploaded: (new Date()).getTime()
                },
                setData: setData,
                setProperties: setProperties,
                isImage: isImage,
                isJson: isJson,
                isText: isText
            };

            return pub;

            ///////////////////////////////////////////////////////////////////////////////////////////

            function setData(data)
            {
                this.data = data;
            }

            function setProperties(properties)
            {
                for (var prop in properties)
                {
                    if (this.properties[prop] && angular.isDefined(this.properties[prop]))
                    {
                        this.properties[prop] = properties[prop];
                    }
                }
            }

            function isImage()
            {
                if (this.properties.type === 'image/png' || this.properties.type === 'image/jpeg')
                    return true;
                return false;
            }

            function isJson()
            {
                if (this.properties.type === 'application/json' || this.properties.dataType === 'json')
                    return true;
                return false;
            }

            function isText()
            {
                if (this.properties.type === 'plain/text' || this.properties.dataType === 'txt')
                    return true;
                return false;
            }
        }
    }

})();