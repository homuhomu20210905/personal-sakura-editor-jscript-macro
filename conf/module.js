(function(){
    module = {}

    var adTypeText = 2;
    var adReadAll = -1; //�S�s���[�h
    var adReadLine = -2; //�s�P�ʃ��[�h
    var adCRLF = -1;
    module.load = function(keyId){
        var filePath = Editor.GetCookie("document",keyId);
        if(!filePath){
            throw new Error("failed to load module!!["  + keyId + "]");
        }
        eval(module.readAll(filePath));
    }
    
    /**
    *   �S�s�擾 
    *   KB�P�ʂ̃t�@�C���Ɏg�p�B
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
    * �s�P�ʂɎ擾
    * ��e�ʂł������\
    */
    module.readLines = function(filePath,charset,callBack) {
      var stream = new ActiveXObject("ADODB.Stream");
      stream.type = adTypeText;
      stream.charset = charset || 'Shift-jis';
      stream.open();
      stream.LineSeparator = adCRLF;
      stream.loadFromFile(filePath);
      try{
          var count = 1; // �s�ԍ�
          while (!stream.EOS) {
            callBack(stream.readText(adReadLine),count++);
          }
      }finally{
          stream.close();
      }
    }
})();