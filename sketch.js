var START=1;
var PLAY=2;
var END=3;
 gameState=1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup

var ground,gg;
var invisible;
var play,pl;
var ms;
var survivalTime=0;
var gO,go;
var re,restart;

var vision;

var bs;

var st;

var b=0;

function preload()
{
 monkey_running =                    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gg = loadImage("ground.jpg");
  pl = loadImage("play.png");
  ms=loadAnimation("sprite_5.png");
  go = loadImage("gameover.png");
  restart = loadImage("restart.png");
  bs = loadSound("banana.mp3");
  st = loadSound("stop.mp3");
}



function setup() 
{
  createCanvas(500,400);
  ground = createSprite(450,370,2200,10);
  ground.velocityX=-(6+3*(survivalTime/100));
  ground.addImage("gi",gg);
  ground.scale=2.55;
  
  gO=createSprite(220,200);
  gO.addImage("game",go);
  re=createSprite(220,240);
  re.addImage("rest",restart);
  re.scale=1;
  
  monkey=createSprite(50,350,10,10)
  monkey.addAnimation("mk",monkey_running);
  monkey.addAnimation("mr",ms);
  monkey.scale=0.1;
  
  invisible = createSprite(300,365,1000,10);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  
  play= createSprite(245,165,10,10);
  play.addImage("start",pl);
  play.scale=0.7;
  play.visible=false;
 
  vision = createSprite(200,30,600,30);
   vision.shapeColor="yellow";
  
}


function draw() 
{
  
   background("yellow");
    stroke("black");
    fill("black");
   textSize(20);
   text("Survival Time:" +survivalTime,80,30);
  text("Bananas Eaten:" + b,280,30);
   console.log(monkey.y);
   gO.visible=false;
   re.visible=false;

  
  if(gameState===START)
  {
   play.visible=true;
   gO.visible=false;
   re.visible=false;
    
   fill("red");
    text("A monkey has escaped from the zoo and is very hungry.",4,60);
    text("Help the monkey collect Bananas ",100,300);
    text("by jumping over obstacles.",120,350);
    monkey.visible=false;
    invisible.visible=false;
    ground.visible=false;
     
    
    if(mousePressedOver(play))
    {
             play.visible=false;
             gameState=PLAY;
    }
  }
  
     
  if(gameState==PLAY)
  {
   vision.visible=false;
   gO.visible=false;
   re.visible=false;
   survivalTime=survivalTime+Math.round(getFrameRate()/61.45);
   food();
   obstacles();
    
   monkey.visible=true;
    //invisible.visible=true;
    ground.visible=true;
   
     if(ground.x<0)
  {
     ground.x=ground.width/2;
  }
  
  if(keyDown("space")&& monkey.y >= 317)
  {
    monkey.velocityY=-17;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
   monkey.collide(invisible);
  
  invisible.visible=false;
    
  
  
  if(monkey.isTouching(FoodGroup)){
    bs.play();
    FoodGroup.destroyEach();
    b=b+1;
}
    
    
 
    
  if(monkey.isTouching(obstacleGroup)){
    st.play();
  gameState=END;
}
}
 else if(gameState===END){
    
   
   gO.visible=true;
    re.visible=true;
    
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
     monkey.changeAnimation("mr",ms);
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    if(mousePressedOver(re)){
     reset();
      
    }
  
   }
  drawSprites();
    
 
     
}


function food() {
  if(frameCount % 80 === 0){
    banana=createSprite(500,260,10,10)
    banana.scale=0.15;
    banana.addImage("b",bananaImage);
    banana.y=Math.round(random(120,200));
    banana.lifetime=200;
    banana.velocityX=-6;
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount % 200 === 0){
    obstacle=createSprite(550,320,10,10);
    obstacle.scale=0.2;
    obstacle.addImage("ob",obstacleImage);
    obstacle.lifetime=200;
    obstacle.velocityX=-6;
    obstacle.setCollider("rectangle",50,50,300,50);
    obstacleGroup.add(obstacle)
  }
}

function reset() {
  survivalTime=0;
  b=0;
   gameState=PLAY;
       gO.visible=false;
  re.visible=false;
      
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      
        monkey.changeAnimation("mk",monkey_running); 

      setup();
}
