var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obsTop1,obsTop2
var obstacleTop
var obsBottom1,obsBottom2,obsBottom3
var obstacleBottom
var obsTopgrp,obsBottomgrp
var bargrp

var PLAY = 1
var END = 0
var gamestate = PLAY

var score = 0
var gameover,gameoverimg
var restart,restartimg
function preload(){
bgImg = loadImage("assets/bg.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

gameoverimg = loadImage("assets/gameOver.png")
restartimg = loadImage("assets/restart.png")

}

function setup(){

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;

gameover = createSprite(220,200)  
gameover.scale = 0.5;
gameover.addImage(gameoverimg)
gameover.visible = false;

restart = createSprite(220,240)  
restart.scale = 0.5;
restart.addImage(restartimg)
restart.visible = false;

//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

obsTopgrp = new Group()
obsBottomgrp = new Group()
bargrp = new Group()
}

function draw() {
  
  background("black");
       if (gamestate === PLAY) {
console.log("here")
       
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 0.5;
bar();
spawnTopobstacles();
spawnBottomobstacles();
if (obsTopgrp.isTouching(balloon) || obsBottomgrp.isTouching(balloon)){
gamestate = END
}
      }
       if (gamestate === END){
        gameover.visible = true;
        restart.visible = true;
        gameover.depth = gameover.depth+1
        restart.depth = restart.depth+1

        console.log("hERE9")
        balloon.velocityX = 0
        balloon.velocityY = 0
        obsBottomgrp.setVelocityXEach(0)
        obsTopgrp.setVelocityXEach(0)
        bargrp.setVelocityXEach(0)
        obsBottomgrp.setLifetimeEach(-1)
        obsTopgrp.setLifetimeEach(-1)
        balloon.y=180
        if (mousePressedOver(restart)){
          reset()
        }
       }
drawSprites();
Score();
}
function reset(){
  gamestate = PLAY
  gameover.visible = false;
  restart.visible = false;
  obsTopgrp.destroyEach()
  obsBottomgrp.destroyEach()
  score = 0
}
function spawnTopobstacles(){
  if (World.frameCount%60 === 0)
  {
    obstacleTop = createSprite(400,50,40,50)
    obstacleTop.y = Math.round(random(10,100))
    var rand = Math.round(random(1,2))
    switch(rand){
      case 1 :obstacleTop.addImage(obsTop1)
    break;
  
  case 2 : obstacleTop.addImage(obsTop2)
break;}
obstacleTop.velocityX = -4
obstacleTop.scale = 0.1
obsTopgrp.add(obstacleTop)
obstacleTop.lifetime = 100
balloon.depth = balloon.depth+1
  }
}
function spawnBottomobstacles(){
  if (World.frameCount%60 === 0)
  {
    obstacleBottom = createSprite(400,350,40,50)
    obstacleBottom.velocityX = -4
    obstacleBottom.scale = 0.1 
    var rand = Math.round(random(1,3))
    switch(rand){
      case 1 : obstacleBottom.addImage(obsBottom1)
      break;
      
      case 2 : obstacleBottom.addImage(obsBottom2)
      break;

      case 3 : obstacleBottom.addImage(obsBottom3)
      break;
    }
    balloon.depth = balloon.depth+1
    obstacleBottom.lifetime = 100
    obsBottomgrp.add(obstacleBottom)
  }
}
function bar(){
  if (World.frameCount%60 === 0){
  var  bar = createSprite(400,200,10,800)
  bar.velocityX = -6
  bar.depth = balloon.depth
  bar.lifetime = 70
  bar.visible = false;
  bargrp.add(bar)

  }
}
function Score(){
  if (balloon.isTouching(bargrp)){
    score = score+1
  }
  textSize(25)
  fill("purple")
  text("Score:"+score,275,45)
}