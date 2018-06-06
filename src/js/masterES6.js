define(["jquery", "cat", "dog"], ($, cat, dog) => {
  const say = (text='Say: Hi') => {
    $('#app').append(`<p><img src="./dist/images/master.png">${text}</p>`);
  }

  let hello = () => {
    say('hello Mi');
  }

  const feed = () => {
    const newMaster = ['Bob', 'Alice'];
    const allMasters = ['Tom', ...newMaster];
    const masterObj = {name: allMasters[1]};
    const {name, age = 45} = masterObj;

    const greeting = `Hey Guys, I am ${name}(${age}). Your food is there (Dog and Cat are happy)`;
    say(greeting);
    cat.say('Schnurrrr');
    dog.say('Hechel Hechel');
  }
  
  hello = () => {
    say();
  }

  return {
    say,
    hello,
    feed,
  }
})
