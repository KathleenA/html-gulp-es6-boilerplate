define(["jquery", "cat"], function($, cat) {
  var say = function (text) {
    $('#app').append('<p><img src="./dist/images/dog.jpg">' + text + '</p>');
  }

  var hello = function() {
    say('Wuff Wuff');
  }

  var bite = function() {
    say('Knurr (Dog bites the cat!)');
    cat.say('Miaaaaaaauuuuuuu (Cat strikes back!)');
  }

  return {
    say: say,
    hello: hello,
    bite: bite,
  }
})
