eval(Editor.GetCookie("document","module"))
module.load("original");
module.load("util");
module.load("Random");


puts(R([1,2,3]).shuffle().line(5));
puts(R(["���H","���H","�[�H"]).setData(["new���H","new���H","new�[�H"]).get());
puts(R(R.number()).shuffle().get());
puts(R(R.Alphabet()).shuffle().get());
puts(R(R.alphabet()).shuffle().line(10));
