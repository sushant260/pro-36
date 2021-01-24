class Form {
    constructor() {
      
    }
  
    display(){
      var title = createElement('h2')
      title.html("Feed your pet");
      title.position(530, 0);
      
      var input = createInput("Name");
      var button = createButton('Play');
      
      input.position(530, 160);
      button.position(650, 200);
  
      button.mousePressed(function(){
        input.hide();
        button.hide();
  
        var name = input.value();
        
        playerCount+=1;
        player.update(name)
        player.updateCount(playerCount);
        var greeting = createElement('h3');
        greeting.html("Hello " + name +", do you want to drink some milk??  If yes then ask your friend.   ")
        greeting.position(380, 160)
      });
  
    }
  }