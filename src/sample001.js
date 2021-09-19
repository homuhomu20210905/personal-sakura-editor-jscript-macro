eval(GetCookie("document","module"))
module.load("original");
module.load("util");
module.load("_");

// sample code
Sakura()
.filter(function(line,no,origin){
    return true;
})
.map(function(line,no,origin){
    var list = line.split(",");
    return util.convertMember(list[0]);
})
.lineAll(function(lines){
    //puts(line);
    _.each(lines,function(item){
        puts(JSON.stringify(item));
    });
    
});

puts("----------------");
Sakura.putsRunningTime();
