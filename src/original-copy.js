eval(GetCookie("document","module"))
module.load("original");
module.load("util");


Sakura().lines(function(line){
	var obj = util.convertMember(line)
	puts(JSON.stringify(obj));
});