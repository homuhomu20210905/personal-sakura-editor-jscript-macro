/**
* GitのターミナルCommandを使って実行するため、
* Gitがインストールされていない場合はエラーになります。
* インストール先が違っていてもNGです。
*/
(function(){
    Linux = {};
    
    var PATH = "C:\\Program Files\\git\\usr\\bin\\"
    var shell = new ActiveXObject("WScript.Shell");
    
    //GitのターミナルCommandがある場所で実行する。
    var cmdLap = function(value){
        return "cmd /c (cd " + Linux.setDbl(PATH) + ") && (" + value + ")"
    }
    
    Linux.exec = function(command){
      var cmd = cmdLap(command);
      var res = shell.Exec(cmd);
      return res.StdOut.ReadAll();;
    }
    
    Linux.setDbl = function(value){
        return '"' + value + '"';
    }
    
    Linux.bindList = function(){
        var list = []
        return {
            add:function(key,value){
                list.push({key:key,value:value});
            },
            result:function(){
                return list;
            }
        }
    }
    
    Linux.loadBind = function(command,bindList){
        var temp = command;
        var binds = bindList.result();
        for(var i=0;i < binds.length;i++){
            var obj = binds[i];
            if(temp.indexOf("${" + obj.key +"}") >= 0){
                temp = temp.split("${" + obj.key +"}").join(obj.value)
            }
        }
        return temp;
    }
})();