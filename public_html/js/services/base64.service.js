(function () {
    "use strict";

    angular.module('pFile.services')
            .factory('MyBase64', MyBase64);

    MyBase64.$inject = ['$log'];

    function MyBase64($log)
    {
        var safelyParseJson = safelyParseJson;

        var service = {
            encode: encode,
            decode: decode
        };

        return service;

        ///////////////////////////////////////////////////////////////////////////////

        function encode(data)
        {
            try
            {
                if (angular.isObject(data))
                {
                    return btoa(JSON.stringify(data));

                } else if (angular.isString(data))
                {

                    return btoa(data);
                }
            } catch (e) {
                $log.debug("Failed to Encode Data", e.message);
            }
        }

        function decode(data)
        {
            if (angular.isDefined(data) && angular.isString(data))
            {
                var decoded = atob(data);
                var decodedObj = safelyParseJson(decoded);

                if (decodedObj && angular.isDefined(decodedObj))
                    return decodedObj;
                else
                    return decoded;
            }
        }

        function safelyParseJson(json) {
            // This function cannot be optimised, it's best to
            // keep it small!
            var parsed;

            try {
                parsed = JSON.parse(json);
            } catch (e) {
                // Oh well, but whatever...
//                $log.debug("Error occured", e.message, "\"" + json + "\"");
            }

            return parsed; // Could be undefined!
        }
    }

})();