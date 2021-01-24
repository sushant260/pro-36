var dog,sadDog,happyDog,button1,button2,food,database,feed,fedTime,lastFed,pet;
var gameState = 0;
var playerCount;
var form, player, game;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();
  feed=createButton("feed your dog ");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  food=new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  addFood=createButton("addFood");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(46,139,87);
  food.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  food.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}