var mario,mario_running, mario_collided;
var ground, invisibleGround, groundImage;
var brick, brickGroup,brickImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

var background,backgroundImage, background;

function preload(){
  mario_running=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
 mario_collided=loadImage("collided.png");
  groundImage = loadImage("ground2.png")
  
  brickImage=loadImage("brick.png");
    obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  
    restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
    jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  backgroundImage=loadImage("bg.png");

}
function setup(){
  createCanvas(600,300)
  //  background= createSprite(0,0,400,400);
  // // background.addImage("background",backgroundImage)
  // background.scale=2.5;
  // background.velocityX=-2;
  //create a trex sprite
  mario = createSprite(50,220,20,50);
  mario.addAnimation("running",mario_running);
  
  // create ground sprite
  ground = createSprite(200,280,600,20);
  ground.addImage("ground",groundImage);
  // ground.velocityX=-4;
  ground.x = ground.width /2;
// ground.scale=0.9;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
 
 
  
  //creating invisible ground
  invisibleGround = createSprite(200,240,400,10)
  invisibleGround.visible = false;
   obstaclesGroup = createGroup();
  bricksGroup = createGroup();
  
   mario.setCollider("circle",0,0,20);
  mario.debug = true
  
  score = 0;
  
  
  
}
function draw(){
    background(backgroundImage);

  background.velocityX = -3 

    if (background.x < 0){
      background.x = background.width/2;
    }
  //displaying score
  text("Score: "+ score, 350,50);
  
  // console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
        mario.velocityX=0;

    //Invisible gameover and restart logo
    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/100);
   
    
    //Adding controls to mario
    if( keyDown("Left") && gameState===PLAY){
      mario.velocityX=-4;}
   else
           mario.velocityX=0;

   if( keyDown("Right") && gameState===PLAY){
      mario.velocityX=4;}
   else
           mario.velocityX=0;
    
  //jump when the space key is pressed
    if(keyDown("Up")&& mario.y >= 100) {
        mario.velocityY = -8;
        jumpSound.play();
          }
     //add gravity
    mario.velocityY = mario.velocityY + 0.8
  // mario.collide(brick)
    
    //Added checkpoint sound
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    //Ground image reset
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    spawnObstacles();
        spawnBricks();

    if(obstaclesGroup.isTouching(mario)){
        mario.velocityY = -12;
        gameState = END;
        dieSound.play()
       //change the trex animation
      mario.changeAnimation("collided",mario_collided);
     
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      mario.velocityY = 0
      // //change the trex animation
      // mario.changeAnimation("collided",mario_collided);
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bricksGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bricksGroup.setVelocityXEach(0);
       if(mousePressedOver(restart)) {
      reset();
    }
   }
  
 
  //stop trex from falling down
  mario.collide(invisibleGround);
  
  
  
  drawSprites();


  }

function reset(){

  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bricksGroup.destroyEach();
  score = 0;
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,230,10,40);
   obstacle.velocityX = -10;
   
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
     
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}


function spawnBricks(){
  if (frameCount % 60 === 0) {
    brick = createSprite(600,200,40,10);
    brick.addImage(brickImage)
    brick.y = Math.round(random(120,180))
    // brick.scale = 0.8;
    brick.velocityX= -3;
    
    brick.depth=mario.depth;
    mario.depth=mario.depth+1;
    
    bricksGroup.add(brick);
    
}}