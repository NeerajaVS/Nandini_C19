var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(300,300,10,10);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.25;

}

function draw() {
  background(200);

  if(gameState=="play") {
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("LEFT_ARROW")) {
      ghost.x = ghost.x - 2;
    }
    if(keyDown("RIGHT_ARROW")) {
      ghost.x = ghost.x + 2;
    }
    if(keyDown("SPACE")) {
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.5;

   if(climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
    }

    spawnDoors();

    if(invisibleBlockGroup.isTouching(ghost) || (ghost.y>600)) {
      ghost.destroy();
      gameState="end";
    }

    drawSprites();
  }

  // I just put the end gameState separately and all other
  // instructions within the play gameState separately

  if(gameState=="end") {
    textSize(20);
    text("Game Over",250,300);
  }

}

function spawnDoors() {
  if(frameCount%240==0) {

  door = createSprite(50,50,20,20);
  door.addImage("door",doorImg);
  door.x = Math.round(random(100,500));

  climber = createSprite(50,100,20,20);
  climber.addImage("climber",climberImg);
  climber.x = door.x;

  invisibleBlock = createSprite(50,100,20,2);
  invisibleBlock.x = door.x;

  door.velocityY = 3;
  climber.velocityY = 3;
  invisibleBlock.velocityY = 3;

  door.lifetime = 700;
  climber.lifetime = 700;
  invisibleBlock.lifetime = 700;

  ghost.depth = door.depth;
  ghost.depth = ghost.depth + 1;

  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);

}

}