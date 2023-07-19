var TitleBgIMG;
var TitleButton, TitleButtonA;
var GameBg1, GameBg2, GameBgIMG;
var jet, jetIMG;
var shot, shotGroup, enemyShot1, enemyShot2, enemyShotGroup;
var enemy, enemyIMG1, enemyIMG2, enemyIMG3, enemyGroup, enemySpriteFactor, enemyPositionFactor;

var gameState = "title";

function preload(){
  TitleBgIMG = loadImage("res/Title Bg.png")
  TitleButtonA = loadAnimation("res/Title Button A1.png", "res/Title Button A2.png", "res/Title Button A3.png");
  GameBgIMG = loadImage("res/GameBg.png");
  jetIMG = loadImage("res/Jet.png");
  enemyIMG1 = loadImage("res/enemy.png");
  enemyIMG2 = loadImage("res/enemy2.png");
  enemyIMG3 = loadImage("res/enemy3.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  if(gameState == "title"){
  TitleButton = createSprite((windowWidth/2) + 10, (windowHeight/2) + 100, 20, 20);
  TitleButton.addAnimation("yippie", TitleButtonA);
}
  GameBg1 = createSprite(windowWidth/2, windowHeight, 20, 20);
  GameBg1.addImage(GameBgIMG);
  GameBg1.visible = false;
  GameBg2 = createSprite(windowWidth/2, GameBg1.y - 2660, 20, 20);
  GameBg2.addImage(GameBgIMG);
  GameBg2.visible = false;

  jet = createSprite(windowWidth/2, windowHeight - 50, 53, 72);
  jet.addImage(jetIMG);
  jet.visible= false;

  shotGroup = new Group();
  enemyGroup = new Group();
  enemyShotGroup = new Group();
}

function draw() {
  controls();
  shooting();
  enemys();
  enemyShooting();
  if(gameState == "title"){
  background(TitleBgIMG);  
  }

  //transition title > running
  if(mousePressedOver(TitleButton) && gameState == "title"){
    gameState = "running"
    TitleButton.visible = false;
    GameBg1.visible = true;
    GameBg2.visible = true;
  }

  //gameState running
  if(gameState == "running"){
    GameBg1.velocityY = 3;
    GameBg2.velocityY = 3;
    //running background
    if(GameBg1.y - 1330 >= windowHeight){
      GameBg1.y = GameBg2.y - 2660;
    }
    if(GameBg2.y - 1330 >= windowHeight){
      GameBg2.y = GameBg1.y - 2660;
    }
    jet.visible = true;
  }
  console.log(frameCount);
  drawSprites();
}

function controls(){
  if(gameState == "running"){
    jet.visible = true;
    //controls
    if(keyDown("A")){
      jet.x -= 8;
    }
    if(keyDown("D")){
      jet.x += 8;
    }
    if(keyDown("W")){
      jet.y -= 4;
    }
    if(keyDown("S")){
      jet.y += 4;
    }
  }
}

function shooting(){
  //1
  if(frameCount%10 == 0 && gameState == "running"){
    shot = createSprite(jet.x, (jet.y) - 40, 10, 20);
    shotGroup.add(shot);
    shot.shapeColor = "yellow";
    shot.velocityY = -20;
    shot.lifetime = 120;
  }
}

function enemys(){
  if(frameCount%15 == 0 && gameState == "running"){
    enemySpriteFactor = Math.round(random(1, 3));
    enemyPositionFactor = Math.round(random(1, 8));
    enemy = createSprite(windowWidth/2 - 300,  100, 30, 30)
    enemyGroup.add(enemy);
    enemy.lifetime = 200;
    enemy.velocityY = 5;
    firstgrademurder();
    /*switch(enemySpriteFactor){
      case 1: enemy.addImage(enemyIMG1);
      break;

      case 2: enemy.addImage(enemyIMG2);
      break;

      case 3: enemy.addImage(enemyIMG3);
      break;
    }*/
    switch(enemyPositionFactor){
      case 1: enemy.x = windowWidth/2 -200;
      break;

      case 2: enemy.x = windowWidth/2 -100;
      break;

      case 3: enemy.x = windowWidth/2;
      break;

      case 4: enemy.x = windowWidth/2 + 100;
      break;

      case 5: enemy.x = windowWidth/2 +200;
      break;

      case 6: enemy.x = windowWidth/2 + 300;
      break;

      case 7: enemy.x = windowWidth/2 + 400;
      break;

      case 8: enemy.x = windowWidth/2 + 500;
      break;
      
    }
  }
}

function enemyShooting(){
  if(frameCount%30 == 0 && gameState == "running" && frameCount < 1000){
    enemyShot1 = createSprite(enemy.x, enemy.y, shot.width, shot.height)
    enemyShot2 = createSprite(enemy.x, enemy.y, shot.width, shot.height)
    enemyShotGroup.add(enemyShot1);
    enemyShotGroup.add(enemyShot2);
    enemyShot1.shapeColor = "red";
    enemyShot2.shapeColor = "red";
    enemyShot1.lifetime = 200;
    enemyShot2.lifetime = 200;
    enemyShot1.velocityX = -2;
    enemyShot1.velocityY = 3;
    enemyShot2.velocityX = 2;
    enemyShot2.velocityY = 3;
  }

  if(frameCount%20 == 0 && gameState == "running" && frameCount > 1000){
    enemyShot1 = createSprite(enemy.x, enemy.y, shot.width, shot.height)
    enemyShot2 = createSprite(enemy.x, enemy.y, shot.width, shot.height)
    enemyShotGroup.add(enemyShot1);
    enemyShotGroup.add(enemyShot2);
    enemyShot1.shapeColor = "red";
    enemyShot2.shapeColor = "red";
    enemyShot1.lifetime = 200;
    enemyShot2.lifetime = 200;
    enemyShot1.velocityX -= 4;
    enemyShot1.velocityY += 6;
    enemyShot2.velocityX += 4;
    enemyShot2.velocityY += 6;
  }

}

function firstgrademurder(){
  if(shot.isTouching(enemyGroup)){
    enemyGroup.destroyEach();
  }
}

function score(){
  
}