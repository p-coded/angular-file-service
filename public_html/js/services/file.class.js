(function () {
    "use strict";

    angular.module('pFile.services')
            .run(Init);

    Init.$inject = [];

    function Init()
    {
        FileObj.prototype = {
            setData: setData,
            setProperties: setProperties,
            isImage: isImage,
            isJson: isJson,
            isText: isText
        };

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
})();

function FileObj(File, data)
{
    var lastDotIndex;
    var dataType;
    
    ///////////////////////////////////////////////////////////////////////////////
    
    if (angular.isDefined(File))
    {
        if (angular.isDefined(File.name))
        {
            lastDotIndex = File.name.toString().lastIndexOf('.') + 1;
            dataType = File.name.toString().slice(lastDotIndex, File.name.length);
        }
    }
    
    ///////////////////////////////////////////////////////////////////////////////

    this.original = {
        data: data
    };

    this.data = data;

    this.properties = {
        name: (angular.isDefined(File)) ? File.name : undefined,
        size: (angular.isDefined(File)) ? File.size : undefined,
        type: (angular.isDefined(File)) ? File.type : undefined,
        dataType: dataType || undefined,
        lastModified: (angular.isDefined(File)) ? File.lastModified : undefined,
        uploaded: (new Date()).getTime()
    };
}