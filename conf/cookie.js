var readAll = function(filePath,charset){
  var adTypeText = 2;
  var adReadAll = -1; //全行モード
  var adCRLF = -1;
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

function setCookieData(keyId,data){
    var result = Editor.SetCookie("document",keyId,data);
    if(result != 0){
        throw new Error("set cookie Error!! result=" + result);
    }
}
// load用モジュール
setCookieData("module",readAll("C:/work/tool/sakura/conf/module.js"));

// 共通関数モジュール
setCookieData("original","C:/work/tool/sakura/common/original.js");
setCookieData("util","C:/work/tool/sakura/common/util.js");
setCookieData("_","C:/work/tool/sakura/extLib/Underscore.js");
setCookieData("_str","C:/work/tool/sakura/extLib/Underscore.string.js");
