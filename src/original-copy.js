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
    //self.[�ϐ���] = [�����l]�Œ�`�\�B
})
.filter(function(line,no,origin){
    return true;
})
.map(function(line,no,origin){
    return line;
})
//�s�P��loop
.lines(function(line,no,origin){//this.[�ϐ���]��self�I�u�W�F�N�g�ɃA�N�Z�X�\
    puts(line);
})
//�z��擾
//.lineAll(function(lines,obj){ // obj => {line:strLine,no:i+1,origin:origin}
//    puts(lines.join("\n"));
//})
.result(function(self){
    //self.[�ϐ���]�Œ�`�����ϐ��̎󂯎�肪�\�B
})


*/})

Editor.InsText(text);
