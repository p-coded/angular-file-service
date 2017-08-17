(function () {
    "use strict";

    angular.module('pFile.filter')
            .filter('convertToMb', ConvertToMbFilter);

    function ConvertToMbFilter()
    {
        var filter = filter;

        function filter(fileSize)
        {
            var fileSizeInBytes = parseFloat(fileSize);
            var fileSizeInKiloBytes = parseFloat(fileSizeInBytes) / 1024.0;
            var fileSizeInMegaBytes = parseFloat(fileSizeInKiloBytes) / 1024.0;

            if (fileSizeInMegaBytes > 1)
            {
                return fileSizeInMegaBytes.toFixed(2) + ' MB';
            } else
            {
                if (fileSizeInKiloBytes > 1)
                {
                    return fileSizeInKiloBytes.toFixed(2) + ' KB';
                } else
                {
                    return fileSizeInBytes.toFixed(2) + ' B';
                }
            }
        }

        return filter;
    }
})();
