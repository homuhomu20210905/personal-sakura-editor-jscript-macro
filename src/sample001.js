eval(GetCookie("document","module"))
module.load("original");
module.load("util");
module.load("_");


var tplMember = _.template(util.template(function(){/*
<%= comment %> 
private String <%= camel %>;
*/}));

// テーブルのカラム情報から変数名を生成。
Sakura()
.filter(function(line,no,origin){
    //余計なカラムを除外
    return line.split("\t").length == 2;
})
.map(function(line,no,origin){
    var list = line.split("\t");
    //member変数生成呼出
    var member = util.convertMember(list[1]);
    member.comment = "/** " + list[0] + "*/";
    return member;
})
.lineAll(function(lines){
    _.each(lines,function(member){
        puts(tplMember(member));
    });
    
});


// ..\data\sampledata.txtを開いて実行すると以下の値になります。
// /** 顧客ID*/ 
// private String customerId;
// /** 顧客名*/ 
// private String customerName;
// /** 郵便番号*/ 
// private String postalCode;
// /** 都道府県*/ 
// private String prefectures;
// /** 市区町村*/ 
// private String city;
// /** その他住所*/ 
// private String otherAddress;
// /** 電話番号*/ 
// private String phoneNumber;
// /** メールアドレス*/ 
// private String emailAddress;
