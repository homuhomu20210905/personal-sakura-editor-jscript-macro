eval(GetCookie("document","module"))
module.load("original");
module.load("util");
module.load("_");


var tplMember = _.template(util.template(function(){/*
<%= comment %> 
private String <%= camel %>;
*/}));

// �e�[�u���̃J������񂩂�ϐ����𐶐��B
Sakura()
.filter(function(line,no,origin){
    //�]�v�ȃJ���������O
    return line.split("\t").length == 2;
})
.map(function(line,no,origin){
    var list = line.split("\t");
    //member�ϐ������ďo
    var member = util.convertMember(list[1]);
    member.comment = "/** " + list[0] + "*/";
    return member;
})
.lineAll(function(lines){
    _.each(lines,function(member){
        puts(tplMember(member));
    });
    
});


// ..\data\sampledata.txt���J���Ď��s����ƈȉ��̒l�ɂȂ�܂��B
// /** �ڋqID*/ 
// private String customerId;
// /** �ڋq��*/ 
// private String customerName;
// /** �X�֔ԍ�*/ 
// private String postalCode;
// /** �s���{��*/ 
// private String prefectures;
// /** �s�撬��*/ 
// private String city;
// /** ���̑��Z��*/ 
// private String otherAddress;
// /** �d�b�ԍ�*/ 
// private String phoneNumber;
// /** ���[���A�h���X*/ 
// private String emailAddress;
