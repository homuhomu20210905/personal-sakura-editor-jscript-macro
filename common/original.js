(function(){
    var startTime = (new Date()).getTime();
    Sakura = function(){
        if(!(this instanceof Sakura)){
            return new Sakura();
        }
        this.description = {};
    }
    
    puts = function(value){
        Editor.TraceOut(value);
        //常に表示
        Editor.ActivateWinOutput();
    }
        
    echo = function(value){
        Editor.TraceOut(value,0x02);
        //常に表示
        Editor.ActivateWinOutput();
    }
    Sakura.maxLineCount = function(){
        return Editor.GetLineCount(0) + 1;
    }
    
    Sakura.prototype.filter = function(callBack){
        if(callBack instanceof Function){
            this.description.filter = callBack;
        }
        return this;
    }
    Sakura.prototype.map = function(callBack){
        if(callBack instanceof Function){
            this.description.map = callBack;
        }
        return this;
    }

        
    function linesLoop(start,end,self,callBack){
        if(!self){
            self = {"description":{}}
        }
        var filter = self.description.filter || null;
        var map    = self.description.map || null;
        for(var i=start;i < end;i++){
            var origin = Editor.GetLineStr(i);
            var strLine = origin.split(/[\r\n]/g).join('')
            // var crlf = origin.replace(strLine,'');
            if(filter && filter.call(self.description,strLine,i,origin) === false){
                continue;
            }
            if(!map){
                if(callBack.call(self.description,strLine,i,origin) === false){
                    break;
                }
            }else{
                var value = map(strLine,i,origin)
                if(callBack.call(self.description,value,i,origin) === false){
                    break;
                }
            }
        }
    }
    Sakura.prototype.lines = function(callBack){
        var maxCount = Sakura.maxLineCount();
        var self = this;
        linesLoop(1,maxCount,self,function(strLine,i,origin){
            var res = callBack.call(self.description,strLine,i,origin);
            if(res === false){
                return false;
            }
        });
        return this;
    }
    
    Sakura.prototype.lineAll = function(callBack){
        var result = [];
        var others = [];
        this.lines(function(strLine,i,origin){
             result.push(strLine);
             others.push({line:strLine,no:i+1,origin:origin});
        });
        callBack(result,others);
        return this;
    }
    
    var newList = function(list){
        var res = [];
        for(var i=0;i < list.length;i++){
            res.push(list[i]);
        }
        return res;
    }
    
    Sakura.prototype.rows = function(no,callBack){
        var columns = [];
        var others = [];
        this.lines(function(strLine,i,origin){
            columns.push(strLine);
            others.push({line:strLine,no:i+1,origin:origin});
            if(i % no == 0){
                callBack.call(this.description,newList(columns),newList(others));
                columns.length = 0;
                others.length = 0;
            }
        });
        if(columns.length > 0){
            for(var i=0;i < (no - columns.length);i++){
                columns.push("");
                others.push({line:"",no:-1,origin:null});
            }
            callBack.call(this.description,newList(columns),newList(others));
        }
        return this;
    }
    
    Sakura.prototype.rowAll = function(no,callBack){
        var res = [];
        var others = [];
        this.rows(no,function(columns_,others_){
            res.push(columns_);
            others.push(others_);
        });
        callBack.call(this.description,res,others);
        return this;
    }
    
    //JSON = {};
    //JSON.stringify = function(obj){
    //    var res = '';
    //    if(obj instanceof Array){
    //        if(obj.length == 0){
    //            return "[]";
    //        }
    //        res = "[";
    //        for(var i=0;i < obj.length;i++){
    //            res += JSON.stringify(obj[i]) + ',';
    //        }
    //        return res.substring(0,res.length - 1) + "]";
    //    }else if(obj instanceof Function){
    //        return obj.toString();
    //    }else if(obj instanceof Object){
    //        res = "{"
    //        for(var key in obj){
    //            res += '"' + key + '"' + ":" + JSON.stringify(obj[key]) + ",";
    //        }
    //        return res.substring(0,res.length - 1) + "}";
    //    } else {
    //        if(typeof obj == "string"){
    //            return '"' + obj + '"';
    //        }else if(obj){
    //            return obj;
    //        }else if( obj === undefined){
    //            return undefined;
    //        }else if( obj === null){
    //            return null;
    //        } 
    //    }
    //}
    //JSON.parse = function(value){
    //   var func = new Function("return " + value);
    //   return func();
    //}

    var setDescription = function(callBack){
        callBack.call(this.description,this.description);
        return this;
    }

    //変数定義をローカルで完結させる為の呼び出し。
    Sakura.prototype.dataSet = setDescription
    Sakura.prototype.result  = setDescription

    Sakura.getRunningTimeMs = function(){
        var endTime = (new Date()).getTime();
        return endTime - startTime;
    }
    
    Sakura.putsRunningTime = function(){
        var second = Math.round(Sakura.getRunningTimeMs() / 100) / 10;
        puts("処理時間：" + second + "秒");
    }
    
    var map = function(values,callBack){
        var res = []
        for(var i=0;i  < values.length;i++){
            res.push(callBack(values[i],i,values));
        }
        return res;
    }
    Sakura.cursorCreateMenu = function(values){
        var names = map(values,function(value){
            return value.split(",").join("、");//表示時に半角カンマは使えないため全角にしておく。
        });
        var atai = Editor.CreateMenu(1,names.join(","));
        
        if(atai == "0"){
            return null;
        }
        return {value:atai -1,name:values[atai -1]}
    }
})()
