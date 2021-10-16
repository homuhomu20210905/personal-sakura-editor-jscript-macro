eval(Editor.GetCookie("document","module"))
module.load("original");
module.load("JSON");

// sample code
Sakura()
//”z—ñŽæ“¾
.lineAll(function(lines,obj){ // obj => {line:strLine,no:i+1,origin:origin}
    puts(JSON.stringify(lines,null,3));
    puts("---------------------------");
    puts(JSON.stringify(obj));
})
