var PLAY=1
var END=0
var gameState = PLAY

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground

var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400)
  
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
monkey.scale=0.1
 
 ground=createSprite(400,350,900,10)
  ground.velocityX=-5
  console.log(ground.x)
  
  foodGroup=new Group()
  
  obstacleGroup=new Group()

  score = 0

  monkey.setCollider("rectangle",0,0,100,monkey.heigth)
  monkey.debug=false
}


function draw() {
background("white")
 
  stroke("black")
  textSize(20)
  fill("black")
  text("Survival Time : " + score,100,50)
  
  if (gameState===PLAY){
    score=score+Math.round(getFrameRate()/60)
     ground.velocityX=-(5+3*score/500)
    
    if (keyDown("space")){
    monkey.velocityY=-12
  }  
  
 monkey.velocityY=monkey.velocityY + 0.8 
  
   if (ground.x>0){
    ground.x=ground.width/2
  } 
    
     monkey.collide(ground)
  
    food()
  Obstacle()
    
     if (monkey.isTouching(obstacleGroup)){
    
    gameState=END
     }
    
  }
 
else if (gameState===END){
  ground.velocityX=0
  monkey.velocityY=0
 
       obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
  
       
       obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
       score=0
  
} 
 
  
  
  
  
  
  
 
  
  drawSprites();
}

function food(){
 
  if (frameCount % 80===0){
    var banana=createSprite(400,100,20,20)
    banana.y=Math.round(random(120,200))
    banana.addImage(bananaImage)
    banana.scale=0.1
  banana.velocityX=-(5+3*score/500) 
  banana.lifetime=200
  foodGroup.add(banana)
  }
}

function Obstacle(){
 
  if (frameCount%300===0){
     var obstacle=createSprite(400,318,20,20)
    obstacle.velocityX=-(5+3*score/500)
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.15
  obstacleGroup.add(obstacle)
  
  
  
  
  
  }
}


