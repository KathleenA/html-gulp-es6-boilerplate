define(["jquery", "cat", "dog"], function($, cat, dog) {
  var say = function(text) {
    if (text === undefined) {
      text = 'Say: Hi';
    }

    $('#app').append('<p><img src="./dist/images/master.png"> ' + text + '</p>');
  }

  var hello = function() {
    this.say('hello Mi');
  }

  var feed = function() {
    var newMaster = ['Bob', 'Alice'];
    var allMasters = ['Tom'].concat(newMaster);
    var masterObj = {name: allMasters[1]};
    var name = masterObj.name;
    var age = masterObj.age === undefined ? 45 : masterObj.age;

    var greeting = 'Hey Guys, I am ' + name + '(' + age + ')' + ' your food is there (Dog and Cat are happy)';
    say(greeting);
    cat.say('Schnurrrr');
    dog.say('Hechel Hechel');
  }
  
  hello = function() {
    this.say();
  }

  return {
    say: say,
    hello: hello,
    feed: feed,
  }
})
