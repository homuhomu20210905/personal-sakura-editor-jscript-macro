(function(){
    var splitValue = "\t"
    util = {}
    
    util.topUpper = function(value){
        var head = value.substring(0,1).toUpperCase();
        var body = value.substring(1,value.length);
        return head + body;
    }
    util.topLower = function(value){
        var head = value.substring(0,1).toLowerCase();
        var body = value.substring(1,value.length);
        return head + body;
    }
    //単語単位のコブ文字を生成
    var humpType = function(value,key){
        var arrayParam = value.split(key);
        var strResult = "";
        for (var i = 0; i < arrayParam.length; i++){
            var head = arrayParam[i].substring(0, 1).toUpperCase()
            var inner = arrayParam[i].substring(1, (arrayParam[i].length)).toLowerCase();
            strResult += head + inner;
        }
        return strResult;
    }
    
    util.isSnake = function(value){
        if(!util.isSplit(value)){
            return false;
        }
        return value.indexOf("_") >= 0;
    }
    util.isKebab = function(value){
        if(!util.isSplit(value)){
            return false;
        }
        return value.indexOf("-") >= 0;
    }
    
    util.isSplit = function(value){
        if(value.indexOf(splitValue) >= 0){
            return false;
        }
        return true;
    }
    util.isHump = function(value){
        if(!util.isSplit(value)){
            return false;
        }
        //大文字小文字が混在しているか
        return value.toUpperCase () != value && value.toLowerCase();
    }
    var humpCalc = function(value_,func){
        var value = value_;
        var snake = util.isSnake(value);
        var kebab = util.isKebab(value)
        if(snake || kebab){
            if(snake){
                value = humpType(value,"_");
            }
            if(kebab){
                value = humpType(value,"-");
            }
        } else {
            value = util.isHump(value) ? value : func(value.toLowerCase());
        }
        value = func(value)
        return value
    }
    var splitCalc = function(value,callBack){
        var list = value.split(splitValue);
        var result = [];
        for(var i=0;i < list.length;i++){
            // result.push(humpCalc(list[i],func));
            result.push(callBack(list[i]));
        }
        return result.join(splitValue);
    }
    
    util.camel = function(value){
        return splitCalc(value,function(value){
            return humpCalc(value,util.topLower);
        });
    }
    util.pascal = function(value){
        return splitCalc(value,function(value_){
            return humpCalc(value_,util.topUpper);
        });
    }
    util.snake = function(value){
        return splitCalc(value,function(value_){
            if(util.isSnake(value_)){
                return value_.toLowerCase()
            }else if(util.isKebab(value_)){
                return value.split("-").join("_").toLowerCase();
            }else{
                var tmpStr = value_.substring(0, 1) + value_.substring(1).replace(/([A-Z])/g, "_$1");
                return tmpStr.toLowerCase(); //　一旦小文字化してしまう
            }
        });
        
    }
    util.setter = function(value){
        return splitCalc(value,function(value_){
            return "set" + util.pascal(value_);
        });
    }
    util.getter = function(value){
        return splitCalc(value,function(value_){
            return "get" + util.pascal(value_);
        });
    }
    
    util.convertMember = function(value){
        var obj = {};
        obj.camel  = util.camel(value);
        obj.pascal = util.pascal(value);
        obj.snake  = util.snake(value);
        obj.set    = util.setter(value);
        obj.get    = util.getter(value);
        return obj;
    }
    
    util.template = function(obj){
        if(!(obj instanceof Function)){
            return null;
        }
        var list = obj.toString().split("\r\n");
        list.pop();
        list.shift();
        return list.join("\r\n")
    }

})();