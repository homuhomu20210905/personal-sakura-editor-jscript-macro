(function(){
    util = {}
    
    util.topUpper = function(value){
        var head = value.subString(0,1).toUpperCase();
        var body = value.substring(1,value.length);
        return head + body;
    }
    util.topLower = function(value){
        var head = value.subString(0,1).toLowerCase();
        var body = value.substring(1,value.length);
        return head + body;
    }
        
    var caseType = function(value,topUpper){
        var arrayParam = value.split("_");
        var strResult = "";
        for (var i = 0; i < arrayParam.length; i++) 
        {
            if (arrayParam[i] != "" && arrayParam[i] != null && typeof arrayParam[i] !== "undefined") 
            {
                var head = arrayParam[i].substring(0, 1).toUpperCase()
                if(topUpper && i == 0){
                    head = head.toLowerCase();
                }
                
                var inner = arrayParam[i].substring(1, (arrayParam[i].length)).toLowerCase();
                strResult += head + inner;
            }
        }
        return strResult;
    }
    util.camel = function(value){
        return caseType(value,true);
    }
    util.pascal = function(value){
        return caseType(value,false);
    }
    util.snake = function(value){
        return value.substring(0, 1) + value.substring(1).replace(/([A-Z])/g, "_$1");
    }
    util.setter = function(value){
        return "set" + util.pascal(value);
    }
    util.getter = function(value){
        return "get" + util.pascal(value);
    }
    
    util.convertMember = function(value){
        var obj = {};
        obj.camel  = util.camel(value);
        obj.pascal = util.pascal(value);
        obj.set    = util.setter(value);
        obj.get    = util.getter(value);
        return obj;
    }

})();