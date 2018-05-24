define(["jquery"], function($) {
  var say = function (text) {
    $('#app').append('<p><img src="./dist/images/cat.png">' + text + '</p>');
  }

  var hello = function() {
    say('Miauzzz');
  }

  return {
    say: say,
    hello: hello,
  }
})
