var bananaImage, obstacleImage, obstacleGroup, background, backimg, back, score, monkey, monkeyimg, ground, foodGroup, score, obstaclesGroup, bananaimg, obstacleimg;

function preload() {
  backimg = loadImage("jungle.jpg");
  monkeyimg = loadAnimation("Monkey1.png", "Monkey2.png", "Monkey3.png", "Monkey4.png", "Monkey5.png", "Monkey6.png", "Monkey7.png", "Monkey8.png", "Monkey9.png", "Monkey10.png");
  bananaimg = loadImage("banana.png");
  obstacleimg = loadImage("stone.png");
  
}

function setup() {
  createCanvas(400, 400);
  back = createSprite(200, 200, 400, 400);
  back.addImage("jungle", backimg);
  back.velocityX = -2;
  ground = createSprite(200, 380, 400, 10);
  ground.visible = false;
  monkey = createSprite(100, 345, 10, 10);
  monkey.addAnimation("monkey", monkeyimg);
  monkey.scale = 0.1;
  score = 0;
  foodGroup = new Group();
  obstaclesGroup = new Group();
  //monkey.debug = true;
  //ground.debug = true;
}

function draw() {
background(255);
  
  if(back.x < 0) {
   back.x = 200; 
  }
  
  monkey.collide(ground);
  
  if(keyDown("space") && monkey.y >= 340){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 1;
  
  if(foodGroup.isTouching(monkey)) {
    foodGroup.destroyEach();
    score = score + 2;
  }
  
  switch(score) {
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
    default: break;
  }
  
  if(obstaclesGroup.isTouching(monkey)) {
    monkey.scale = 0.1;
  }
food();
obstacles();
drawSprites();
  stroke("white");
  textSize(15);
  fill("white");
  text("Score:"+score, 320, 20);
}

function food(){
  if(frameCount % 80 === 0){
    var banana = createSprite(300, 200, 5, 5);
    banana.addImage("bananaimg", bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 100;
    banana.y = random(300, 320);
    
    foodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(300, 345, 5, 5);
    obstacle.addImage("obstacleimg", obstacleimg);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    obstacle.lifetime = 100;
    obstacle.debug = true;
    obstaclesGroup.add(obstacle);
  }
}