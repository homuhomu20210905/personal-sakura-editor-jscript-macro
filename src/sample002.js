eval(Editor.GetCookie("document","module"))
module.load("original");
module.load("util");
module.load("JSON");
module.load("Array");

// sample code
Sakura()
.dataSet(function(self){
    //(this)self.[�ϐ���] = [�����l]�Œ�`�\�B
    this.result = [];
    self.result.push("dataSet-first");
})
.filter(function(line,no,origin){
    return true;
})
.map(function(line,no,origin){
    return line;
})
//�s�P��loop
.lines(function(line,no,origin){//this.[�ϐ���]��self�I�u�W�F�N�g�ɃA�N�Z�X�\
    this.result.push("lines-loop" + no);
})
.result(function(self){
    //(this)self.[�ϐ���]�Œ�`�����ϐ��̎󂯎�肪�\�B
    self.result.push("result-end");
    this.result.forEach(function(value){
    	puts(value);
    });
    echo(JSON.stringify(this.result,null,3));
})


// ..\data\sampledata.txt���J���Ď��s����ƈȉ��̒l�ɂȂ�܂��B
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
