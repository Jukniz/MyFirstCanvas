window.addEventListener('load',init,false);
var canvas=null,ctx=null;
var x=50,y=50;
var lastKey=null;
var PAUSE=true;
var PRESSING=new Array();
var img = new Image();
img.src =  "Resources/finnandjake.png";
function init(){
 canvas=document.getElementById('canvas');
 ctx=canvas.getContext('2d');
 run();
}



function run(){
 setTimeout(run,50);
 game();
 paint(ctx);
}

function game(){
 if(!PAUSE){
  // Move Rect
  if(PRESSING[38] || PRESSING[87]) //UP
   y-=5;
  if(PRESSING[39] || PRESSING[68]) //RIGHT
   x+=5;
  if(PRESSING[40] || PRESSING[83]) //DOWN
   y+=5;
  if(PRESSING[37] || PRESSING[65]) //LEFT
   x-=5;

  // Out Screen
  if(x>canvas.width)
   x=0;
  if(y>canvas.height)
   y=0;
  if(x<0)
   x=canvas.width;
  if(y<0)
   y=canvas.height;
 }
 // Pause/Unpause
 if(lastKey==13){
  PAUSE=!PAUSE;
  lastKey=null;
 }
}

function paint(ctx){
 ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(img,x,y, 40, 40);
 ctx.fillStyle='#0f0';
 ctx.fillStyle='#fff';
 //ctx.fillText('Last Key: '+lastKey,0,20);
 if(PAUSE)
  ctx.fillText('PAUSE',140,75);
}

document.addEventListener('keydown',function(evt){
 lastKey=evt.keyCode;
 PRESSING[evt.keyCode]=true;
},false);

document.addEventListener('keyup',function(evt){
 PRESSING[evt.keyCode]=false;
},false);