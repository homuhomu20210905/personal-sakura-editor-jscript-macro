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

//iniファイルからマクロのHOME_DIRECTORYを取得
(function loadMacroHomeDir(){
    var SAKURA_INI_FILE = Editor.ExpandParameter("$I");
    var SAKURA_INI_PATH = SAKURA_INI_FILE.replace(/([A-Z]:.*\\).*/g,'$1');
    var MACRO_DIR_FILE = SAKURA_INI_PATH + "MACRO_DIR.ini"
    var fs = new ActiveXObject( "Scripting.FileSystemObject" );
    if(!fs.FileExists(MACRO_DIR_FILE)){
       var command = 'type "' + SAKURA_INI_FILE + '"|FINDSTR szMACROFOLDER>' + '"' + MACRO_DIR_FILE + '"';
       ExecCommand(command);
    }
    //変数取得
    var textObj = fs.OpenTextFile(MACRO_DIR_FILE.split("\\").join("/"),1);
    var value = textObj.ReadAll()
    value = value.split(/[\r\n]/g).join("")
               .replace("=",'="')
               .split("\\").join("/")
               + '"'
    eval(value);
    szMACROFOLDER = szMACROFOLDER.replace(/(.*)\//g,"$1");
})();

(function(){
    // load用モジュール
    setCookieData("module",readAll(szMACROFOLDER + "/conf/module.js"));

    // 共通関数モジュール
    setCookieData("original",szMACROFOLDER + "/common/original.js");
    setCookieData("util",szMACROFOLDER + "/common/util.js");
    setCookieData("_",szMACROFOLDER + "/extLib/Underscore.js");
    setCookieData("_str",szMACROFOLDER + "/extLib/Underscore.string.js");
})();
