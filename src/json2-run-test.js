eval(Editor.GetCookie("document","module"))
module.load("original");
module.load("util");
module.load("JSON");
module.load("Array");

// sample code
Sakura()
//.dataSet(function(self){
//    //self.[�ϐ���] = [�����l]�Œ�`�\�B
//})
.filter(function(line,no,origin){
    return line.indexOf("\t") >= 0;
})
.map(function(line,no,origin){
    return {line:line,no:no,origin:origin};
})
//�s�P��loop
//.lines(function(line,no,origin){//this.[�ϐ���]��self�I�u�W�F�N�g�ɃA�N�Z�X�\
//    puts(line);
//})
//�z��擾
.lineAll(function(lines){ 
    lines.forEach(function(obj){
        puts(JSON.stringify(obj,null,2));
    });
})
//.result(function(self){
//    //self.[�ϐ���]�Œ�`�����ϐ��̎󂯎�肪�\�B
//})

