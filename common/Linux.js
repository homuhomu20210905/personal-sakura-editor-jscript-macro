/**
* Git�̃^�[�~�i��Command���g���Ď��s���邽�߁A
* Git���C���X�g�[������Ă��Ȃ��ꍇ�̓G���[�ɂȂ�܂��B
* �C���X�g�[���悪����Ă��Ă�NG�ł��B
*/
(function(){
    Linux = {};
    
    var PATH = "C:\\Program Files\\git\\usr\\bin\\"
    var shell = new ActiveXObject("WScript.Shell");
    
    //Git�̃^�[�~�i��Command������ꏊ�Ŏ��s����B
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