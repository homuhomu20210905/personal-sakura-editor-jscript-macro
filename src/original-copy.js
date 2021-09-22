eval(Editor.GetCookie("document","module"))
module.load("original");
module.load("util");


var text = util.template(function(){/*
eval(Editor.GetCookie("document","module"))
module.load("original");
module.load("util");


// sample code
Sakura()
.dataSet(function(self){
    //self.[変数名] = [初期値]で定義可能。
})
.filter(function(line,no,origin){
    return true;
})
.map(function(line,no,origin){
    return line;
})
//行単位loop
.lines(function(line,no,origin){//this.[変数名]でselfオブジェクトにアクセス可能
    puts(line);
})
//配列取得
//.lineAll(function(lines,obj){ // obj => {line:strLine,no:i+1,origin:origin}
//    puts(lines.join("\n"));
//})
.result(function(self){
    //self.[変数名]で定義した変数の受け取りが可能。
})


*/})

Editor.InsText(text);
