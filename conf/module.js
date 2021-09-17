(function(){
    module = {}

    var adTypeText = 2;
    var adReadAll = -1; //全行モード
    var adReadLine = -2; //行単位モード
    var adCRLF = -1;
    module.load = function(keyId){
        var filePath = Editor.GetCookie("document",keyId);
        if(!filePath){
            throw new Error("failed to load module!!["  + keyId + "]");
        }
        eval(module.readAll(filePath));
    }
    
    /**
    *   全行取得 
    *   KB単位のファイルに使用。
    **/
    module.readAll = function(filePath,charset){
      var stream = new ActiveXObject("ADODB.Stream");
      stream.type = adTypeText;
      stream.charset = charset || 'Shift-jis';
      stream.LineSeparator = adCRLF;
      stream.open();
      stream.loadFromFile(filePath);
      try{
          var text = stream.readText(adReadAll);
      }finally{
          stream.close();
      }
      return text;
    }

    /**
    * 行単位に取得
    * 大容量でも処理可能
    */
    module.readLines = function(filePath,charset,callBack) {
      var stream = new ActiveXObject("ADODB.Stream");
      stream.type = adTypeText;
      stream.charset = charset || 'Shift-jis';
      stream.open();
      stream.LineSeparator = adCRLF;
      stream.loadFromFile(filePath);
      try{
          var count = 1; // 行番号
          while (!stream.EOS) {
            callBack(stream.readText(adReadLine),count++);
          }
      }finally{
          stream.close();
      }
    }
})();