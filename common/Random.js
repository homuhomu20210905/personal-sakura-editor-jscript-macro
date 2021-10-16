(function(){
    R = function(list){
        if(!(this instanceof R)){
            return new R(list);
        }
        this.list = list;
    }
    
    R.prototype.setData = function(list){
        this.list = list;
        return this;
    }
    
    R.prototype.get = function(){
        return this.list[R.random(0,this.list.length-1)];
    }
    
    R.prototype.line = function(len){
        var res = [];
        for(var i=0;i < len;i++){
            res.push(this.get());
        }
        return res.join("");
    }
    
    R.prototype.shuffle = function(){
        this.list = R.shuffle(this.list);
        return this;
    }
    
    R.random = function(min,max){
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }
    
    var newList = function(list){
        var res = [];
        for(var i=0;i < list.length;i++){
            res.push(list[i]);
        }
        return res;
    }
    
    R.shuffle = function(list){
      var array = newList(list);
      for(var i = (array.length - 1); 0 < i; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
      }
      return array;
    }
    
    R.number = function(){
        var list = "1234567890".split("");
        return list;
    }
    R.Alphabet = function(){
        var list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        return list;
    }
    R.alphabet = function(){
        var list = "abcdefghijklmnopqrstuvwxyz".split("");
        return list;
    }
})();