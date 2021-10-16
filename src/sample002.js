eval(Editor.GetCookie("document","module"))
module.load("original");
module.load("util");
module.load("JSON");
module.load("Array");

// sample code
Sakura()
.dataSet(function(self){
    //(this)self.[変数名] = [初期値]で定義可能。
    this.result = [];
    self.result.push("dataSet-first");
})
.filter(function(line,no,origin){
    return true;
})
.map(function(line,no,origin){
    return line;
})
//行単位loop
.lines(function(line,no,origin){//this.[変数名]でselfオブジェクトにアクセス可能
    this.result.push("lines-loop" + no);
})
.result(function(self){
    //(this)self.[変数名]で定義した変数の受け取りが可能。
    self.result.push("result-end");
    this.result.forEach(function(value){
    	puts(value);
    });
    echo(JSON.stringify(this.result,null,3));
})


// ..\data\sampledata.txtを開いて実行すると以下の値になります。
// dataSet-first
// lines-loop1
// lines-loop2
// lines-loop3
// lines-loop4
// lines-loop5
// lines-loop6
// lines-loop7
// lines-loop8
// lines-loop9
// result-end
// [
//    "dataSet-first",
//    "lines-loop1",
//    "lines-loop2",
//    "lines-loop3",
//    "lines-loop4",
//    "lines-loop5",
//    "lines-loop6",
//    "lines-loop7",
//    "lines-loop8",
//    "lines-loop9",
//    "result-end"
// ]
