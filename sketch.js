const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground,blink,eat;
var rope;
var fruit;
var fruitCon,fruitCon2,fruitCon3;
var bgImg,fruitImg,bunnyImg,bunny,button;
var sad,bkSound,cutSound,sadSound,eatingSound,airSound;
var blower,muteBt,button2,button3,rope2,rope3;

function preload() {
bgImg=loadImage("background.png");
fruitImg=loadImage("melon.png");
bunnyImg=loadImage("Rabbit-01.png");
blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
eat= loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
sad= loadAnimation("sad_1.png","sad_2.png","sad_3.png");

bkSound= loadSound("sound1.mp3");
cutSound= loadSound("rope_cut.mp3");
sadSound= loadSound("sad.wav");
eatingSound= loadSound("eating_sound.mp3");
airSound= loadSound("air.wav");

blink.playing = true;
eat.playing = true;
sad.playing = true;
sad.looping = false;
eat.looping = false;
}

function setup() 
{
  createCanvas(500,650);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
blink.frameDelay = 20;
eat.frameDelay = 20;
sad.frameDelay = 20;
  ground = new Ground(200,650,600,20);
  rope= new Rope(8,{x:40,y:30});
  rope2= new Rope(7,{x:370,y:40});
  rope3= new Rope(4,{x:400,y:225});

   var fruit_options = {
density :0.0005
   }
   fruit= Bodies.circle (300,300,30,fruit_options);
Matter.Composite.add(rope.body,fruit);
fruitCon=new Link(rope,fruit);
fruitCon2=new Link(rope2,fruit);
fruitCon3=new Link(rope3,fruit);

bunny=createSprite(380,560,100,100);
bunny.addImage(bunnyImg);
bunny.scale =0.2
bunny.addAnimation("blinking",blink);
bunny.addAnimation("eating",eat);

bunny.addAnimation("crying",sad);
bunny.changeAnimation("blinking");

button=createImg("button.png");
button.position(20,30);
button.size(50,50);
button.mouseClicked(drop);

button2=createImg("button.png");
button2.position(330,35);
button2.size(60,60);
button2.mouseClicked(drop2);

button3=createImg("button.png");
button3.position(360,200);
button3.size(60,60);
button3.mouseClicked(drop3);

blower= createImg("balloon.png");
blower.position(10,250);
blower.size(150,100);
blower.mouseClicked(airblow);

bkSound.play();
bkSound.setVolume(0.5);
muteBt= createImg("mute.png");
muteBt.position(450,20);
muteBt.size(50,50);
muteBt.mouseClicked(mute);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
}

function draw() 
{
  background(51);
  image(bgImg,width/2,height/2,500,700);
  Engine.update(engine);
  ground.show();
  rope.show();
  rope2.show();
  rope3.show();
  //ellipse(fruit.position.x,fruit.position.y,30);

  
   
  if (fruit != null) {
    image(fruitImg,fruit.position.x,fruit.position.y,80,80);


  }

  
  
  
  drawSprites();
  if (collide(fruit,bunny)== true) {
    eatingSound.play();
    bunny.changeAnimation("eating");
  }
  if (collide(fruit,ground.body)== true) {
    bunny.changeAnimation("crying");
    bkSound.stop();
    sadSound.play();
    fruit = null;
  }
  //if (fruit != null &&  fruit.position.y>=650) {
   // bunny.changeAnimation("crying");
  //
   //}
}

function drop() {
  cutSound.play();
   rope.break();
   fruitCon.detach();
   fruitCon=null;
 }
 function drop2() {
  cutSound.play();
   rope2.break();
   fruitCon2.detach();
   fruitCon2=null;
 }
 function drop3() {
  cutSound.play();
   rope3.break();
   fruitCon3.detach();
   fruitCon3=null;
 }

function collide(body,sprite){
  if (body !=null) {
    var d = dist(body.position.x,
      body.position.y,
      sprite.position.x,
      sprite.position.y);
      if (d<=80) {
        World.remove(engine.world,fruit);
        fruit = null;
        return true;
      }else{
return false;
      }
  }
}

function airblow() {
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  airSound.play();
}

function mute() {
  if (bkSound.isPlaying()) {
    bkSound.stop();
  }else{
  bkSound.play();
  }
}