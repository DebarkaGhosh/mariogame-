var backGround,groundImage;
var mario,marioImage;
var obstacle ;
var  PLAY = 1;
var  END  = 0 ;
var gamestate = PLAY;
var collided;
var score = 0;
var gameOver ;
var dieSound , jumpSound , checkPointSound;

function preload(){
  backGroundImage=loadImage("bg.png");
  marioImage=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  groundImage=loadImage("ground2.png");
  BrickImage = loadImage("brick.png");
  
  obstacleImage = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  collidedImage = loadAnimation("collided.png");
  
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  
  gameOverImage = loadImage("gameOver.png");
  resetImage = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 350);
  
  gameOver = createSprite(300,100,10,10);
  gameOver.addImage("gameover",gameOverImage);
  
  restart = createSprite(300,150,10,10);
  restart.addImage("restart",resetImage);
  restart.scale = 0.5;
  
  
  mario=createSprite(25,265,10,10);
  mario.scale=2;
  mario.addAnimation("running",marioImage);
  mario.addAnimation("collided",collidedImage);
  ground=createSprite(200,335,400,20);
  ground.addImage("ground",groundImage);
  
  
  mario.setCollider("circle",0,5,12);
  
  
  obstaclesGroup = new Group();
  BricksGroup = new Group();
}

function draw() {
  background(backGroundImage);
  
  text ("score:" +score ,120, 50);
  
  if (gamestate===PLAY){
    ground.velocityX=-5;
    mario.changeAnimation("running",marioImage);
  
    if (ground.x<0){
    ground.x= ground.width/2;
  }
  gameOver .visible = false;
    restart.visible = false;
  if (keyDown("space")&& mario.y>= 257){
    mario.velocityY = -15;
    jumpSound.play();
  }
  mario.velocityY = mario.velocityY+ 0.5;
  spawnObstacles();
  spawnBricks();
    if (score %10 ==0 && score>0){
      checkPointSound.play();
    }
  for(var i=0 ; i< BricksGroup.length ; i++){
    if (BricksGroup.get(i).isTouching(mario)){
      BricksGroup.get(i).remove();
      score = score +1;
    }
  }
    if (mario.isTouching(obstaclesGroup)){
      gamestate = END;
      dieSound.play();
   }
  }
  
  if (gamestate===END){
    
    
    if (mousePressedOver(restart)){
      reset();
    }
    
    gameOver .visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    mario.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    BricksGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach (-1);
     BricksGroup.setLifetimeEach(-1);
    mario.changeAnimation("collided",collidedImage);
  }
  
 
  
  mario.collide(ground);
  console.log(mario.y);
  drawSprites();
  
}


function spawnObstacles(){
  
  if (frameCount % Math.round(random(50,90)) == 0){
    obstacle = createSprite(600,270,10,10);
  obstacle.velocityX = -5;
  obstacle.addAnimation("obstacle",obstacleImage);
    obstacle.lifetime = 120;
    obstaclesGroup.add(obstacle);
  }
  
}


function spawnBricks(){
  if(frameCount % 40 ==0){
    Brick = createSprite(600,120,10,10);
    Brick.velocityX = -10;
    Brick.addImage("Brick",BrickImage);
    Brick.y = Math.round(random(100,200));
    Brick.lifetime = 100;
    BricksGroup.add(Brick);
   }
   
}


function reset () {
  gamestate = PLAY;
  gameOver.visible = false ;
  restart.visible = false ;
  obstaclesGroup.destroyEach();
  BricksGroup.destroyEach();
  score = 0;
  mario.changeAnimation("running",marioImage);
  
}









