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



  // assume we are already logged in


      function postToFeed() {
        FB.init({appId: "276532112479141", status: true, cookie: true});
        // calling the API ...
        var obj = {
          method: 'feed',
          redirect_uri: 'https://polar-coast-7569.herokuapp.com/',
          link: 'https://developers.facebook.com/docs/reference/dialogs/',
          picture: 'http://2.bp.blogspot.com/-FWafoHDOqzc/UKVF4LgqZUI/AAAAAAAABZM/9b1K7GhJvHc/s1600/Jake.jpg',
          name: 'Adventure Time',
          caption: 'Adventure Time Game',
          description: 'Ha conseguido una puntuación de: '+score+' puntos.'
        };

        function callback(response) {
          document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
        }

        FB.ui(obj, callback);
      }
  
function random(max){
 return parseInt(Math.random()*max);
}

function reset(){
 score=0;
 time=6000;
 timeout=60;
 GAMEOVER=false;
 body=new Rectangle(50,50,84,115);
 enemy=new Rectangle(300,300,66,85);
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
var iceking = new Image();
var aEat=new Audio();
var aDie=new Audio();
var food=new Rectangle(80,80,10,10);
finnandjake.src =  "Resources/finnandjake.png";
iceking.src =  "Resources/Original_Ice_King.png";
aEat.src='Resources/chomp.m4a';
aDie.src='Resources/dies.m4a';

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
   aEat.play();
  }
  
   if(GAMEOVER && lastKey==13){
     reset();
 }
  
 if(timeout==0 && !GAMEOVER){
    GAMEOVER=true;
    aDie.play();
    postToFeed();
  }
 if(!PAUSE && timeout>0){
 time--;
 timeout=(time/100).toFixed(0);
 //time=(time/100).toFixed(0);
  }
 // Pause/Unpause
 if(lastKey==13 && !GAMEOVER){
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
    
 if(PAUSE && !GAMEOVER){
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