eval(Editor.GetCookie("document","module"))
module.load("original");
module.load("util");
module.load("JSON");
module.load("Array");

// sample code
Sakura()
//.dataSet(function(self){
//    //self.[変数名] = [初期値]で定義可能。
//})
.filter(function(line,no,origin){
    return line.indexOf("\t") >= 0;
})
.map(function(line,no,origin){
    return {line:line,no:no,origin:origin};
})
//行単位loop
//.lines(function(line,no,origin){//this.[変数名]でselfオブジェクトにアクセス可能
//    puts(line);
//})
//配列取得
.lineAll(function(lines){ 
    lines.forEach(function(obj){
        puts(JSON.stringify(obj,null,2));
    });
})
//.result(function(self){
//    //self.[変数名]で定義した変数の受け取りが可能。
//})

