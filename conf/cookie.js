var szMACROFOLDER = null
var readAll = function(filePath,charset){
  var adTypeText = 2;
  var adReadAll = -1; //�S�s���[�h
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

/*
* �}�N���̃z�[���f�B���N�g�����擾����
* ���̃}�N���̔z�u���Ă���P�K�w����擾��ini�t�@�C���ɏ����o���B
*/
function loadMacroHomeDir(){
    var cookie = Editor.getCookie("document","szMACROFOLDER")
    if(cookie){
       //���g�̃t�@�C�����J���������ꍇ�̂ݎ擾�\�B(�^�u�ʊǗ��j
       szMACROFOLDER = cookie;
       return;
    }
    var SAKURA_INI_FILE = Editor.ExpandParameter("$I");
    var SAKURA_INI_PATH = SAKURA_INI_FILE.replace(/([A-Z]:.*\\).*/g,'$1');
    var MACRO_DIR_FILE = SAKURA_INI_PATH + "MACRO_DIR.ini"
    var fs = new ActiveXObject( "Scripting.FileSystemObject" );
    if(!fs.FileExists(MACRO_DIR_FILE)){
       var command = 'cd .. && (cd > "' + MACRO_DIR_FILE + '") && echo �����ݒ芮��(����ȍ~�͂��̏o�͍͂s���܂���B)'
       Editor.ExecCommand(command,0x01);
    }
    //�ϐ��擾
    var value = readAll(MACRO_DIR_FILE).split(/[\r\n]/g).join("")
                .split("\\").join("/")
    eval('szMACROFOLDER = "' + value + '"');
    szMACROFOLDER = szMACROFOLDER.substring(0,szMACROFOLDER.length);
    //cookie�̕ۑ�
    Editor.setCookie("document","szMACROFOLDER",szMACROFOLDER)
}

(function(){
    //�}�N���z�[���t�H���_�̎擾
    loadMacroHomeDir();
    // load�p���W���[��
    setCookieData("module",readAll(szMACROFOLDER + "/conf/module.js"));

    // ���ʊ֐����W���[��
    setCookieData("original",szMACROFOLDER + "/common/original.js");
    setCookieData("util",szMACROFOLDER + "/common/util.js");
    setCookieData("Linux",szMACROFOLDER + "/common/Linux.js");
    setCookieData("Random",szMACROFOLDER + "/common/Random.js");
    setCookieData("_",szMACROFOLDER + "/extLib/Underscore.js");
    setCookieData("_str",szMACROFOLDER + "/extLib/Underscore.string.js");
    setCookieData("JSON",szMACROFOLDER + "/extLib/json2.js");
    setCookieData("Array",szMACROFOLDER + "/extLib/Array-Polyfill.js");
    setCookieData("Array",szMACROFOLDER + "/common/Linux.js");
})();
