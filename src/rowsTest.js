eval(Editor.GetCookie("document","module"))
module.load("original");
module.load("util");
module.load("JSON");

// sample code
//Sakura()
//.rows(2,function(columns){
//    puts(columns);
//})

puts("--------------------");

Sakura()
.rowAll(2,function(rows){
    puts(JSON.stringify(rows,null,3));
})

