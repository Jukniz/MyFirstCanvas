function Rectangle(x,y,width,height){
 this.x=(x==null)?0:x;
 this.y=(y==null)?0:y;
 this.width=(width==null)?0:width;
 this.height=(height==null)?this.width:height;

 this.intersects=function(rect){
  if(rect!=null){
   return(this.x<rect.x+rect.width&&
    this.x+this.width>rect.x&&
    this.y<rect.y+rect.height&&
    this.y+this.height>rect.y);
  }
 }
}

function random(max){
 return parseInt(Math.random()*max);
}


window.addEventListener('load',init,false);
var canvas=null,ctx=null;
var lastKey=null;
var PAUSE=true;
var GAMEOVER=false;
var PRESSING=new Array();
var score=0;
var time=6000;
var timeout=60;
var body=new Rectangle(50,50,84,115);
var enemy=new Rectangle(300,300,66,85);
var finnandjake = new Image();
finnandjake.src =  "Resources/finnandjake.png";
var iceking = new Image();
iceking.src =  "Resources/Original_Ice_King.png";

var food=new Rectangle(80,80,10,10);
function init(){
 canvas=document.getElementById('canvas');
 ctx=canvas.getContext('2d');
 ctx.font="40px calibri";
 run();
}



function run(){
 setTimeout(run,10);
 game(); 
 paint(ctx);
}

function game(){
 if(!PAUSE && !GAMEOVER){
  // Move Rect
  if(PRESSING[38] || PRESSING[87]) //UP
   body.y-=5;
  if(PRESSING[39] || PRESSING[68]) //RIGHT
  body.x+=5;
  if(PRESSING[40] || PRESSING[83]) //DOWN
   body.y+=5;
  if(PRESSING[37] || PRESSING[65]) //LEFT
   body.x-=5;

  // Out Screen
  if(body.x>canvas.width)
   body.x=0;
  if(body.y>canvas.height)
   body.y=0;
  if(body.x<-84)
   body.x=canvas.width;
  if(body.y<-115)
   body.y=canvas.height;
 }
 //interaccion
 if(body.intersects(enemy)){
   score++;
   enemy.x=random((canvas.width-66)/10-1)*10;
   enemy.y=random((canvas.height-85)/10-1)*10;
  }
 if(timeout==0){
    GAMEOVER=true;   
  }
 if(!PAUSE && timeout>0){
 time--;
 timeout=(time/100).toFixed(0);
 //time=(time/100).toFixed(0);
  }
 // Pause/Unpause
 if(lastKey==13){
  PAUSE=!PAUSE;
  lastKey=null;
 }
}

function paint(ctx){
 ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(iceking,enemy.x,enemy.y, 66, 85);
  ctx.drawImage(finnandjake,body.x,body.y, 84, 115);
 ctx.fillText('Score: '+score+ ' Time: '+timeout,20,40);
 ctx.fillStyle='#0f0';
 ctx.fillStyle='#fff';
 //ctx.fillText('Last Key: '+lastKey,0,20);
    
 if(PAUSE){
  ctx.fillText('PAUSE',350,320);
 }
  
  if(GAMEOVER){
   ctx.fillText('GAME OVER',300,320); 
}
}


document.addEventListener('keydown',function(evt){
 lastKey=evt.keyCode;
 PRESSING[evt.keyCode]=true;
},false);

document.addEventListener('keyup',function(evt){
 PRESSING[evt.keyCode]=false;
},false);