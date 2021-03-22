var tower,door,climber,ghost;
var towerImage,doorImage,climberImage,ghostImage;
var doorGroup;
var climberGroup;
var invisibleBlock,invisibleBlockGroup;
var gameState="play"
var sound;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage  = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav")
}
function setup(){
  createCanvas (600,600);
  sound.loop();                       
tower=createSprite(300,300,50,70);
tower.addImage (towerImage);
tower.velocityY = 2;

ghost = createSprite(200,200,50,50);
ghost.addImage(ghostImage);
ghost.scale = 0.4;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();
}
function draw(){
background("white");
  
  if (gameState==="play"){
    
  if (tower.y>400){
tower.y=300;
  }
  if (keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY+0.8;
  if (keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if (keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
    
  }
   if (invisibleBlockGroup.isTouching(ghost)){
     ghost.destroy();
     gameState="end"
   } 
spawnDoor();
  
  drawSprites();
  }
  
 if (gameState==="end"){
   text("GAME OVER",230,250)
 }
}
function spawnDoor(){
  if (frameCount%240===0){
    door=createSprite(200,-50,20,20);
    door.addImage (doorImage);
    door.velocityY = 2;
    door.x = Math.round(random(120,400));
    door.lifetime = 800;
    doorGroup.add(door);
    climber = createSprite(200,10,20,20);
    climber.addImage (climberImage);
    climber.x = door.x
    climber.velocityY = 2;
    climber.lifetime = 800;
    climberGroup.add(climber);
    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 2;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug=true
    invisibleBlock.visible=false
    ghost.depth=door.depth
    ghost.depth+=2
  }
}