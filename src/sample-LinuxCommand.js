eval(Editor.GetCookie("document","module"))
module.load("original");
//module.load("util");
module.load("Linux");

var logList = ["C:\\work\\dateWork\\2021\\202110\\1016\\system.log"]

var obj = Sakura.cursorCreateMenu(logList);
if(obj){
    var binds = Linux.bindList();
    binds.add("path",Linux.setDbl(obj.name));
    binds.add("limit",Editor.InputBox("Œ…”“ü—Í",1000));
    var cmd = Linux.loadBind("tail -${limit} ${path} | iconv -c -f utf-8 -t sjis",binds)
    var result = Linux.exec(cmd)
    puts(result);
}